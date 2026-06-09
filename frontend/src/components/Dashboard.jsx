import React, { useState, useEffect, useMemo } from 'react';
import { PROBLEMS, CATEGORIES } from '../data/problems';
import { Card, Button } from './ui/common';
import {
    ArrowRight, Code2, Clock, Boxes, Search, Star, BookOpen,
    TrendingUp, ChevronDown, ChevronRight, Filter, Zap, Award,
    BarChart2, Layers, GitBranch, Hash, Database, Binary,
    Network, Cpu, Brain, SlidersHorizontal, X, Sun, Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Category metadata: icon + colour accent ──────────────────────────────────
const CATEGORY_META = {
    "Sorting": {
        icon: BarChart2,
        color: "blue",
        accent: "from-blue-500/20 to-blue-600/5",
        border: "border-blue-500/30",
        text: "text-blue-400",
        bg: "bg-blue-500/10",
    },
    "Arrays & Hashing": {
        icon: Hash,
        color: "emerald",
        accent: "from-emerald-500/20 to-emerald-600/5",
        border: "border-emerald-500/30",
        text: "text-emerald-400",
        bg: "bg-emerald-500/10",
    },
    "Sliding Window": {
        icon: SlidersHorizontal,
        color: "cyan",
        accent: "from-cyan-500/20 to-cyan-600/5",
        border: "border-cyan-500/30",
        text: "text-cyan-400",
        bg: "bg-cyan-500/10",
    },
    "Stack": {
        icon: Layers,
        color: "orange",
        accent: "from-orange-500/20 to-orange-600/5",
        border: "border-orange-500/30",
        text: "text-orange-400",
        bg: "bg-orange-500/10",
    },
    "Queue": {
        icon: GitBranch,
        color: "yellow",
        accent: "from-yellow-500/20 to-yellow-600/5",
        border: "border-yellow-500/30",
        text: "text-yellow-400",
        bg: "bg-yellow-500/10",
    },
    "Linked List": {
        icon: Binary,
        color: "pink",
        accent: "from-pink-500/20 to-pink-600/5",
        border: "border-pink-500/30",
        text: "text-pink-400",
        bg: "bg-pink-500/10",
    },
    "Trees": {
        icon: GitBranch,
        color: "violet",
        accent: "from-violet-500/20 to-violet-600/5",
        border: "border-violet-500/30",
        text: "text-violet-400",
        bg: "bg-violet-500/10",
    },
    "Graphs": {
        icon: Network,
        color: "teal",
        accent: "from-teal-500/20 to-teal-600/5",
        border: "border-teal-500/30",
        text: "text-teal-400",
        bg: "bg-teal-500/10",
    },
    "Hashing": {
        icon: Database,
        color: "indigo",
        accent: "from-indigo-500/20 to-indigo-600/5",
        border: "border-indigo-500/30",
        text: "text-indigo-400",
        bg: "bg-indigo-500/10",
    },
    "Dynamic Programming": {
        icon: Brain,
        color: "purple",
        accent: "from-purple-500/20 to-purple-600/5",
        border: "border-purple-500/30",
        text: "text-purple-400",
        bg: "bg-purple-500/10",
    },
    "Backtracking": {
        icon: Cpu,
        color: "red",
        accent: "from-red-500/20 to-red-600/5",
        border: "border-red-500/30",
        text: "text-red-400",
        bg: "bg-red-500/10",
    },
    "Recursion": {
        icon: Zap,
        color: "amber",
        accent: "from-amber-500/20 to-amber-600/5",
        border: "border-amber-500/30",
        text: "text-amber-400",
        bg: "bg-amber-500/10",
    },
};

const DEFAULT_META = {
    icon: Code2,
    color: "slate",
    accent: "from-slate-500/20 to-slate-600/5",
    border: "border-slate-500/30",
    text: "text-slate-400",
    bg: "bg-slate-500/10",
};

export function Dashboard({ onSelectProblem }) {
    const [selectedCategory, setSelectedCategory] = useState(() =>
        localStorage.getItem('dashboardCategory') || "All"
    );
    const [showOnlySyllabus, setShowOnlySyllabus] = useState(() =>
        localStorage.getItem('dashboardSyllabus') === 'true'
    );
    const [searchQuery, setSearchQuery] = useState(() =>
        localStorage.getItem('dashboardSearch') || ""
    );
    const [selectedDifficulty, setSelectedDifficulty] = useState(() =>
        localStorage.getItem('dashboardDifficulty') || "All"
    );
    const [sortBy, setSortBy] = useState(() =>
        localStorage.getItem('dashboardSort') || "default"
    );
    const [expandedCategories, setExpandedCategories] = useState(() => {
        try { return new Set(JSON.parse(localStorage.getItem('expandedCats') || '[]')); }
        catch { return new Set(); }
    });
    const [recentProblems, setRecentProblems] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [theme, setTheme] = useState(() =>
        typeof window !== 'undefined'
            ? document.documentElement.getAttribute('data-theme') || 'dark'
            : 'dark'
    );

    React.useEffect(() => {
        const observer = new MutationObserver(() =>
            setTheme(document.documentElement.getAttribute('data-theme') || 'dark')
        );
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        
        // Use the colors from index.css for light theme to maintain the default light color theme
        const root = document.documentElement;
        if (newTheme === 'light') {
            root.style.setProperty('--color-bg-primary', '#f0e6ff');
            root.style.setProperty('--color-bg-secondary', '#e8d9ff');
            root.style.setProperty('--color-bg-tertiary', '#ddc7ff');
            root.style.setProperty('--color-text-primary', '#1e1b29');
            root.style.setProperty('--color-text-secondary', '#4a4560');
            root.style.setProperty('--color-text-tertiary', '#6b6580');
            root.style.setProperty('--color-border', '#d4c5f9');
            root.style.setProperty('--color-accent-primary', '#7c3aed');
            root.style.setProperty('--color-accent-secondary', '#6366f1');
            root.style.setProperty('--color-accent-hover', '#8b5cf6');
        } else {
            root.style.setProperty('--color-bg-primary', '#0a0e1a');
            root.style.setProperty('--color-bg-secondary', '#131825');
            root.style.setProperty('--color-bg-tertiary', '#1a1f35');
            root.style.setProperty('--color-text-primary', '#e2e8f0');
            root.style.setProperty('--color-text-secondary', '#94a3b8');
            root.style.setProperty('--color-text-tertiary', '#64748b');
            root.style.setProperty('--color-border', '#334155');
            root.style.setProperty('--color-accent-primary', '#8b5cf6');
            root.style.setProperty('--color-accent-secondary', '#ec4899');
            root.style.setProperty('--color-accent-hover', '#a78bfa');
        }
        
        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('app-theme', newTheme);
        setTheme(newTheme);
    };

    useEffect(() => {
        const recent = JSON.parse(localStorage.getItem('recentProblems') || '[]');
        setRecentProblems(recent.slice(0, 4));
    }, []);

    useEffect(() => { localStorage.setItem('dashboardCategory', selectedCategory); }, [selectedCategory]);
    useEffect(() => { localStorage.setItem('dashboardSyllabus', String(showOnlySyllabus)); }, [showOnlySyllabus]);
    useEffect(() => { localStorage.setItem('dashboardSearch', searchQuery); }, [searchQuery]);
    useEffect(() => { localStorage.setItem('dashboardDifficulty', selectedDifficulty); }, [selectedDifficulty]);
    useEffect(() => { localStorage.setItem('dashboardSort', sortBy); }, [sortBy]);
    useEffect(() => {
        localStorage.setItem('expandedCats', JSON.stringify([...expandedCategories]));
    }, [expandedCategories]);

    const algorithmsWithTutorials = new Set([
        'bubble_sort', 'merge_sort', 'quick_sort', 'binary_search',
        'infix_to_postfix', 'infix_to_prefix', 'postfix_evaluation',
        'stack_ll', 'valid_parentheses', 'queue_ll', 'deque_ll',
        'circular_queue', 'message_queue',
        'two_sum', 'three_sum', 'longest_substring',
        'bst_search', 'bst_insert', 'bst_delete',
        'towers_of_hanoi', 'dfs_graph', 'open_hashing', 'avl_tree',
        'heap_sort', 'heapify',
        'knapsack_01', 'horspool_algorithm', 'boyer_moore_algorithm',
        'topological_sort', 'dijkstra_algorithm', 'prim_algorithm',
        'huffman_coding', 'presorting'
    ]);

    const isDark = theme === 'dark';

    // ── Grouped categories ──────────────────────────────────────────────────
    const categoriesWithCounts = useMemo(() => {
        const allCategories = Object.values(CATEGORIES);
        return allCategories.map(cat => ({
            name: cat,
            total: PROBLEMS.filter(p => p.category === cat).length,
            syllabus: PROBLEMS.filter(p => p.category === cat && p.inSyllabus).length,
        }));
    }, []);

    // ── Filtering ───────────────────────────────────────────────────────────
    let filteredProblems = PROBLEMS.filter(p => {
        const catOk = selectedCategory === "All" || p.category === selectedCategory;
        const syllabusOk = !showOnlySyllabus || p.inSyllabus;
        const diffOk = selectedDifficulty === "All" || p.difficulty === selectedDifficulty;
        const searchOk = !searchQuery ||
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase());
        return catOk && syllabusOk && diffOk && searchOk;
    });

    if (sortBy === "difficulty") {
        const order = { "Easy": 1, "Medium": 2, "Hard": 3 };
        filteredProblems = [...filteredProblems].sort((a, b) => order[a.difficulty] - order[b.difficulty]);
    } else if (sortBy === "name") {
        filteredProblems = [...filteredProblems].sort((a, b) => a.title.localeCompare(b.title));
    }

    const stats = {
        total: PROBLEMS.length,
        syllabus: PROBLEMS.filter(p => p.inSyllabus).length,
        withTutorials: algorithmsWithTutorials.size,
        easy: PROBLEMS.filter(p => p.difficulty === "Easy").length,
        medium: PROBLEMS.filter(p => p.difficulty === "Medium").length,
        hard: PROBLEMS.filter(p => p.difficulty === "Hard").length,
    };

    const handleProblemClick = (problem) => {
        const recent = JSON.parse(localStorage.getItem('recentProblems') || '[]');
        const updated = [problem.id, ...recent.filter(id => id !== problem.id)].slice(0, 10);
        localStorage.setItem('recentProblems', JSON.stringify(updated));
        onSelectProblem(problem);
    };

    const toggleCategory = (cat) => {
        setExpandedCategories(prev => {
            const next = new Set(prev);
            next.has(cat) ? next.delete(cat) : next.add(cat);
            return next;
        });
    };

    const difficultyColor = (d) => ({
        Easy: isDark ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-green-100 text-green-700 border-green-300',
        Medium: isDark ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-yellow-100 text-yellow-700 border-yellow-300',
        Hard: isDark ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-red-100 text-red-700 border-red-300',
    }[d] || '');

    const activeFilters = [
        selectedCategory !== "All" && { label: selectedCategory, clear: () => setSelectedCategory("All") },
        selectedDifficulty !== "All" && { label: selectedDifficulty, clear: () => setSelectedDifficulty("All") },
        showOnlySyllabus && { label: "Syllabus Only", clear: () => setShowOnlySyllabus(false) },
        searchQuery && { label: `"${searchQuery}"`, clear: () => setSearchQuery("") },
    ].filter(Boolean);

    // ── Sidebar Category Tree ───────────────────────────────────────────────
    const SidebarTree = () => (
        <aside
            className={`flex-shrink-0 ${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'} transition-all duration-300 flex flex-col h-full`}
        >
            <div className={`h-full overflow-y-auto border-r ${isDark ? 'border-white/10 bg-[var(--color-bg-secondary)]' : 'border-black/10 bg-white'} flex flex-col`}>
                {/* Sidebar Header */}
                <div className="p-4 border-b border-[var(--color-border)] flex-shrink-0">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-tertiary)] mb-3">Browse Topics</h2>

                    {/* All / Syllabus toggle */}
                    <div className={`flex rounded-lg p-0.5 ${isDark ? 'bg-white/5' : 'bg-black/5'} gap-0.5`}>
                        <button
                            onClick={() => { setSelectedCategory("All"); setShowOnlySyllabus(false); }}
                            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                                !showOnlySyllabus && selectedCategory === "All"
                                    ? isDark ? 'bg-white text-black' : 'bg-[var(--color-accent-primary)] text-white'
                                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                            }`}
                        >
                            All ({stats.total})
                        </button>
                        <button
                            onClick={() => { setSelectedCategory("All"); setShowOnlySyllabus(true); }}
                            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1 ${
                                showOnlySyllabus
                                    ? isDark ? 'bg-white text-black' : 'bg-[var(--color-accent-primary)] text-white'
                                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                            }`}
                        >
                            <Star size={10} />
                            Syllabus ({stats.syllabus})
                        </button>
                    </div>
                </div>

                {/* Category Tree */}
                <nav className="flex-1 p-2 overflow-y-auto">
                    {/* "All" entry */}
                    <button
                        onClick={() => setSelectedCategory("All")}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all mb-1 ${
                            selectedCategory === "All" && !showOnlySyllabus
                                ? isDark
                                    ? 'bg-white/10 text-white'
                                    : 'bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)]'
                                : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]'
                        }`}
                    >
                        <Layers size={14} className="flex-shrink-0" />
                        <span className="flex-1 text-left">All Topics</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>{stats.total}</span>
                    </button>

                    {/* Categories */}
                    {categoriesWithCounts.map(({ name, total, syllabus }) => {
                        const meta = CATEGORY_META[name] || DEFAULT_META;
                        const Icon = meta.icon;
                        const isActive = selectedCategory === name;
                        const isExpanded = expandedCategories.has(name);
                        const catProblems = PROBLEMS.filter(p =>
                            p.category === name &&
                            (!showOnlySyllabus || p.inSyllabus) &&
                            (selectedDifficulty === "All" || p.difficulty === selectedDifficulty)
                        );

                        return (
                            <div key={name} className="mb-0.5">
                                {/* Category Row */}
                                <div className={`flex items-center gap-1 rounded-lg transition-all ${
                                    isActive
                                        ? `${meta.bg} ${meta.text}`
                                        : 'hover:bg-[var(--color-bg-tertiary)]'
                                }`}>
                                    <button
                                        onClick={() => setSelectedCategory(name)}
                                        className={`flex-1 flex items-center gap-2 px-3 py-2 text-sm font-medium text-left ${
                                            isActive ? meta.text : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                                        }`}
                                    >
                                        <Icon size={14} className={`flex-shrink-0 ${isActive ? meta.text : 'text-[var(--color-text-tertiary)]'}`} />
                                        <span className="flex-1 truncate">{name}</span>
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono flex-shrink-0 ${
                                            isActive ? `${meta.bg} ${meta.text}` : isDark ? 'bg-white/10 text-[var(--color-text-tertiary)]' : 'bg-black/10'
                                        }`}>{showOnlySyllabus ? syllabus : total}</span>
                                    </button>
                                    <button
                                        onClick={() => toggleCategory(name)}
                                        className={`p-1.5 mr-1 rounded transition-all ${isActive ? meta.text : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]'}`}
                                        title={isExpanded ? "Collapse" : "Expand"}
                                    >
                                        {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                                    </button>
                                </div>

                                {/* Sub-algorithm list */}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="ml-4 pl-3 border-l border-[var(--color-border)] py-1 space-y-0.5">
                                                {catProblems.map(p => (
                                                    <button
                                                        key={p.id}
                                                        onClick={() => handleProblemClick(p)}
                                                        className="w-full text-left px-2 py-1 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary)]/5 rounded transition-all flex items-center gap-1.5 group"
                                                    >
                                                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                                            p.difficulty === 'Easy' ? 'bg-green-400' :
                                                            p.difficulty === 'Medium' ? 'bg-yellow-400' : 'bg-red-400'
                                                        }`} />
                                                        <span className="flex-1 truncate">{p.title}</span>
                                                        {algorithmsWithTutorials.has(p.id) && (
                                                            <BookOpen size={9} className="flex-shrink-0 text-purple-400 opacity-70" />
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </nav>

                {/* Sidebar Footer Stats */}
                <div className={`p-3 border-t border-[var(--color-border)] flex-shrink-0 ${isDark ? 'bg-white/3' : 'bg-black/3'}`}>
                    <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                            <div className="text-sm font-bold text-green-400">{stats.easy}</div>
                            <div className="text-[9px] text-[var(--color-text-tertiary)] uppercase tracking-wider">Easy</div>
                        </div>
                        <div>
                            <div className="text-sm font-bold text-yellow-400">{stats.medium}</div>
                            <div className="text-[9px] text-[var(--color-text-tertiary)] uppercase tracking-wider">Medium</div>
                        </div>
                        <div>
                            <div className="text-sm font-bold text-red-400">{stats.hard}</div>
                            <div className="text-[9px] text-[var(--color-text-tertiary)] uppercase tracking-wider">Hard</div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );

    // ── Algorithm Card ──────────────────────────────────────────────────────
    const AlgorithmCard = ({ problem }) => {
        const meta = CATEGORY_META[problem.category] || DEFAULT_META;
        const hasTutorial = algorithmsWithTutorials.has(problem.id);

        return (
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.25 }}
                whileHover={{ y: -2 }}
            >
                <div
                    onClick={() => handleProblemClick(problem)}
                    className={`group relative rounded-xl border overflow-hidden cursor-pointer transition-all duration-200 flex flex-col h-full ${
                        isDark
                            ? 'bg-[var(--color-bg-secondary)] border-white/8 hover:border-white/20 hover:shadow-xl hover:shadow-black/30'
                            : 'bg-white border-black/10 hover:border-[var(--color-accent-primary)]/40 hover:shadow-lg'
                    }`}
                >
                    {/* Top accent bar */}
                    <div className={`h-0.5 w-full bg-gradient-to-r ${meta.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />

                    <div className="p-5 flex flex-col h-full">
                        {/* Header row: badges + icon */}
                        <div className="flex items-start justify-between mb-3 gap-2">
                            <div className="flex flex-wrap gap-1.5">
                                <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider border ${difficultyColor(problem.difficulty)}`}>
                                    {problem.difficulty}
                                </span>
                                <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider ${meta.bg} ${meta.text} border ${meta.border}`}>
                                    {problem.category}
                                </span>
                                {hasTutorial && (
                                    <span className="px-2 py-0.5 rounded text-[9px] bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold flex items-center gap-1">
                                        <BookOpen size={8} /> Tutorial
                                    </span>
                                )}
                                {problem.inSyllabus && (
                                    <span className="px-2 py-0.5 rounded text-[9px] bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold flex items-center gap-1">
                                        <Star size={8} /> Syllabus
                                    </span>
                                )}
                            </div>
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${meta.bg} group-hover:scale-110 transition-transform`}>
                                {React.createElement(meta.icon, { size: 16, className: meta.text })}
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className={`text-base font-bold mb-1.5 group-hover:${meta.text} transition-colors leading-snug`}>
                            {problem.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 mb-3 flex-1 leading-relaxed">
                            {problem.description}
                        </p>

                        {/* Real-world applications */}
                        {problem.applications && (
                            <div className="mb-3">
                                <div className="flex flex-wrap gap-1">
                                    {problem.applications.split(',').slice(0, 2).map((app, i) => (
                                        <span
                                            key={i}
                                            className={`text-[9px] px-2 py-0.5 rounded-full border font-medium ${
                                                isDark
                                                    ? 'bg-pink-500/5 text-pink-300/70 border-pink-500/15'
                                                    : 'bg-pink-50 text-pink-700 border-pink-200'
                                            }`}
                                            title={app.trim()}
                                        >
                                            {app.trim().length > 36 ? app.trim().slice(0, 36) + '…' : app.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Complexity footer */}
                        <div className={`flex items-center justify-between pt-3 border-t ${isDark ? 'border-white/8' : 'border-black/8'} text-[10px] font-mono text-[var(--color-text-tertiary)]`}>
                            <div className="flex items-center gap-1">
                                <Clock size={11} />
                                <span>T: <span className="text-[var(--color-text-secondary)] font-semibold">{problem.timeComplexity}</span></span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Boxes size={11} />
                                <span>S: <span className="text-[var(--color-text-secondary)] font-semibold">{problem.spaceComplexity}</span></span>
                            </div>
                            <ArrowRight size={13} className={`${meta.text} opacity-0 group-hover:opacity-100 transition-opacity`} />
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <div className={`min-h-screen flex flex-col bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]`}>

            {/* ── Top Navigation Bar ── */}
            <header className={`sticky top-0 z-30 border-b ${isDark ? 'border-white/10 bg-[var(--color-bg-primary)]/90' : 'border-black/10 bg-white/90'} backdrop-blur-md`}>
                <div className="max-w-screen-2xl mx-auto px-4 h-14 flex items-center gap-4">
                    {/* Sidebar toggle */}
                    <button
                        onClick={() => setSidebarOpen(o => !o)}
                        className={`p-2 rounded-lg transition-all ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'} text-[var(--color-text-secondary)]`}
                        title="Toggle sidebar"
                    >
                        <Filter size={18} />
                    </button>

                    {/* Logo/Brand */}
                    <div className="flex items-center gap-2 mr-4">
                        <div className="w-8 h-8 flex items-center justify-center">
                            <img src="/algorithm-icon.svg" alt="Master Algorithm Logo" className="w-full h-full object-contain filter drop-shadow-sm" />
                        </div>
                        <span className="font-bold text-sm hidden sm:block">Master Algorithm</span>
                    </div>

                    {/* Search bar */}
                    <div className="flex-1 relative max-w-xl">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" size={16} />
                        <input
                            type="text"
                            placeholder="Search algorithms…"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)]/30 ${
                                isDark
                                    ? 'bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-white/20'
                                    : 'bg-black/5 border-black/10 placeholder-black/30 focus:border-black/20'
                            }`}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    {/* Right controls */}
                    <div className="flex items-center gap-2 ml-auto">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-lg transition-all ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'} text-[var(--color-text-secondary)] mr-1`}
                            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                        >
                            {isDark ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        {/* Difficulty filter */}
                        <select
                            value={selectedDifficulty}
                            onChange={e => setSelectedDifficulty(e.target.value)}
                            className={`text-xs py-1.5 px-3 rounded-lg border font-medium cursor-pointer transition-all focus:outline-none ${
                                isDark
                                    ? 'bg-white/5 border-white/10 text-[var(--color-text-secondary)] hover:border-white/20'
                                    : 'bg-black/5 border-black/10 hover:border-black/20'
                            }`}
                        >
                            <option value="All">All Levels</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>

                        {/* Sort */}
                        <select
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value)}
                            className={`text-xs py-1.5 px-3 rounded-lg border font-medium cursor-pointer transition-all focus:outline-none ${
                                isDark
                                    ? 'bg-white/5 border-white/10 text-[var(--color-text-secondary)] hover:border-white/20'
                                    : 'bg-black/5 border-black/10 hover:border-black/20'
                            }`}
                        >
                            <option value="default">Default Order</option>
                            <option value="difficulty">By Difficulty</option>
                            <option value="name">A – Z</option>
                        </select>

                        {/* Stats summary */}
                        <div className={`hidden lg:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border ${isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}>
                            <Award size={13} className="text-[var(--color-accent-primary)]" />
                            <span className="font-bold text-[var(--color-accent-primary)]">{stats.total}</span>
                            <span className="text-[var(--color-text-tertiary)]">algorithms</span>
                            <span className="text-[var(--color-text-tertiary)]">·</span>
                            <BookOpen size={12} className="text-purple-400" />
                            <span className="font-bold text-purple-400">{stats.withTutorials}</span>
                            <span className="text-[var(--color-text-tertiary)]">tutorials</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* ── Hero Banner ── */}
            <div className="relative overflow-hidden border-b border-[var(--color-border)]">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-primary)]/5 via-transparent to-[var(--color-accent-secondary)]/5 pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-[var(--color-accent-primary)]/8 to-transparent blur-3xl pointer-events-none" />
                <div className="max-w-screen-2xl mx-auto px-4 py-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
                    >
                        <div>
                            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
                                <span className="bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] bg-clip-text text-transparent">
                                    Master Algorithms
                                </span>
                            </h1>
                            <p className="text-sm text-[var(--color-text-secondary)] max-w-lg leading-relaxed">
                                Visualize, understand, and conquer algorithms with interactive step-by-step executions.
                                Covers sorting, graphs, DP, string matching, and more.
                            </p>
                        </div>

                        {/* Stat pills */}
                        <div className="flex flex-wrap gap-2">
                            {[
                                { val: stats.total, label: "Algorithms", color: "from-blue-500/20 to-blue-500/5", border: "border-blue-500/20", text: "text-blue-400", icon: Code2 },
                                { val: stats.syllabus, label: "In Syllabus", color: "from-green-500/20 to-green-500/5", border: "border-green-500/20", text: "text-green-400", icon: Star },
                                { val: stats.withTutorials, label: "Tutorials", color: "from-purple-500/20 to-purple-500/5", border: "border-purple-500/20", text: "text-purple-400", icon: BookOpen },
                                { val: Object.values(CATEGORIES).length, label: "Topics", color: "from-orange-500/20 to-orange-500/5", border: "border-orange-500/20", text: "text-orange-400", icon: Layers },
                            ].map(({ val, label, color, border, text, icon: Icon }) => (
                                <div key={label} className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border bg-gradient-to-br ${color} ${border}`}>
                                    <Icon size={14} className={text} />
                                    <div>
                                        <div className={`text-lg font-bold leading-none ${text}`}>{val}</div>
                                        <div className="text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider">{label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ── Main Body: Sidebar + Content ── */}
            <div className="flex flex-1 max-w-screen-2xl mx-auto w-full">

                {/* Sidebar */}
                <SidebarTree />

                {/* Content area */}
                <main className="flex-1 min-w-0 px-4 py-6">

                    {/* Active filter chips */}
                    {activeFilters.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className="text-xs text-[var(--color-text-tertiary)]">Active filters:</span>
                            {activeFilters.map((f, i) => (
                                <button
                                    key={i}
                                    onClick={f.clear}
                                    className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border font-medium transition-all hover:opacity-80 ${
                                        isDark
                                            ? 'bg-[var(--color-accent-primary)]/10 border-[var(--color-accent-primary)]/30 text-[var(--color-accent-primary)]'
                                            : 'bg-blue-50 border-blue-300 text-blue-700'
                                    }`}
                                >
                                    {f.label} <X size={11} />
                                </button>
                            ))}
                            <button
                                onClick={() => {
                                    setSelectedCategory("All");
                                    setSelectedDifficulty("All");
                                    setShowOnlySyllabus(false);
                                    setSearchQuery("");
                                }}
                                className="text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] underline"
                            >
                                Clear all
                            </button>
                        </div>
                    )}

                    {/* Section header */}
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                            {selectedCategory !== "All" && (() => {
                                const meta = CATEGORY_META[selectedCategory] || DEFAULT_META;
                                return <span className={`text-xs font-bold uppercase tracking-widest ${meta.text}`}>{selectedCategory}</span>;
                            })()}
                            <span className="text-[var(--color-text-tertiary)] text-sm">
                                {filteredProblems.length === stats.total
                                    ? <><span className="font-bold text-[var(--color-text-primary)]">{filteredProblems.length}</span> algorithms</>
                                    : <><span className="font-bold text-[var(--color-accent-primary)]">{filteredProblems.length}</span> of {stats.total} algorithms</>
                                }
                            </span>
                        </div>
                    </div>

                    {/* Recently Viewed */}
                    {recentProblems.length > 0 && selectedCategory === "All" && !searchQuery && (
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-3">
                                <TrendingUp size={14} className="text-[var(--color-accent-primary)]" />
                                <h2 className="text-sm font-bold">Recently Viewed</h2>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {recentProblems.map(id => {
                                    const p = PROBLEMS.find(pr => pr.id === id);
                                    if (!p) return null;
                                    const meta = CATEGORY_META[p.category] || DEFAULT_META;
                                    return (
                                        <button
                                            key={id}
                                            onClick={() => handleProblemClick(p)}
                                            className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all hover:scale-[1.02] ${
                                                isDark
                                                    ? 'bg-white/5 border-white/8 hover:border-white/15'
                                                    : 'bg-black/3 border-black/10 hover:border-black/20'
                                            }`}
                                        >
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${meta.bg}`}>
                                                {React.createElement(meta.icon, { size: 14, className: meta.text })}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="text-xs font-semibold truncate">{p.title}</div>
                                                <div className={`text-[10px] ${meta.text}`}>{p.category}</div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Algorithm Grid */}
                    {filteredProblems.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {filteredProblems.map(problem => (
                                <AlgorithmCard key={problem.id} problem={problem} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[var(--color-bg-tertiary)] flex items-center justify-center">
                                    <Search className="text-[var(--color-text-tertiary)]" size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">No algorithms found</h3>
                                <p className="text-[var(--color-text-secondary)] mb-6 max-w-sm">
                                    Try adjusting your filters or search query to find what you're looking for.
                                </p>
                                <Button
                                    onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setSelectedDifficulty("All"); setShowOnlySyllabus(false); }}
                                    variant="outline"
                                >
                                    Clear All Filters
                                </Button>
                            </motion.div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
