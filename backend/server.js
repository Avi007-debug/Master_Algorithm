const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Configuration
const EXECUTION_TIMEOUT = parseInt(process.env.EXECUTION_TIMEOUT) || 5000;
const MAX_INPUT_LENGTH = parseInt(process.env.MAX_INPUT_LENGTH) || 1000;
const MAX_INPUTS = parseInt(process.env.MAX_INPUTS) || 100;

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Path to the build directory where C executables are located
const BUILD_DIR = path.join(__dirname, 'build');
const SOURCE_DIR = path.join(__dirname, 'src');

function resolveSourceFile(algorithm) {
    const candidates = Array.from(new Set([
        `${algorithm}.c`,
        `${algorithm.replace(/-/g, '_')}.c`,
        `${algorithm.replace(/_/g, '-')}.c`
    ]));

    for (const candidate of candidates) {
        const filePath = path.join(SOURCE_DIR, candidate);
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            return filePath;
        }
    }

    return null;
}

// Input validation helper
function validateInputs(inputs) {
    if (!Array.isArray(inputs)) {
        return { valid: false, error: 'Inputs must be an array' };
    }
    
    // Empty inputs are allowed for algorithms that run with default inputs.
    
    if (inputs.length > MAX_INPUTS) {
        return { valid: false, error: `Too many inputs. Maximum ${MAX_INPUTS} allowed.` };
    }
    
    for (let i = 0; i < inputs.length; i++) {
        const input = String(inputs[i]);
        if (input.length > MAX_INPUT_LENGTH) {
            return { valid: false, error: `Input ${i + 1} is too long. Maximum ${MAX_INPUT_LENGTH} characters.` };
        }
    }
    
    return { valid: true };
}

app.post('/run/:algorithm', (req, res) => {
    const algorithm = req.params.algorithm;
    const inputs = req.body.inputs || [];

    // Sanitize input to prevent command injection (alphanumeric and hyphens only)
    if (!/^[a-z0-9_-]+$/i.test(algorithm)) {
        return res.status(400).json({ error: "Invalid algorithm name" });
    }

    // Validate inputs
    const validation = validateInputs(inputs);
    if (!validation.valid) {
        return res.status(400).json({ error: validation.error });
    }

    let executablePath = path.join(BUILD_DIR, algorithm);
    if (process.platform === 'win32') {
        executablePath += '.exe';
    }

    // Check if executable exists
    if (!fs.existsSync(executablePath)) {
        return res.status(404).json({ error: `Algorithm '${algorithm}' not found or not compiled.` });
    }

    // Construct command with arguments
    // Ensure inputs are safe: basic sanitization
    // Allow operators (+, -, *, /, ^) for expression algorithms
    const safeInputs = inputs.map(arg => String(arg).replace(/[^a-zA-Z0-9\-\s,()[\]{}+*\/^.]/g, ''));
    const args = safeInputs.map(arg => `"${arg}"`).join(' ');

    // Execute the C program with timeout
    const child = exec(`"${executablePath}" ${args}`, {
        timeout: EXECUTION_TIMEOUT,
        maxBuffer: 1024 * 1024 // 1MB buffer
    }, (error, stdout, stderr) => {
        if (error) {
            if (error.killed) {
                return res.status(408).json({ 
                    error: "Execution timeout",
                    details: `Algorithm took longer than ${EXECUTION_TIMEOUT / 1000} seconds.`
                });
            }
            console.error(`Error executing ${algorithm}:`, error);
            console.error(`Stderr:`, stderr);
            return res.status(500).json({ error: "Execution failed", details: stderr });
        }

        try {
            const steps = JSON.parse(stdout);
            res.json(steps);
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError, "Stdout:", stdout);
            res.status(500).json({
                error: "Failed to parse algorithm output",
                details: "Output was not valid JSON",
                rawOutput: stdout
            });
        }
    });
});

// Original GET handler for backwards compatibility or simple runs
app.get('/run/:algorithm', (req, res) => {
    const algorithm = req.params.algorithm;
    if (!/^[a-z0-9_-]+$/i.test(algorithm)) {
        return res.status(400).json({ error: "Invalid algorithm name" });
    }


    let executablePath = path.join(BUILD_DIR, algorithm);
    if (process.platform === 'win32') {
        executablePath += '.exe';
    }

    // Check if executable exists
    if (!fs.existsSync(executablePath)) {
        return res.status(404).json({ error: `Algorithm '${algorithm}' not found or not compiled.` });
    }

    // Execute the C program
    exec(`"${executablePath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing ${algorithm}:`, error);
            return res.status(500).json({ error: "Execution failed", details: stderr });
        }

        try {
            // The C program should output valid JSON to stdout
            const steps = JSON.parse(stdout);
            res.json(steps);
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError, "Stdout:", stdout);
            res.status(500).json({
                error: "Failed to parse algorithm output",
                details: "Output was not valid JSON",
                rawOutput: stdout
            });
        }
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        environment: NODE_ENV,
        timestamp: new Date().toISOString()
    });
});

// Get list of available algorithms
app.get('/api/algorithms', (req, res) => {
    fs.readdir(BUILD_DIR, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read algorithms directory' });
        }
        
        // Filter out non-executable files and .o files
        const algorithms = files.filter(file => {
            const filePath = path.join(BUILD_DIR, file);
            return fs.statSync(filePath).isFile() && 
                   !file.endsWith('.o') && 
                   fs.accessSync(filePath, fs.constants.X_OK) === undefined;
        });
        
        res.json({ algorithms });
    });
});

app.get('/api/source/:algorithm', (req, res) => {
    const algorithm = req.params.algorithm;

    if (!/^[a-z0-9_-]+$/i.test(algorithm)) {
        return res.status(400).json({ error: 'Invalid algorithm name' });
    }

    const sourcePath = resolveSourceFile(algorithm);
    if (!sourcePath) {
        return res.status(404).json({ error: `Source for '${algorithm}' not found.` });
    }

    fs.readFile(sourcePath, 'utf8', (error, source) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to read algorithm source' });
        }

        res.type('text/plain').send(source);
    });
});

app.listen(PORT, () => {
    console.log(`Backend API running on http://localhost:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
    console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
});
