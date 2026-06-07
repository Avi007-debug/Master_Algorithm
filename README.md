# Algorithm Visualization Platform

Interactive platform for visualizing data structures and algorithms with step-by-step execution. Perfect for interview preparation and learning CS fundamentals.

![Status](https://img.shields.io/badge/status-active-success.svg)
![Deployment](https://img.shields.io/badge/deployment-live-brightgreen.svg)
![Algorithms](https://img.shields.io/badge/algorithms-87%2F87-success.svg)
![React](https://img.shields.io/badge/react-19-blue.svg)
![Node](https://img.shields.io/badge/node-16%2B-blue.svg)

### 🌐 Live Deployment

- **Frontend**: https://master-algorithm.vercel.app/
- **Backend API**: https://master-algorithm.onrender.com/
- **GitHub Repo**: https://github.com/yourusername/ALGO-VISUALIZATION

---

## 🚀 Quick Start

### Development (Localhost)

```bash
# Install dependencies first
cd backend
npm install
make all              # Compile C programs

cd ../frontend  
npm install

# Start servers (use 2 terminals)
# Terminal 1 - Backend
cd backend
npm start             # http://localhost:3001

# Terminal 2 - Frontend
cd frontend
npm run dev           # http://localhost:5173
```

### Production Links

- **Live Frontend**: https://master-algorithm.vercel.app/
- **Live Backend**: https://master-algorithm.onrender.com/

> The application is fully deployed and live! Access the links above to see the platform in action.

**⚠️ First time?** Run `npm install` in both directories before starting!

**Full setup instructions**: See [SETUP.md](SETUP.md)

---

## 📋 Project Structure

```
ALGO-VISUALIZATION/
├── frontend/          # React + Vite visualization UI
│   ├── src/
│   │   ├── components/    # Dashboard, VisualizerEngine
│   │   ├── data/          # problems.js (50+ algorithms)
│   │   └── test/          # Vitest unit tests
│   └── package.json
│
├── backend/           # Node.js API + C implementations
│   ├── src/              # 30+ C algorithm files
│   ├── server.js         # Express API
│   ├── Makefile          # Build configuration
│   └── package.json
│
├── .github/workflows/ # CI/CD pipeline
├── SETUP.md          # Complete setup guide
└── FILE_GUIDE.md     # Explains all files
```

**Detailed file explanations**: See [FILE_GUIDE.md](FILE_GUIDE.md)

---

## ✨ Features

### 🎓 DAA Theory & Analysis Platform (New!)
- **📚 DAA Theory Guide**: Complete guides explaining asymptotic notations ($O, \Omega, \Theta, o, \omega$), mathematical limits, growth characteristics, and typical student pitfalls.
- **📈 Interactive Order of Growth Chart**: Visual comparison curve calculator mapping operations against input size $N$ for $O(1), O(\log n), O(n), O(n \log n), O(n^2), O(n^3), O(2^n)$.
- **🔬 Mathematical Complexity Derivations**: Step-by-step summation and closed-form derivations of Best, Average, and Worst case complexities for all 87 algorithms.
- **🔄 Recurrence Relation Solvers**: Formulaic substitution, iteration, and Master Theorem solutions for recursive algorithms (e.g. Merge Sort, Quick Sort, Karatsuba).
- **📂 Detailed Space Complexity Breakdowns**: Independent allocation listings for input data space, auxiliary working arrays, and recursive activation stack memory.
- **💬 Educational Code Annotations**: Inline comments directly inside backend C implementations (e.g. `bubble_sort.c`, `merge_sort.c`) highlighting the basic operation, frequency, and time complexity.

### 🎨 Visualization & UI
- **87 Algorithms**: Sorting, searching, trees, graphs, DP, backtracking, hashing, greedy, branch & bound, decision trees, complexity theory, and more
- **Step-by-Step Visualization**: Watch algorithms execute with visual feedback
- **Advanced Tree Visualizations**: 9 algorithms with graphical tree structure arrays, 4 complex algorithms with text-based visualizations
- **📚 Syllabus Filter**: Show only algorithms from your Data Structures course syllabus (46 algorithms aligned)
- **Category & Difficulty Filters**: Organize algorithms by type (Arrays, Sorting, Trees, Graphs, etc.) and difficulty
- **Search Functionality**: Quickly find algorithms by name
- **Sort Options**: By name, complexity, or difficulty
- **Persistent Dashboard State**: All filter selections saved to localStorage - navigate freely without resetting
- **Rich Themed UI**: Beautiful glassmorphic dark mode and lavender-tinted light mode
- **Smooth Animations**: Framer Motion-powered transitions
- **Speed Control**: Adjust playback speed from 0.1x to 5x
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### 📚 Learning & Education
- **Guided Interactive Tutorials**: Step-by-step walkthroughs with checkpoint questions
- **Beginner-Friendly Tips**: Learning guides for every algorithm
- **Current Step Explanation**: Real-time descriptions of what's happening
- **Complete Code Examples**: Full implementations with helper functions in C, Java, and Pseudocode
- **📝 Exam & Interview Prep Guides**: Frequently asked university DAA exam questions, standard tech interview questions, and shortcut tips for each algorithm

### ♿ Accessibility
- **Full Keyboard Navigation**: Control everything without a mouse
  - Space/Enter: Play/Pause
  - Arrow keys: Navigate steps
  - Ctrl+R: Reset, Ctrl+T: Tutorial
- **Screen Reader Support**: Comprehensive ARIA labels and semantic HTML
- **Focus Indicators**: Clear visual feedback for keyboard users
- **WCAG 2.1 AA Compliant**: Proper contrast ratios and accessible design

### 🔒 Security & Reliability
- **Input Validation**: Protection against empty, oversized, or malicious inputs
- **Execution Timeouts**: 5-second limit prevents infinite loops
- **Resource Limits**: Memory and buffer protections
- **User-Friendly Errors**: Clear, actionable error messages

### 📊 Algorithm Organization
- **Multiple Categories**: Arrays, Two Pointers, Sliding Window, Trees, Graphs, etc.
- **Difficulty Levels**: Easy, Medium, Hard classifications
- **Complexity Info**: Time and space complexity for each algorithm
- **📚 Syllabus Alignment**: 20 algorithms match standard DS course curriculum
- **Interview Mode**: Curated problem sets by topic

---

## 🎯 Algorithm Categories

| Category | Count | Examples |
|----------|-------|----------|
| **Sorting & Brute Force** | 11 | Bubble, Selection, Insertion, Merge, Quick, Counting, Radix, Heap, Randomized Quick |
| **Searching** | 2 | Binary Search, BST Search |
| **Data Structures** | 5 | Stack, Queue, Deque, Priority Queue, Message Queue |
| **Linked Lists** | 8 | Singly, Doubly, Circular SLL, Circular DLL, Reverse, Polynomial, Long Integer |
| **Trees** | 13 | BST (Insert/Delete/Search), Inorder/Preorder/Postorder, AVL, Splay, Trie, B+ Tree, Threaded BT, Heap, Expression Tree |
| **Graphs** | 4 | BFS, DFS, Adjacency Matrix, Adjacency List |
| **Hashing** | 4 | Open Hashing, Linear Probing, Quadratic Probing, Double Hashing |
| **Recursion** | 3 | Factorial, Fibonacci, Fibonacci DP |
| **Backtracking** | 2 | N-Queens, Sum of Subsets |
| **Stack Applications** | 4 | Valid Parentheses, Infix to Postfix, Infix to Prefix, Postfix Evaluation |
| **Array Problems** | 2 | Two Sum, Three Sum |
| **String** | 1 | Longest Substring |
| **Divide & Conquer** | 2 | Long Integer Multiplication, Strassen Matrix Multiplication |
| **Decrease & Conquer** | 1 | Topological Sort |
| **Transform & Conquer** | 3 | Presorting, Heapify, Problem Reduction |
| **Space-Time Tradeoffs** | 3 | Naive String Matching, Horspool, Boyer-Moore |
| **Greedy Algorithms** | 4 | Prim's, Dijkstra's, Huffman Coding, Fractional Knapsack |
| **Branch & Bound** | 2 | Travelling Salesperson (TSP), Assignment Problem |
| **Decision Trees** | 3 | Decision Trees for Sorting, Comparison Trees, Lower Bound Analysis |
| **Complexity Theory** | 6 | Non-Deterministic, Class P, Class NP, NP-Complete, NP-Hard, Polynomial Reduction |

**Total: 87 Algorithms** | **Syllabus Aligned: 76 Algorithms**

---

## 🛠️ Tech Stack

**Frontend**: React 19, Vite, Tailwind CSS, Framer Motion, Lucide React  
**Backend**: Node.js, Express, C (GCC)  
**Accessibility**: ARIA labels, semantic HTML, keyboard navigation  
**Testing**: Vitest, React Testing Library  
**Code Quality**: ESLint, Prettier, clang-format  
**CI/CD**: GitHub Actions

---

## 📚 Documentation

- **[SETUP.md](SETUP.md)** - Installation, running, troubleshooting
- **[FEATURES.md](FEATURES.md)** - Comprehensive features and algorithm details
- **[FILE_GUIDE.md](FILE_GUIDE.md)** - Complete file structure explanation
- **[FUTURE_IMPROVEMENTS.md](FUTURE_IMPROVEMENTS.md)** - Planned features and roadmap
- **[LICENSE](LICENSE)** - Project license

---

## 🧪 Development

### Commands

**Frontend** (`frontend/`):
```powershell
npm run dev          # Dev server
npm run build        # Production build
npm run lint         # ESLint
npm run format       # Prettier auto-format
npm test             # Run tests
```

**Backend** (`backend/`):
```powershell
npm start            # Start server
npm run build        # Build C programs
make all             # Build all (Unix/WSL)
make format          # Format C code
npm test             # Smoke tests
```

### Adding New Algorithm

1. Create `backend/src/algorithm.c`
2. Add to `backend/Makefile` ALGORITHMS list
3. Add problem definition to `frontend/src/data/problems.js`
4. Build & test: `make algorithm && ./build/algorithm <input>`

See [FILE_GUIDE.md](FILE_GUIDE.md) for details.

---

## ✅ Code Quality

- **ESLint + Prettier**: Automatic code formatting
- **Unit Tests**: Vitest with React Testing Library
- **CI Pipeline**: Automated testing on push/PR
- **C Formatting**: clang-format with LLVM style
- **Memory Safety**: Sanitizers available (`make dev`)

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/name`
3. Follow code style (auto-format with Prettier/clang-format)
4. Add tests for new features
5. Ensure CI passes: `npm run lint && npm test`
6. Submit pull request

---

## 📊 CI/CD

GitHub Actions runs on every push/PR:
- ✅ ESLint + Prettier checks
- ✅ Build verification (frontend & backend)
- ✅ Unit tests (Vitest)
- ✅ C code format check (clang-format)
- ✅ Security audit (npm audit)
- ✅ Auto-deploy to Vercel (frontend) and Render (backend)

See [`.github/workflows/ci.yml`](.github/workflows/ci.yml)

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Space / Enter | Play / Pause visualization |
| Right Arrow → | Next step |
| Left Arrow ← | Previous step |
| Ctrl/Cmd + R | Reset to beginning |
| Ctrl/Cmd + T | Open interactive tutorial |

**Note**: Shortcuts are disabled when typing in input fields.

---

## 🐛 Troubleshooting

**Backend won't start**: Check if port 3000 is free  
**Frontend build fails**: Clear `node_modules`, reinstall  
**C programs won't compile**: Install GCC or use WSL on Windows  
**Tests failing**: Run `npm test -- --clearCache`

See [SETUP.md](SETUP.md) → Troubleshooting section.

---

## � Documentation

- **[SETUP.md](SETUP.md)** - Complete setup & installation guide
- **[FILE_GUIDE.md](FILE_GUIDE.md)** - Explains every file in the project
- **[FEATURES.md](FEATURES.md)** - Comprehensive feature documentation
- **[FUTURE_IMPROVEMENTS.md](FUTURE_IMPROVEMENTS.md)** - Roadmap & planned features
- **[IMPROVEMENTS.md](IMPROVEMENTS.md)** - Changelog of completed enhancements

---

## �📄 License

See [LICENSE](LICENSE) file.

---

## 🎓 Resources

- **Project Setup**: [SETUP.md](SETUP.md)
- **File Structure**: [FILE_GUIDE.md](FILE_GUIDE.md)
- **All Features**: [FEATURES.md](FEATURES.md)
- **Future Roadmap**: [FUTURE_IMPROVEMENTS.md](FUTURE_IMPROVEMENTS.md)
- **React Docs**: [react.dev](https://react.dev)
- **Vite Docs**: [vitejs.dev](https://vitejs.dev)

---

## 🎓 Algorithm Showcase

### Complete Algorithm Coverage (87 Total)

**Sorting & Brute Force (11)**: Bubble, Selection, Insertion, Merge, Quick, Randomized Quick, Counting, Radix, Heap

**Trees (13)**: Binary Tree Level Order, BST Search, BST Insert, BST Delete, Inorder, Preorder, Postorder, Expression Tree, Heap Construction, AVL Tree, Threaded BT, B+ Tree, Splay Tree, Trie

**Data Structures & Linked Lists (13)**: Stack, Queue, Circular Queue, Message Queue, Priority Queue, Deque, Singly LL, Doubly LL, Reverse LL, Circular SLL, Circular DLL, Polynomial Multiplication, Long Integer Addition

**Graphs (4)**: BFS Graph, DFS Graph, Adjacency Matrix, Adjacency List

**Hashing (4)**: Open Hashing, Linear Probing, Quadratic Probing, Double Hashing

**Stack Applications (4)**: Valid Parentheses, Infix to Postfix, Infix to Prefix, Postfix Evaluation

**Recursion (3)**: Factorial, Fibonacci, Fibonacci DP

**Arrays & Strings (3)**: Two Sum, Three Sum, Longest Substring

**Backtracking (2)**: N-Queens, Sum of Subsets

**Divide & Conquer (2)**: Long Integer Multiplication, Strassen Matrix Multiplication

**Decrease & Conquer (1)**: Topological Sort

**Transform & Conquer (3)**: Presorting, Heapify, Problem Reduction

**Space-Time Tradeoffs (3)**: Naive String Matching, Horspool, Boyer-Moore

**Greedy Algorithms (4)**: Prim's, Dijkstra's, Huffman Coding, Fractional Knapsack

**Branch & Bound (2)**: Travelling Salesperson (TSP), Assignment Problem

**Decision Trees (3)**: Decision Trees for Sorting, Comparison Trees, Lower Bound Analysis

**Complexity Theory (6)**: Non-Deterministic, Class P, Class NP, NP-Complete, NP-Hard, Polynomial Reduction

---

## 📚 Syllabus Course Mapping

The following algorithms are mapped according to the core academic curriculum categories:

### Brute Force & Sorting
- **Bubble Sort** - O(n²) comparison sorting
- **Selection Sort** - O(n²) in-place sorting

### Divide & Conquer
- **Merge Sort** - O(n log n) divide-and-conquer sorting
- **Quick Sort** - O(n log n) pivot-based sorting
- **Long Integer Multiplication (Karatsuba)** - O(n^1.58) digit multiplication
- **Strassen Matrix Multiplication** - O(n^2.80) submatrix multiplication

### Decrease & Conquer
- **Insertion Sort** - O(n²) adaptive sorting
- **Depth First Search (DFS)** - Depth-first graph traversal
- **Breadth First Search (BFS)** - Breadth-first graph traversal
- **Topological Sort** - Linear dependency ordering for DAGs

### Transform & Conquer
- **Presorting** - Sorting first to simplify duplicate/search checks
- **Heapsort** - O(n log n) sorting using heaps
- **Heap Construction** - Converting array into min/max heap structure
- **Heapify** - Restoring heap property for a subtree node
- **Problem Reduction** - Solving LCM by reducing it to GCD

### Space-Time Tradeoffs
- **Counting Sort** - O(n+k) non-comparison integer sorting
- **Naive String Matching** - Character alignment sliding search
- **Horspool Algorithm** - Shift-table based string matching
- **Boyer-Moore Algorithm** - Dual-heuristic optimized string matching

### Dynamic Programming
- **Binomial Coefficient** - DP grid computation for C(n,k)
- **Warshall Algorithm** - Transitive closure directed graph reachability
- **Floyd Algorithm** - All-pairs shortest path distance matrix
- **0/1 Knapsack** - Optimal item subset selection
- **Memoization / Memory Functions** - Top-down cached recursion for Knapsack

### Greedy Algorithms
- **Prim's Algorithm** - Minimum spanning tree selected edge expansion
- **Dijkstra's Algorithm** - Single-source shortest path updates
- **Huffman Coding** - Greedy character frequency encoding tree
- **Fractional Knapsack** - Value/weight ratio greedy packing with item splits

### Backtracking
- **N-Queens Problem** - N-Queens board placement DFS search
- **Sum of Subsets Problem** - Finding subset summing to target via branch pruning

### Branch & Bound
- **Travelling Salesperson (TSP)** - Hamiltonian tour cost state bounds search
- **Assignment Problem** - Task delegation worker-cost allocation bounds search

### Decision Trees
- **Decision Trees for Sorting** - Comparison trees mapping for 3 elements
- **Comparison Trees** - Binary search decision boundaries trace
- **Lower Bound Analysis for Sorting** - Mathematical proof of Ω(n log n) comparison limit

### Complexity Theory
- **Non-Deterministic Algorithms** - Choice guess and deterministic verification
- **Class P** - Polynomial time decision problems
- **Class NP** - Polynomial time verifiable problems
- **NP-Complete Problems** - Hardest problems in NP (TSP, SAT)
- **NP-Hard Problems** - At least as hard as NP (Halting Problem)
- **Polynomial-Time Reduction** - Mapping transformation proofs

---

**Made with ❤️ for algorithm learners and interview prep**

**Last Updated**: February 2026 | **Status**: Production Ready
