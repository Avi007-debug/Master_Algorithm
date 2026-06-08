import React, { useState, useEffect, useRef } from 'react';
import { Card, Button } from './ui/common';
import { VisualizerEngine } from './VisualizerEngine';
import { Play, Pause, SkipBack, SkipForward, RefreshCw, ArrowLeft, Loader2, AlertCircle, Settings, Clock, Boxes, Code, ChevronDown, ChevronUp, Gauge, BookOpen, Award, Info, HelpCircle } from 'lucide-react';
import { GuidedTutorial } from './GuidedTutorial';
import { ThemeSelector } from './ThemeSelector';
import { BookmarkManager } from './BookmarkManager';
import { PROBLEMS } from '../data/problems';
import { API } from '../config/api';

export function InterviewMode({ problem, onBack, onSelectProblem }) {
    const [logs, setLogs] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [speed, setSpeed] = useState(1); // 1x speed by default
    const [breakpoints, setBreakpoints] = useState(new Set());
    const [showCommonMistakes, setShowCommonMistakes] = useState(false);

    // Speed presets
    const SPEED_PRESETS = {
        '0.25x': 0.25,
        '0.5x': 0.5,
        '1x': 1,
        '1.5x': 1.5,
        '2x': 2,
        '3x': 3
    };
    const [showFullCode, setShowFullCode] = useState(false);
    const [codeLanguage, setCodeLanguage] = useState('c'); // 'c', 'pseudo'
    const [showTutorial, setShowTutorial] = useState(false);
    const [resolvedFullCode, setResolvedFullCode] = useState('');
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return document.documentElement.getAttribute('data-theme') || 'dark';
        }
        return 'dark';
    });
    const timerRef = useRef(null);
    const mainContentRef = useRef(null);

    // Sidebar resize state and handlers
    const [sidebarWidth, setSidebarWidth] = useState(380);
    const isResizingRef = useRef(false);

    const handleMouseDown = (e) => {
        e.preventDefault();
        isResizingRef.current = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e) => {
        if (!isResizingRef.current) return;
        const newWidth = e.pageX;
        if (newWidth > 280 && newWidth < 600) {
            setSidebarWidth(newWidth);
        }
    };

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    useEffect(() => {
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    // Form State
    const [inputValues, setInputValues] = useState({});

    React.useEffect(() => {
        const observer = new MutationObserver(() => {
            setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        let cancelled = false;

        setShowFullCode(false);
        setCodeLanguage('c');

        const fullCode = problem?.fullCode || '';
        const needsSourceFetch = /^\/\/ See .+implementation: .+\.c$/i.test(fullCode.trim());

        if (!needsSourceFetch) {
            setResolvedFullCode(fullCode);
            return () => {
                cancelled = true;
            };
        }

        setResolvedFullCode('');

        API.getAlgorithmSource(problem.id)
            .then((source) => {
                if (!cancelled) {
                    setResolvedFullCode(source);
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setResolvedFullCode(fullCode);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [problem.id, problem.fullCode]);

    const isDark = theme === 'dark';

    // Initialize inputs from default values
    useEffect(() => {
        if (problem?.inputs) {
            const defaults = {};
            problem.inputs.forEach(input => {
                defaults[input.name] = input.defaultValue;
            });
            setInputValues(defaults);
            // Auto-run on load with defaults
            handleRun(defaults);
        } else {
            handleRun({});
        }
    }, [problem.id]);

    const speedOptions = Object.entries(SPEED_PRESETS);
    const sourceCode = resolvedFullCode || problem.fullCode || '// Complete implementation unavailable.';
    const speedMin = 0.25;
    const speedMax = 3;

    useEffect(() => {
        if (isPlaying && !isLoading && !error && logs.length > 0) {
            const delay = 1000 / speed; // Speed multiplier affects delay
            timerRef.current = setInterval(() => {
                setCurrentStep(prev => {
                    const nextStep = prev + 1;
                    // Check if next step is a breakpoint
                    if (breakpoints.has(nextStep)) {
                        setIsPlaying(false);
                    }
                    if (nextStep < logs.length) return nextStep;
                    setIsPlaying(false);
                    return prev;
                });
            }, delay);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isPlaying, logs.length, isLoading, error, speed, breakpoints]);

    const handleRun = async (values = inputValues) => {
        setIsLoading(true);
        setError(null);
        setIsPlaying(false);

        try {
            // Prepare inputs for API
            // For Two Sum specifically: target is first arg, then array elements
            // We need a way to map named inputs to command line args order.
            // For now, hardcode mapping for Two Sum or assume order in registry matches?
            // Let's rely on specific logic or assume inputs array order in registry maps to args order?
            // BETTER: Map generic values to a flat array based on `problem.inputs` order, 
            // but `two_sum.c` expects `target` then `nums`. 
            // In registry I put target first.

            let apiInputs = [];
            if (problem.inputs) {
                apiInputs = problem.inputs.flatMap(input => {
                    const val = values[input.name];
                    if (input.type === 'array') {
                        return val.split(',').map(s => s.trim()).filter(s => s !== "");
                    }
                    return [val];
                });
            }

            const data = await API.runAlgorithm(problem.id, apiInputs);
            
            if (!Array.isArray(data) || data.length === 0) {
                console.warn("No steps returned");
            }
            setLogs(data);
            setCurrentStep(0);

        } catch (err) {
            console.error("Run Error:", err);
            setError(err.message);
            setLogs([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNext = () => {
        setIsPlaying(false);
        if (currentStep < logs.length - 1) setCurrentStep(c => c + 1);
    };

    const handlePrev = () => {
        setIsPlaying(false);
        if (currentStep > 0) setCurrentStep(c => c - 1);
    };

    const handleReset = () => {
        setIsPlaying(false);
        setCurrentStep(0);
    };

    const togglePlay = () => setIsPlaying(!isPlaying);

    const handleInputChange = (name, value) => {
        setInputValues(prev => ({ ...prev, [name]: value }));
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Skip if user is typing in input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            
            switch(e.key) {
                case ' ':
                case 'Enter':
                    e.preventDefault();
                    togglePlay();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    handleNext();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    handlePrev();
                    break;
                case 'r':
                case 'R':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        handleReset();
                    }
                    break;
                case 't':
                case 'T':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        setShowTutorial(true);
                    }
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isPlaying, currentStep, logs.length]);

    const handleTutorialAction = (action) => {
        if (action === 'run') {
            handleRun();
        }
    };

    if (!problem) return null;

    return (
        <div className="flex h-screen w-full bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden" role="main">
            {/* Guided Tutorial Modal */}
            {showTutorial && (
                <GuidedTutorial 
                    algorithm={problem} 
                    onClose={() => setShowTutorial(false)}
                    onAction={handleTutorialAction}
                />
            )}

            {/* Left Sidebar: Problem Info & Inputs */}
            <aside className="h-full flex flex-col bg-[var(--color-bg-secondary)] flex-shrink-0" style={{ width: `${sidebarWidth}px` }} role="complementary" aria-label="Algorithm information and controls">
                <div className="p-6 pb-4 border-b border-[var(--color-border)]">
                    <div className="flex items-center justify-between mb-4">
                        <Button 
                            variant="ghost" 
                            onClick={onBack} 
                            className="text-sm text-[var(--color-text-secondary)] pl-0 gap-1 hover:bg-transparent hover:text-[var(--color-accent-primary)]"
                            aria-label="Return to dashboard"
                        >
                            <ArrowLeft size={16} /> Back
                        </Button>
                        <div className="flex items-center gap-2">
                            <BookmarkManager 
                                currentAlgorithm={problem}
                                allProblems={PROBLEMS}
                                onSelectProblem={onSelectProblem}
                            />
                            <ThemeSelector />
                        </div>
                    </div>
                    <h1 className={`text-2xl font-bold ${isDark ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500' : 'text-[var(--color-accent-primary)]'} mb-2`}>
                        {problem.title}
                    </h1>
                    <div className="flex gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${problem.difficulty === 'Easy' ? isDark ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-green-100 text-green-700 border-green-300' :
                                problem.difficulty === 'Medium' ? isDark ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-yellow-100 text-yellow-700 border-yellow-300' :
                                    isDark ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-red-100 text-red-700 border-red-300'
                            }`} role="status" aria-label={`Difficulty: ${problem.difficulty}`}>
                            {problem.difficulty}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${isDark ? 'bg-[var(--color-bg-tertiary)]' : 'bg-[var(--color-bg-tertiary)]'} text-[var(--color-text-secondary)] border border-[var(--color-border)]`} role="status" aria-label={`Category: ${problem.category}`}>
                            {problem.category}
                        </span>
                    </div>
                </div>

                <div className="flex-1 overflow-auto p-6 space-y-6">
                    {/* Tutorial Button */}
                    <Button
                        onClick={() => setShowTutorial(true)}
                        variant="outline"
                        className="w-full justify-center gap-2 border-[var(--color-accent-primary)] text-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary)]/10"
                        aria-label="Start guided tutorial"
                    >
                        <BookOpen size={16} />
                        Start Interactive Tutorial
                    </Button>

                                        {/* Description */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                            </svg>
                            What does this algorithm do?
                        </h3>
                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                            {problem.description}
                        </p>
                        <div className="bg-[var(--color-accent-cyan)]/5 border border-[var(--color-accent-cyan)]/30 rounded-lg p-3" role="note" aria-label="Algorithm tip">
                            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed flex items-start gap-2">
                                <span className="text-[var(--color-accent-cyan)] text-sm" aria-hidden="true">ℹ️</span>
                                <span>
                                    {problem.id === 'bubble_sort' && "Great for beginners! Bubble sort is simple to understand but slow for large datasets. Best used for teaching purposes."}
                                    {problem.id === 'merge_sort' && "One of the most efficient sorting algorithms! Always runs in O(n log n) time, making it reliable for large datasets."}
                                    {problem.id === 'quick_sort' && "The most popular sorting algorithm! Usually very fast, though worst-case performance can be slow with poor pivot choices."}
                                    {problem.id === 'binary_search' && "Incredibly fast search! Works only on sorted arrays but finds elements in logarithmic time - perfect for large datasets."}
                                    {(problem.id === 'bfs' || problem.id === 'dfs') && `${problem.id === 'bfs' ? 'BFS' : 'DFS'} is fundamental for graph problems! Used in pathfinding, social networks, web crawlers, and more.`}
                                    {!['bubble_sort', 'merge_sort', 'quick_sort', 'binary_search', 'bfs', 'dfs'].includes(problem.id) && "Understanding this algorithm will help you solve many real-world programming problems!"}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Complexity Info */}
                    <div className={`${isDark ? 'bg-gradient-to-br from-[var(--color-bg-tertiary)] to-[var(--color-bg-primary)]' : 'bg-gradient-to-br from-[var(--color-bg-secondary)] to-[var(--color-accent-primary)]/5'} p-4 rounded-xl border border-[var(--color-border)] space-y-3`} role="region" aria-label="Performance metrics">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-3">⚡ Performance</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2 mb-1">
                                    <Clock size={14} className={isDark ? "text-blue-400" : "text-blue-600"} aria-hidden="true" />
                                    <span className="text-[10px] uppercase tracking-wide text-[var(--color-text-secondary)]">Time</span>
                                </div>
                                <span className={`text-sm font-mono font-bold ${isDark ? 'text-blue-300' : 'text-blue-700'}`} aria-label={`Time complexity: ${problem.timeComplexity || "N/A"}`}>{problem.timeComplexity || "N/A"}</span>
                                <span className="text-[9px] text-[var(--color-text-tertiary)] mt-1">How fast it runs</span>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2 mb-1">
                                    <Boxes size={14} className={isDark ? "text-purple-400" : "text-purple-600"} aria-hidden="true" />
                                    <span className="text-[10px] uppercase tracking-wide text-[var(--color-text-secondary)]">Space</span>
                                </div>
                                <span className={`text-sm font-mono font-bold ${isDark ? 'text-purple-300' : 'text-purple-700'}`} aria-label={`Space complexity: ${problem.spaceComplexity || "N/A"}`}>{problem.spaceComplexity || "N/A"}</span>
                                <span className="text-[9px] text-[var(--color-text-tertiary)] mt-1">Memory needed</span>
                            </div>
                        </div>
                    </div>

                    {/* Inputs Configuration */}
                    {problem.inputs && (
                        <div className="space-y-4 bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-border)]" role="form" aria-label="Algorithm input configuration">
                            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-primary)]">
                                <Settings size={14} aria-hidden="true" />
                                Configuration
                            </div>

                            {problem.inputs.map(input => (
                                <div key={input.name} className="space-y-1.5">
                                    <label htmlFor={`input-${input.name}`} className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide font-medium ml-1">
                                        {input.label}
                                    </label>
                                    <input
                                        id={`input-${input.name}`}
                                        type="text"
                                        value={inputValues[input.name] || ''}
                                        onChange={(e) => handleInputChange(input.name, e.target.value)}
                                        className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:border-transparent transition-all font-mono"
                                        aria-label={input.label}
                                    />
                                </div>
                            ))}

                            <Button
                                onClick={() => handleRun()}
                                disabled={isLoading}
                                className="w-full justify-center mt-2 bg-[var(--color-accent-primary)] hover:bg-[var(--color-accent-hover)] text-white border-0"
                                aria-label={isLoading ? "Visualizing algorithm" : "Start visualization"}
                            >
                                {isLoading ? <Loader2 size={16} className="animate-spin mr-2" aria-hidden="true" /> : <Play size={16} className="mr-2 fill-current" aria-hidden="true" />}
                                Visualize
                            </Button>
                        </div>
                    )}

                    {/* Core Code Snippet and Implementations */}
                    <div className="space-y-3">
                        <div className="flex border-b border-[var(--color-border)] text-sm">
                            <button
                                onClick={() => { setCodeLanguage('c'); setShowFullCode(false); }}
                                className={`px-4 py-2 font-semibold border-b-2 transition-colors ${codeLanguage === 'c' ? 'border-[var(--color-accent-primary)] text-[var(--color-accent-primary)]' : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
                            >
                                C Code
                            </button>
                            <button
                                onClick={() => { setCodeLanguage('pseudo'); setShowFullCode(false); }}
                                className={`px-4 py-2 font-semibold border-b-2 transition-colors ${codeLanguage === 'pseudo' ? 'border-[var(--color-accent-primary)] text-[var(--color-accent-primary)]' : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
                            >
                                Pseudocode
                            </button>
                        </div>

                        {codeLanguage === 'c' && (
                            <div className="space-y-3">
                                <div className="bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-border)] font-mono text-xs overflow-auto leading-relaxed max-h-48">
                                    <pre className="whitespace-pre text-[var(--color-text-primary)]">{problem.codeSnippet || "// C Code coming soon..."}</pre>
                                </div>
                                {sourceCode && (
                                    <div className="space-y-2">
                                        <button
                                            onClick={() => setShowFullCode(!showFullCode)}
                                            className="flex items-center gap-2 text-xs font-bold text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] transition-colors w-full"
                                        >
                                            <Code size={14} className="text-[var(--color-accent-secondary)]" />
                                            Complete C Implementation
                                            {showFullCode ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                                        </button>
                                        {showFullCode && (
                                            <div className="bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-accent-primary)]/30 font-mono text-xs overflow-auto leading-relaxed max-h-96">
                                                <pre className="whitespace-pre text-[var(--color-text-primary)]">{sourceCode}</pre>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {codeLanguage === 'pseudo' && (
                            <div className="bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-border)] font-mono text-xs overflow-auto leading-relaxed max-h-60">
                                <pre className="whitespace-pre text-[var(--color-text-primary)]">{problem.pseudocode || "// Pseudocode coming soon..."}</pre>
                            </div>
                        )}
                    </div>

                    {/* DAA Theory & Prep Collapsible Accordion */}
                    <div className="space-y-4 pt-4 border-t border-[var(--color-border)]">
                        <h3 className="text-sm font-bold text-[var(--color-text-primary)]">DAA Theory & Prep</h3>

                        {/* Collapsible 1: Algorithm Info */}
                        <details className="group border border-[var(--color-border)] rounded-xl bg-[var(--color-bg-primary)] p-3 [&_summary::-webkit-details-marker]:hidden" open>
                            <summary className="flex items-center justify-between cursor-pointer font-semibold text-xs text-[var(--color-text-primary)] uppercase tracking-wider">
                                <span className="flex items-center gap-1.5">ℹ️ Info</span>
                                <ChevronDown size={14} className="text-[var(--color-text-tertiary)] group-open:-rotate-180 transition-transform duration-200" />
                            </summary>
                            <div className="mt-3 space-y-4 text-xs text-[var(--color-text-secondary)] leading-relaxed">
                                {problem.workingPrinciple && (
                                    <div className="space-y-1">
                                        <h4 className="text-[10px] uppercase tracking-wider text-[var(--color-accent-primary)] font-bold">Working Principle</h4>
                                        <p className="whitespace-pre-line bg-[var(--color-bg-secondary)] p-2.5 rounded-lg border border-[var(--color-border)]">
                                            {problem.workingPrinciple}
                                        </p>
                                    </div>
                                )}
                                {problem.applications && (
                                    <div className="space-y-1">
                                        <h4 className="text-[10px] uppercase tracking-wider text-[var(--color-accent-pink)] font-bold">Applications</h4>
                                        <p className="whitespace-pre-line bg-[var(--color-bg-secondary)] p-2.5 rounded-lg border border-[var(--color-border)]">
                                            {problem.applications}
                                        </p>
                                    </div>
                                )}
                                {(problem.advantages || problem.disadvantages) && (
                                    <div className="space-y-1">
                                        <h4 className="text-[10px] uppercase tracking-wider text-[var(--color-accent-cyan)] font-bold">Pros & Cons</h4>
                                        <div className="space-y-2 bg-[var(--color-bg-secondary)] p-2.5 rounded-lg border border-[var(--color-border)]">
                                            {problem.advantages && (
                                                <div>
                                                    <strong className="text-green-500">Advantages:</strong>
                                                    <p className="mt-0.5 whitespace-pre-line">{problem.advantages}</p>
                                                </div>
                                            )}
                                            {problem.disadvantages && (
                                                <div className={problem.advantages ? "pt-2 border-t border-[var(--color-border)]/50" : ""}>
                                                    <strong className="text-red-500">Disadvantages:</strong>
                                                    <p className="mt-0.5 whitespace-pre-line">{problem.disadvantages}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                                {problem.crossLinks && problem.crossLinks.length > 0 && (
                                    <div className="space-y-1.5">
                                        <h4 className="text-[10px] uppercase tracking-wider text-[var(--color-text-secondary)] font-bold">Related Algorithms</h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {problem.crossLinks.map(link => {
                                                const target = PROBLEMS.find(p => p.id === link.id);
                                                return (
                                                    <button
                                                        key={link.id}
                                                        onClick={() => target && onSelectProblem(target)}
                                                        className="text-left text-xs text-[var(--color-accent-primary)] hover:underline flex items-center gap-1 font-medium transition-all"
                                                    >
                                                        🔗 {link.title || target?.title || link.id}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                                {/* What to Watch For */}
                                <div className="space-y-2 pt-2 border-t border-[var(--color-border)]/50">
                                    <h4 className="text-[10px] uppercase tracking-wider text-[var(--color-accent-pink)] font-bold">What to Watch For</h4>
                                    <div className="space-y-2">
                                        {problem.id === 'bubble_sort' && (
                                            <>
                                                <p className="flex items-start gap-2">
                                                    <span className="text-[var(--color-accent-pink)]">🔄</span>
                                                    <span><strong>Multiple passes:</strong> Notice how the algorithm makes several passes through the array</span>
                                                </p>
                                                <p className="flex items-start gap-2">
                                                    <span className="text-[var(--color-accent-pink)]">⬆️</span>
                                                    <span><strong>Bubbling up:</strong> Watch how the largest element "bubbles" to the end in each pass</span>
                                                </p>
                                                <p className="flex items-start gap-2">
                                                    <span className="text-[var(--color-accent-pink)]">🔁</span>
                                                    <span><strong>Adjacent comparisons:</strong> Elements are only compared with their immediate neighbors</span>
                                                </p>
                                            </>
                                        )}
                                        {problem.id === 'merge_sort' && (
                                            <>
                                                <p className="flex items-start gap-2">
                                                    <span className="text-[var(--color-accent-pink)]">✂️</span>
                                                    <span><strong>Divide phase:</strong> Watch how the array splits into smaller and smaller pieces</span>
                                                </p>
                                                <p className="flex items-start gap-2">
                                                    <span className="text-[var(--color-accent-pink)]">🔀</span>
                                                    <span><strong>Merge phase:</strong> See how sorted pieces combine back together in order</span>
                                                </p>
                                                <p className="flex items-start gap-2">
                                                    <span className="text-[var(--color-accent-pink)]">📊</span>
                                                    <span><strong>Recursion tree:</strong> Each level represents a recursion depth (splits then merges)</span>
                                                </p>
                                            </>
                                        )}
                                        {problem.id === 'quick_sort' && (
                                            <>
                                                <p className="flex items-start gap-2">
                                                    <span className="text-[var(--color-accent-pink)]">🎯</span>
                                                    <span><strong>Pivot selection:</strong> One element is chosen as the "pivot" (usually the last element)</span>
                                                </p>
                                                <p className="flex items-start gap-2">
                                                    <span className="text-[var(--color-accent-pink)]">⚖️</span>
                                                    <span><strong>Partitioning:</strong> Elements smaller than pivot go left, larger go right</span>
                                                </p>
                                                <p className="flex items-start gap-2">
                                                    <span className="text-[var(--color-accent-pink)]">🔄</span>
                                                    <span><strong>Recursive sorting:</strong> Each partition is then sorted the same way</span>
                                                </p>
                                            </>
                                        )}
                                        {problem.id === 'binary_search' && (
                                            <>
                                                <p className="flex items-start gap-2">
                                                    <span className="text-[var(--color-accent-pink)]">📍</span>
                                                    <span><strong>Middle element:</strong> Always check the middle element first</span>
                                                </p>
                                                <p className="flex items-start gap-2">
                                                    <span className="text-[var(--color-accent-pink)]">✂️</span>
                                                    <span><strong>Halving:</strong> Search space is cut in half after each comparison</span>
                                                </p>
                                                <p className="flex items-start gap-2">
                                                    <span className="text-[var(--color-accent-pink)]">⚡</span>
                                                    <span><strong>Speed advantage:</strong> Notice how few steps it takes compared to linear search</span>
                                                </p>
                                            </>
                                        )}
                                        {(problem.id === 'bfs' || problem.id === 'dfs') && (
                                            <>
                                                <p className="flex items-start gap-2">
                                                    <span className="text-[var(--color-accent-pink)]">🌳</span>
                                                    <span><strong>Traversal order:</strong> Watch the sequence nodes are visited</span>
                                                </p>
                                                <p className="flex items-start gap-2">
                                                    <span className="text-[var(--color-accent-pink)]">🎯</span>
                                                    <span><strong>Discovery:</strong> Notice when each node is first discovered vs fully explored</span>
                                                </p>
                                                <p className="flex items-start gap-2">
                                                    <span className="text-[var(--color-accent-pink)]">📊</span>
                                                    <span><strong>{problem.id === 'bfs' ? 'Level by level' : 'Depth first'}:</strong> {problem.id === 'bfs' ? 'Goes through all neighbors before going deeper' : 'Goes as deep as possible before backtracking'}</span>
                                                </p>
                                            </>
                                        )}
                                        {!['bubble_sort', 'merge_sort', 'quick_sort', 'binary_search', 'bfs', 'dfs'].includes(problem.id) && (
                                            <>
                                                <p className="flex items-start gap-2">
                                                    <span className="text-[var(--color-accent-pink)]">👀</span>
                                                    <span><strong>Watch carefully:</strong> Observe how elements are compared and moved</span>
                                                </p>
                                                <p className="flex items-start gap-2">
                                                    <span className="text-[var(--color-accent-pink)]">🔍</span>
                                                    <span><strong>Pattern recognition:</strong> Try to identify the strategy the algorithm uses</span>
                                                </p>
                                                <p className="flex items-start gap-2">
                                                    <span className="text-[var(--color-accent-pink)]">⏸️</span>
                                                    <span><strong>Use pause:</strong> Pause at any step to study what's happening</span>
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </details>

                        {/* Collapsible 2: Complexity Analysis */}
                        <details className="group border border-[var(--color-border)] rounded-xl bg-[var(--color-bg-primary)] p-3 [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex items-center justify-between cursor-pointer font-semibold text-xs text-[var(--color-text-primary)] uppercase tracking-wider">
                                <span className="flex items-center gap-1.5">⚡ Complexity</span>
                                <ChevronDown size={14} className="text-[var(--color-text-tertiary)] group-open:-rotate-180 transition-transform duration-200" />
                            </summary>
                            <div className="mt-3 space-y-4 text-xs text-[var(--color-text-secondary)] leading-relaxed">
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="flex flex-col bg-[var(--color-bg-secondary)] p-2 rounded-lg border border-[var(--color-border)] text-center">
                                        <span className="text-[9px] uppercase tracking-wider text-[var(--color-text-tertiary)] font-bold">Best Case</span>
                                        <span className="text-xs font-mono font-bold text-green-400 mt-1">{problem.bestCaseDerivation?.split("Complexity: ")[1] || problem.timeComplexity || "N/A"}</span>
                                    </div>
                                    <div className="flex flex-col bg-[var(--color-bg-secondary)] p-2 rounded-lg border border-[var(--color-border)] text-center">
                                        <span className="text-[9px] uppercase tracking-wider text-[var(--color-text-tertiary)] font-bold">Average</span>
                                        <span className="text-xs font-mono font-bold text-yellow-400 mt-1">{problem.averageCaseDerivation?.split("Complexity: ")[1] || problem.timeComplexity || "N/A"}</span>
                                    </div>
                                    <div className="flex flex-col bg-[var(--color-bg-secondary)] p-2 rounded-lg border border-[var(--color-border)] text-center">
                                        <span className="text-[9px] uppercase tracking-wider text-[var(--color-text-tertiary)] font-bold">Worst Case</span>
                                        <span className="text-xs font-mono font-bold text-red-400 mt-1">{problem.worstCaseDerivation?.split("Complexity: ")[1] || problem.timeComplexity || "N/A"}</span>
                                    </div>
                                </div>

                                {(problem.basicOperation || problem.dominantOperation || problem.criticalOperation) && (
                                    <div className="space-y-2 bg-[var(--color-bg-secondary)] p-2.5 rounded-lg border border-[var(--color-border)]">
                                        {problem.basicOperation && (
                                            <div>
                                                <strong className="text-[var(--color-text-primary)]">Basic Operation:</strong>
                                                <p className="mt-0.5">{problem.basicOperation}</p>
                                            </div>
                                        )}
                                        {problem.dominantOperation && (
                                            <div className="pt-2 border-t border-[var(--color-border)]/50">
                                                <strong className="text-[var(--color-text-primary)]">Dominant Loop:</strong>
                                                <p className="mt-0.5">{problem.dominantOperation}</p>
                                            </div>
                                        )}
                                        {problem.criticalOperation && (
                                            <div className="pt-2 border-t border-[var(--color-border)]/50">
                                                <strong className="text-[var(--color-text-primary)]">Critical Action:</strong>
                                                <p className="mt-0.5">{problem.criticalOperation}</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {problem.complexityDerivation && (
                                    <div className="space-y-1">
                                        <h4 className="text-[10px] uppercase tracking-wider text-[var(--color-accent-primary)] font-bold">Mathematical Derivation</h4>
                                        <div className="text-xs leading-relaxed whitespace-pre-line bg-[var(--color-bg-secondary)] p-2.5 rounded-lg border border-[var(--color-border)] font-mono">
                                            {problem.complexityDerivation}
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <h4 className="text-[10px] uppercase tracking-wider text-[var(--color-text-tertiary)] font-bold">Case Analysis Details</h4>
                                    <div className="space-y-2">
                                        {problem.bestCaseDerivation && (
                                            <div className="p-2.5 bg-green-500/5 rounded-lg border border-green-500/20">
                                                <strong className="text-green-400">Best Case Scenario</strong>
                                                <p className="mt-1 leading-relaxed">{problem.bestCaseDerivation}</p>
                                            </div>
                                        )}
                                        {problem.averageCaseDerivation && (
                                            <div className="p-2.5 bg-yellow-500/5 rounded-lg border border-yellow-500/20">
                                                <strong className="text-yellow-400">Average Case Scenario</strong>
                                                <p className="mt-1 leading-relaxed">{problem.averageCaseDerivation}</p>
                                            </div>
                                        )}
                                        {problem.worstCaseDerivation && (
                                            <div className="p-2.5 bg-red-500/5 rounded-lg border border-red-500/20">
                                                <strong className="text-red-400">Worst Case Scenario</strong>
                                                <p className="mt-1 leading-relaxed">{problem.worstCaseDerivation}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {problem.derivationShortcuts && (
                                    <div className="p-2.5 bg-blue-500/5 rounded-lg border border-blue-500/20 leading-relaxed">
                                        💡 <strong>DAA Shortcut:</strong> {problem.derivationShortcuts}
                                    </div>
                                )}
                            </div>
                        </details>

                        {/* Collapsible 3: Space & Recurrences */}
                        <details className="group border border-[var(--color-border)] rounded-xl bg-[var(--color-bg-primary)] p-3 [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex items-center justify-between cursor-pointer font-semibold text-xs text-[var(--color-text-primary)] uppercase tracking-wider">
                                <span className="flex items-center gap-1.5">📦 Space & Recurrences</span>
                                <ChevronDown size={14} className="text-[var(--color-text-tertiary)] group-open:-rotate-180 transition-transform duration-200" />
                            </summary>
                            <div className="mt-3 space-y-4 text-xs text-[var(--color-text-secondary)] leading-relaxed">
                                {problem.spaceComplexityDerivation && (
                                    <div className="space-y-1">
                                        <h4 className="text-[10px] uppercase tracking-wider text-[var(--color-accent-pink)] font-bold">Space Complexity Derivation</h4>
                                        <div className="text-xs leading-relaxed whitespace-pre-line bg-[var(--color-bg-secondary)] p-2.5 rounded-lg border border-[var(--color-border)] font-mono">
                                            {problem.spaceComplexityDerivation}
                                        </div>
                                    </div>
                                )}

                                {(problem.recurrenceRelation || problem.recurrenceDerivation) ? (
                                    <div className="space-y-3">
                                        {problem.recurrenceRelation && (
                                            <div className="space-y-1">
                                                <h4 className="text-[10px] uppercase tracking-wider text-[var(--color-accent-cyan)] font-bold">Recurrence Equation</h4>
                                                <div className="text-sm font-bold font-mono text-center py-2 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg text-[var(--color-accent-cyan)]">
                                                    {problem.recurrenceRelation}
                                                </div>
                                            </div>
                                        )}
                                        {problem.recurrenceDerivation && (
                                            <div className="space-y-1">
                                                <h4 className="text-[10px] uppercase tracking-wider text-[var(--color-accent-cyan)] font-bold">Recurrence Derivation</h4>
                                                <div className="text-xs leading-relaxed whitespace-pre-line bg-[var(--color-bg-secondary)] p-2.5 rounded-lg border border-[var(--color-border)] font-mono">
                                                    {problem.recurrenceDerivation}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="p-3 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg text-[10px] text-[var(--color-text-tertiary)] italic text-center">
                                        This algorithm is iterative; it doesn't utilize recurrence equations.
                                    </div>
                                )}
                            </div>
                        </details>

                        {/* Collapsible 4: Interview & Exam Prep */}
                        <details className="group border border-[var(--color-border)] rounded-xl bg-[var(--color-bg-primary)] p-3 [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex items-center justify-between cursor-pointer font-semibold text-xs text-[var(--color-text-primary)] uppercase tracking-wider">
                                <span className="flex items-center gap-1.5">🎓 Prep Guide</span>
                                <ChevronDown size={14} className="text-[var(--color-text-tertiary)] group-open:-rotate-180 transition-transform duration-200" />
                            </summary>
                            <div className="mt-3 space-y-4 text-xs text-[var(--color-text-secondary)] leading-relaxed">
                                {problem.beginnerTips && (
                                    <div className="space-y-1">
                                        <h4 className="text-[10px] uppercase tracking-wider text-[var(--color-accent-primary)] font-bold">Execution Guide</h4>
                                        <div className="space-y-2 bg-[var(--color-bg-secondary)] p-2.5 rounded-lg border border-[var(--color-border)]">
                                            {problem.beginnerTips.map((tip, idx) => (
                                                <div key={idx} className="flex items-start gap-2">
                                                    <span className="flex-shrink-0 w-4 h-4 rounded-full bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] flex items-center justify-center font-bold text-[9px] mt-0.5">{idx + 1}</span>
                                                    <span className="flex-1">{tip}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {problem.commonMistakes && problem.commonMistakes.length > 0 && (
                                    <div className="space-y-1">
                                        <h4 className="text-[10px] uppercase tracking-wider text-red-400 font-bold">Common Pitfalls</h4>
                                        <div className="space-y-1.5">
                                            {problem.commonMistakes.map((mistake, idx) => (
                                                <div key={idx} className="p-2.5 bg-red-500/5 rounded-lg border border-red-500/20 flex gap-2">
                                                    <span className="text-red-400 font-bold">✗</span>
                                                    <span className="flex-1 leading-relaxed">{mistake}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {problem.interviewQuestions && (
                                    <div className="space-y-1">
                                        <h4 className="text-[10px] uppercase tracking-wider text-purple-400 font-bold">Interview Questions</h4>
                                        <div className="whitespace-pre-line bg-[var(--color-bg-secondary)] p-2.5 rounded-lg border border-[var(--color-border)]">
                                            {problem.interviewQuestions}
                                        </div>
                                    </div>
                                )}

                                {problem.examQuestions && (
                                    <div className="space-y-1">
                                        <h4 className="text-[10px] uppercase tracking-wider text-yellow-400 font-bold">DAA Exam Questions</h4>
                                        <div className="whitespace-pre-line bg-[var(--color-bg-secondary)] p-2.5 rounded-lg border border-[var(--color-border)]">
                                            {problem.examQuestions}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </details>
                    </div>

                    {/* How to Use This Visualizer collapsible at bottom */}
                    <div className="pt-4 border-t border-[var(--color-border)]">
                        <details className="group border border-[var(--color-border)] rounded-xl bg-[var(--color-bg-primary)] p-3 [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex items-center justify-between cursor-pointer font-semibold text-xs text-[var(--color-text-primary)] uppercase tracking-wider">
                                <span className="flex items-center gap-1.5">💡 How to Visualize</span>
                                <ChevronDown size={14} className="text-[var(--color-text-tertiary)] group-open:-rotate-180 transition-transform duration-200" />
                            </summary>
                            <ul className="mt-3 space-y-2 text-xs text-[var(--color-text-secondary)] leading-relaxed">
                                <li className="flex gap-2">
                                    <span className="text-[var(--color-accent-green)] font-bold">①</span>
                                    <span>Configure inputs above and click "Visualize"</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-[var(--color-accent-green)] font-bold">②</span>
                                    <span>Watch step-by-step - each step shows what the algorithm is doing</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-[var(--color-accent-green)] font-bold">③</span>
                                    <span>Adjust speed using the slider below (slower = easier to follow)</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-[var(--color-accent-green)] font-bold">④</span>
                                    <span>Highlighted elements show what's being compared or changed</span>
                                </li>
                            </ul>
                        </details>
                    </div>
                </div>
            </aside>

            {/* Resizer Handle */}
            <div
                onMouseDown={handleMouseDown}
                className="w-[3px] hover:w-[6px] active:w-[6px] h-full cursor-col-resize bg-[var(--color-border)] hover:bg-[var(--color-accent-primary)] active:bg-[var(--color-accent-primary)] transition-all select-none z-30 flex-shrink-0"
                role="separator"
                aria-valuenow={sidebarWidth}
                aria-valuemin={280}
                aria-valuemax={600}
                aria-label="Resize sidebar"
            />

            {/* Main Area: Visualization */}
            <main className="flex-1 h-full flex flex-col relative bg-[var(--color-bg-primary)]">
                {/* Header / Toolbar */}
                <header className="h-16 border-b border-[var(--color-border)] flex items-center justify-between px-8 bg-[var(--color-bg-primary)]/80 backdrop-blur z-20">
                    <div className="flex items-center gap-4">
                        {isLoading ? (
                            <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                                <span className="text-xs">Processing Algorithm...</span>
                            </div>
                        ) : error ? (
                            <div className="flex items-center gap-2 text-red-400">
                                <AlertCircle size={16} />
                                <span className="text-xs text-red-400">Execution Error</span>
                            </div>
                        ) : (
                            <div className="font-mono text-sm text-[var(--color-text-secondary)] bg-[var(--color-bg-tertiary)] px-3 py-1 rounded-md border border-[var(--color-border)]">
                                Step <span className="text-[var(--color-text-primary)]">{currentStep + 1}</span> / {logs.length}
                            </div>
                        )}
                    </div>
                </header>

                {/* Canvas */}
                <div className={`flex-1 p-8 pb-6 flex flex-col items-center justify-center bg-gradient-to-br from-[var(--color-bg-secondary)] via-[var(--color-bg-primary)] to-[var(--color-bg-secondary)] relative overflow-auto min-h-0`}>
                    {/* Background decoration */}
                    <div className={`absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] ${isDark ? 'opacity-[0.03]' : 'opacity-[0.02]'} pointer-events-none`}></div>

                    {/* Current Step Explanation */}
                    {!isLoading && !error && logs.length > 0 && logs[currentStep]?.message && (
                        <div className="z-20 w-full max-w-4xl mb-4 animate-fade-in">
                            <div className={`glass-panel px-6 py-4 rounded-xl border-2 ${isDark ? 'border-purple-500/30 bg-purple-500/5' : 'border-purple-300/50 bg-purple-50/50'} backdrop-blur-md`}>
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center shadow-lg">
                                        <span className="text-white font-bold text-sm">{currentStep + 1}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xs uppercase tracking-wider text-[var(--color-accent-primary)] font-bold mb-1">What's Happening Now</h4>
                                        <p className="text-sm text-[var(--color-text-primary)] leading-relaxed font-medium">
                                            {logs[currentStep].message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="z-10 w-full max-w-4xl flex items-center justify-center">
                        {isLoading ? (
                            <div className="text-center flex flex-col items-center gap-4">
                                <Loader2 size={48} className="animate-spin text-[var(--color-accent-primary)] opacity-50" />
                            </div>
                        ) : error ? (
                            <div className={`max-w-md ${isDark ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-200'} border rounded-xl p-6 text-center`}>
                                <h3 className={`text-lg font-bold ${isDark ? 'text-red-400' : 'text-red-700'} mb-2`}>Execution Failed</h3>
                                <p className={`text-sm ${isDark ? 'text-red-300/80' : 'text-red-600'} mb-4`}>{error}</p>
                            </div>
                        ) : (
                            <VisualizerEngine step={logs[currentStep]} />
                        )}
                    </div>
                </div>

                {/* Playback Controls */}
                <footer className="flex-shrink-0 h-24 border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]/50 backdrop-blur-md flex items-center justify-center gap-8 relative z-20">
                    <div className={`flex items-center gap-6 glass-panel px-8 py-3 rounded-2xl transition-opacity duration-300 ${isLoading || error || logs.length === 0 ? 'opacity-50 pointer-events-none' : 'opacity-100'}`} role="toolbar" aria-label="Playback controls">
                        <Button 
                            variant="ghost" 
                            onClick={handleReset} 
                            title="Reset to beginning" 
                            className="hover:bg-[var(--color-bg-tertiary)]"
                            aria-label="Reset visualization to beginning"
                        >
                            <RefreshCw size={20} aria-hidden="true" />
                        </Button>
                        <Button 
                            variant="ghost" 
                            onClick={handlePrev} 
                            disabled={currentStep === 0} 
                            className="hover:bg-[var(--color-bg-tertiary)]"
                            title="Previous step (Left Arrow)"
                            aria-label="Go to previous step"
                        >
                            <SkipBack size={24} fill="currentColor" aria-hidden="true" />
                        </Button>
                        <Button
                            variant="primary"
                            onClick={togglePlay}
                            className="w-16 h-16 rounded-2xl !p-0 flex items-center justify-center text-white shadow-xl shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all"
                            title={`${isPlaying ? 'Pause' : 'Play'} (Space/Enter)`}
                            aria-label={`${isPlaying ? 'Pause' : 'Play'} visualization`}
                            aria-pressed={isPlaying}
                        >
                            {isPlaying ? <Pause size={28} fill="currentColor" aria-hidden="true" /> : <Play size={28} fill="currentColor" className="ml-1" aria-hidden="true" />}
                        </Button>
                        <Button 
                            variant="ghost" 
                            onClick={handleNext} 
                            disabled={currentStep === logs.length - 1} 
                            className="hover:bg-[var(--color-bg-tertiary)]"
                            title="Next step (Right Arrow)"
                            aria-label="Go to next step"
                        >
                            <SkipForward size={24} fill="currentColor" aria-hidden="true" />
                        </Button>
                    </div>
                    
                    {/* Speed Control */}
                    <div className={`flex flex-col gap-3 glass-panel px-6 py-4 rounded-2xl transition-opacity duration-300 ${isLoading || error || logs.length === 0 ? 'opacity-50 pointer-events-none' : 'opacity-100'}`} role="region" aria-label="Speed control">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Gauge size={16} className="text-[var(--color-accent-primary)]" aria-hidden="true" />
                                <label htmlFor="speed-slider" className="text-xs text-[var(--color-text-secondary)] font-medium">
                                    Speed: {speed}x
                                </label>
                            </div>
                            <div className="flex flex-wrap justify-end gap-1">
                                {speedOptions.map(([label, value]) => (
                                    <button
                                        key={label}
                                        onClick={() => setSpeed(value)}
                                        className={`min-w-14 px-2 py-1 text-[10px] rounded transition-colors ${
                                            speed === value
                                                ? 'bg-[var(--color-accent-primary)] text-white'
                                                : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]/80'
                                        }`}
                                        title={label}
                                        aria-label={`Set speed to ${label}`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <input
                            id="speed-slider"
                            type="range"
                            min={speedMin}
                            max={speedMax}
                            step="0.25"
                            value={speed}
                            onChange={(e) => setSpeed(parseFloat(e.target.value))}
                            className="w-full h-2 bg-[var(--color-bg-tertiary)] rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)]"
                            style={{
                                background: `linear-gradient(to right, var(--color-accent-primary) 0%, var(--color-accent-primary) ${((speed - speedMin) / (speedMax - speedMin)) * 100}%, var(--color-bg-tertiary) ${((speed - speedMin) / (speedMax - speedMin)) * 100}%, var(--color-bg-tertiary) 100%)`
                            }}
                            aria-valuemin={speedMin}
                            aria-valuemax={speedMax}
                            aria-valuenow={speed}
                            aria-valuetext={`${speed} times speed`}
                        />
                    </div>

                    {/* Keyboard Shortcuts Hint */}
                    <div className="absolute bottom-2 right-4 text-[10px] text-[var(--color-text-tertiary)] flex gap-3">
                        <span title="Press Space or Enter to play/pause">Space/Enter: Play/Pause</span>
                        <span title="Use arrow keys to navigate">Arrow keys: Step</span>
                        <span title="Press Ctrl/Cmd + T for tutorial">Ctrl+T: Tutorial</span>
                    </div>
                </footer>
            </main>
        </div>
    );
}
