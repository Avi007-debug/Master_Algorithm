# Change Log
## Commits from `90991fd` to `c970d02`

Based on the user's notes, the commit history, and the file differences, here is a detailed summary of the updates made to the repository. **In total, this massive update involved over 9,400 lines of new code across 52 files.**

### 1. Algorithm Additions
- **Expanded Library**: Increased the total number of algorithms from **57 to exactly 100**.
- **Backend Implementations**: Added over 35 new C source files in `backend/src/`, including algorithms for:
  - Shortest paths (Dijkstra, Floyd, Warshall)
  - String matching (Boyer-Moore, Horspool, Naive)
  - Sorting and Trees (Bubble, Merge, Quick, Insertion, Selection, Heapify, Decision/Comparison trees)
  - NP problems and reduction (Class P, Class NP, NP-Hard, NP-Complete)
  - Others (Huffman Coding, N-Queens, TSP, Topological Sort, Strassen Matrix Multiplication, Knapsack, Sum of Subsets)
- **Data File**: Massively expanded `frontend/src/data/problems.js` (+4,256 lines) to encompass the metadata and data structures for the new algorithms.
- **Automation Scripts**: Introduced `add_algos.py` and `update_algos_code.py` to streamline the addition and management of these algorithms.

### 2. UI & Layout Enhancements (Dashboard)
- **New Layout Architecture**: Completely revamped the UI in `frontend/src/components/Dashboard.jsx` (an addition of over **1,000 lines of code**), moving away from a slider-based interface.
- **Categorization**: Introduced a category and sub-category-based layout with proper dropdowns for better navigation and organization.
- **Customizable Sidebar**: Added functionality for a customizable sidebar with movement support.

### 3. Tutorials & Theory Sections (GuidedTutorial)
- **Expanded Content**: Added **40 new tutorial sections and checkpoints**, significantly expanding the coverage.
- **Interactive Checkpoints**: Modified the tutorial checkpoints to include interactive MCQ-based questions that users must answer correctly to proceed.
- **DAA Theory & Prep Sections**: Integrated comprehensive Design and Analysis of Algorithms (DAA) theory sections. This includes complexity derivations, complexity analysis, space complexity, and recurrence relations.
- **UI Enhancements**: Made the `GuidedTutorial` modal resizable and maximizable for a better reading experience. The `GuidedTutorial.jsx` component received nearly **1,900 lines of new code** to support these features.

### 4. Interview Preparation (InterviewMode)
- **Interview Mode**: Significantly updated `frontend/src/components/InterviewMode.jsx` (+780 lines) to include a dedicated interview preparation section to help users practice algorithmic problem-solving.

### 5. Theming & Customization
- **Color Themes**: Updated `frontend/src/components/ThemeSelector.jsx` to support multiple color theme options, allowing for greater user personalization and a richer aesthetic.

### 6. Codebase Maintenance & Build Processes
- Added/Modified `backend/build.ps1` and `backend/Makefile` for improved and streamlined build processes.
- Updated `backend/server.js` and `frontend/src/config/api.js` to ensure the new algorithms and features are properly supported by the backend API.
