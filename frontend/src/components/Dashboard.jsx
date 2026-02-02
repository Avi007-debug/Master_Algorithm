import React, { useState, useEffect } from 'react';
import { PROBLEMS, CATEGORIES } from '../data/problems';
import { Card, Button } from './ui/common';
import { ArrowRight, Code2, Cpu, Clock, Boxes, Search, Star, BookOpen, TrendingUp, Award, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

export function Dashboard({ onSelectProblem }) {
    // Persist dashboard state
    const [selectedCategory, setSelectedCategory] = useState(() => {
        return localStorage.getItem('dashboardCategory') || "All";
    });
    const [showOnlySyllabus, setShowOnlySyllabus] = useState(() => {
        return localStorage.getItem('dashboardSyllabus') === 'true';
    });
    const [searchQuery, setSearchQuery] = useState(() => {
        return localStorage.getItem('dashboardSearch') || "";
    });
    const [selectedDifficulty, setSelectedDifficulty] = useState(() => {
        return localStorage.getItem('dashboardDifficulty') || "All";
    });
    const [sortBy, setSortBy] = useState(() => {
        return localStorage.getItem('dashboardSort') || "default";
    });
    const [recentProblems, setRecentProblems] = useState([]);
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return document.documentElement.getAttribute('data-theme') || 'dark';
        }
        return 'dark';
    });

    React.useEffect(() => {
        const observer = new MutationObserver(() => {
            setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    // Load recent problems from localStorage
    useEffect(() => {
        const recent = JSON.parse(localStorage.getItem('recentProblems') || '[]');
        setRecentProblems(recent.slice(0, 3)); // Show last 3
    }, []);

    // Save dashboard state to localStorage
    useEffect(() => {
        localStorage.setItem('dashboardCategory', selectedCategory);
    }, [selectedCategory]);
    
    useEffect(() => {
        localStorage.setItem('dashboardSyllabus', String(showOnlySyllabus));
    }, [showOnlySyllabus]);
    
    useEffect(() => {
        localStorage.setItem('dashboardSearch', searchQuery);
    }, [searchQuery]);
    
    useEffect(() => {
        localStorage.setItem('dashboardDifficulty', selectedDifficulty);
    }, [selectedDifficulty]);
    
    useEffect(() => {
        localStorage.setItem('dashboardSort', sortBy);
    }, [sortBy]);

    // Algorithm IDs that have tutorials
    const algorithmsWithTutorials = new Set([
        'bubble_sort', 'merge_sort', 'binary_search', 'infix_to_postfix', 'infix_to_prefix',
        'postfix_evaluation', 'stack_ll', 'valid_parentheses', 'queue_ll', 'deque_ll',
        'circular_queue', 'message_queue', 'two_sum', 'three_sum', 'longest_substring',
        'bst_search', 'towers_of_hanoi', 'dfs_graph', 'open_hashing', 'avl_tree',
        'heap_sort', 'bst_insert', 'bst_delete'
    ]);

    const categories = ["All", ...Object.values(CATEGORIES)];
    const difficulties = ["All", "Easy", "Medium", "Hard"];

    let filteredProblems = PROBLEMS.filter(p => {
        const categoryMatch = selectedCategory === "All" || p.category === selectedCategory;
        const syllabusMatch = !showOnlySyllabus || p.inSyllabus;
        const difficultyMatch = selectedDifficulty === "All" || p.difficulty === selectedDifficulty;
        const searchMatch = searchQuery === "" || 
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return categoryMatch && syllabusMatch && difficultyMatch && searchMatch;
    });

    // Sort problems
    if (sortBy === "difficulty") {
        const diffOrder = { "Easy": 1, "Medium": 2, "Hard": 3 };
        filteredProblems = [...filteredProblems].sort((a, b) => diffOrder[a.difficulty] - diffOrder[b.difficulty]);
    } else if (sortBy === "name") {
        filteredProblems = [...filteredProblems].sort((a, b) => a.title.localeCompare(b.title));
    }

    const isDark = theme === 'dark';

    const handleProblemClick = (problem) => {
        // Save to recent
        const recent = JSON.parse(localStorage.getItem('recentProblems') || '[]');
        const updated = [problem.id, ...recent.filter(id => id !== problem.id)].slice(0, 10);
        localStorage.setItem('recentProblems', JSON.stringify(updated));
        onSelectProblem(problem);
    };

    // Stats
    const stats = {
        total: PROBLEMS.length,
        syllabus: PROBLEMS.filter(p => p.inSyllabus).length,
        withTutorials: PROBLEMS.filter(p => algorithmsWithTutorials.has(p.id)).length,
        easy: PROBLEMS.filter(p => p.difficulty === "Easy").length,
        medium: PROBLEMS.filter(p => p.difficulty === "Medium").length,
        hard: PROBLEMS.filter(p => p.difficulty === "Hard").length,
    };

    return (
        <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] font-sans selection:bg-[var(--color-accent-primary)] selection:text-white pb-20">

            {/* Hero Section */}
            <div className="relative pt-24 pb-16 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-[var(--color-accent-primary)] via-[var(--color-accent-secondary)] to-[var(--color-accent-pink)] opacity-[0.08] blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
                            <span className="bg-gradient-to-br from-[var(--color-text-primary)] via-purple-300 to-blue-300 bg-clip-text text-transparent">
                                Master{' '}
                            </span>
                            <span className="bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] bg-clip-text text-transparent">
                                Algorithms
                            </span>
                        </h1>
                        <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
                            Visualize, understand, and conquer coding interview problems with
                            <span className="text-[var(--color-accent-primary)] font-semibold"> interactive step-by-step executions</span>.
                        </p>
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
                            <span className="px-3 py-1 bg-[var(--color-accent-green)]/10 text-[var(--color-accent-green)] rounded-full border border-[var(--color-accent-green)]/20 font-medium">✓ {stats.total} Algorithms</span>
                            <span className="px-3 py-1 bg-[var(--color-accent-cyan)]/10 text-[var(--color-accent-cyan)] rounded-full border border-[var(--color-accent-cyan)]/20 font-medium">⚡ Real-time Visualization</span>
                            <span className="px-3 py-1 bg-[var(--color-accent-pink)]/10 text-[var(--color-accent-pink)] rounded-full border border-[var(--color-accent-pink)]/20 font-medium">💻 Full Code Examples</span>
                            <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20 font-medium">🎓 {stats.withTutorials} Interactive Tutorials</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="max-w-7xl mx-auto px-6 mb-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl p-4 text-center"
                    >
                        <div className="text-3xl font-bold text-green-400">{stats.easy}</div>
                        <div className="text-sm text-[var(--color-text-secondary)] mt-1">Easy Problems</div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-xl p-4 text-center"
                    >
                        <div className="text-3xl font-bold text-yellow-400">{stats.medium}</div>
                        <div className="text-sm text-[var(--color-text-secondary)] mt-1">Medium Problems</div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-xl p-4 text-center"
                    >
                        <div className="text-3xl font-bold text-red-400">{stats.hard}</div>
                        <div className="text-sm text-[var(--color-text-secondary)] mt-1">Hard Problems</div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-4 text-center"
                    >
                        <div className="text-3xl font-bold text-purple-400">{stats.withTutorials}</div>
                        <div className="text-sm text-[var(--color-text-secondary)] mt-1">With Tutorials</div>
                    </motion.div>
                </div>
            </div>

            {/* Recent Problems */}
            {recentProblems.length > 0 && (
                <div className="max-w-7xl mx-auto px-6 mb-12">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="text-[var(--color-accent-primary)]" size={20} />
                        <h2 className="text-xl font-bold">Recently Viewed</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {recentProblems.map(id => {
                            const problem = PROBLEMS.find(p => p.id === id);
                            if (!problem) return null;
                            return (
                                <Card
                                    key={id}
                                    className="cursor-pointer hover:border-[var(--color-accent-primary)]/50 transition-all group"
                                    onClick={() => handleProblemClick(problem)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-sm group-hover:text-[var(--color-accent-primary)] transition-colors">{problem.title}</h3>
                                            <div className="flex gap-2 mt-2">
                                                <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold ${problem.difficulty === 'Easy' ? 'bg-green-500/10 text-green-400' : problem.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'}`}>
                                                    {problem.difficulty}
                                                </span>
                                                {algorithmsWithTutorials.has(problem.id) && (
                                                    <span className="px-2 py-0.5 rounded text-[9px] bg-purple-500/10 text-purple-400 font-bold flex items-center gap-1">
                                                        <BookOpen size={10} />
                                                        Tutorial
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <ArrowRight className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent-primary)] transition-colors" size={16} />
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Filters Section */}
            <div className="max-w-7xl mx-auto px-6 mb-10">
                {/* Search Bar */}
                <div className="mb-6 relative max-w-2xl mx-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" size={20} />
                    <input
                        type="text"
                        placeholder="Search algorithms... (e.g., 'bubble sort', 'binary tree')"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:border-[var(--color-accent-primary)] focus:ring-2 focus:ring-[var(--color-accent-primary)]/20 transition-all"
                    />
                </div>

                {/* Syllabus / Difficulty / Sort Filter */}
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
                    {/* Syllabus Toggle */}
                    <div className="inline-flex rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-1">
                        <button
                            onClick={() => setShowOnlySyllabus(false)}
                            className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                                !showOnlySyllabus
                                    ? isDark ? 'bg-[var(--color-text-primary)] text-[var(--color-bg-primary)]' : 'bg-[var(--color-accent-primary)] text-white shadow-sm'
                                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                            }`}
                        >
                            All ({stats.total})
                        </button>
                        <button
                            onClick={() => setShowOnlySyllabus(true)}
                            className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                                showOnlySyllabus
                                    ? isDark ? 'bg-[var(--color-text-primary)] text-[var(--color-bg-primary)]' : 'bg-[var(--color-accent-primary)] text-white shadow-sm'
                                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                            }`}
                        >
                            <span className="flex items-center gap-2">
                                <Star size={14} />
                                Syllabus ({stats.syllabus})
                            </span>
                        </button>
                    </div>

                    {/* Difficulty Filter */}
                    <div className="inline-flex rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-1">
                        {difficulties.map(diff => (
                            <button
                                key={diff}
                                onClick={() => setSelectedDifficulty(diff)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                                    selectedDifficulty === diff
                                        ? isDark ? 'bg-[var(--color-text-primary)] text-[var(--color-bg-primary)]' : 'bg-[var(--color-accent-primary)] text-white shadow-sm'
                                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                                }`}
                            >
                                {diff}
                            </button>
                        ))}
                    </div>

                    {/* Sort By */}
                    <div className="inline-flex rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-1">
                        <button
                            onClick={() => setSortBy("default")}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                                sortBy === "default"
                                    ? isDark ? 'bg-[var(--color-text-primary)] text-[var(--color-bg-primary)]' : 'bg-[var(--color-accent-primary)] text-white shadow-sm'
                                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                            }`}
                        >
                            Default
                        </button>
                        <button
                            onClick={() => setSortBy("difficulty")}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                                sortBy === "difficulty"
                                    ? isDark ? 'bg-[var(--color-text-primary)] text-[var(--color-bg-primary)]' : 'bg-[var(--color-accent-primary)] text-white shadow-sm'
                                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                            }`}
                        >
                            Difficulty
                        </button>
                        <button
                            onClick={() => setSortBy("name")}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                                sortBy === "name"
                                    ? isDark ? 'bg-[var(--color-text-primary)] text-[var(--color-bg-primary)]' : 'bg-[var(--color-accent-primary)] text-white shadow-sm'
                                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                            }`}
                        >
                            Name A-Z
                        </button>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="overflow-x-auto pb-4 scrollbar-hide">
                    <div className="flex gap-2 justify-center min-w-max px-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                                    selectedCategory === cat
                                        ? isDark ? 'bg-[var(--color-text-primary)] text-[var(--color-bg-primary)]' : 'bg-[var(--color-accent-primary)] text-white shadow-md'
                                        : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border)]'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Count */}
                <div className="text-center mt-4 text-sm text-[var(--color-text-secondary)]">
                    Showing <span className="font-semibold text-[var(--color-accent-primary)]">{filteredProblems.length}</span> algorithm{filteredProblems.length !== 1 ? 's' : ''}
                </div>
            </div>

            {/* Problems Grid */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProblems.map((problem) => (
                    <motion.div
                        key={problem.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card
                            className={`h-full flex flex-col group hover:border-[var(--color-accent-primary)]/50 transition-all cursor-pointer relative overflow-hidden ${isDark ? '' : 'shadow-md hover:shadow-lg'}`}
                            onClick={() => handleProblemClick(problem)}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br from-transparent ${isDark ? 'to-[var(--color-bg-tertiary)]' : 'to-[var(--color-accent-primary)]/5'} opacity-0 group-hover:opacity-100 transition-opacity`} />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex gap-2 flex-wrap">
                                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${problem.difficulty === 'Easy' ? isDark ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-green-100 text-green-700 border-green-300' :
                                                problem.difficulty === 'Medium' ? isDark ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-yellow-100 text-yellow-700 border-yellow-300' :
                                                    isDark ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-red-100 text-red-700 border-red-300'
                                            }`}>
                                            {problem.difficulty}
                                        </span>
                                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${isDark ? 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]' : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]'}`}>
                                            {problem.category}
                                        </span>
                                        {algorithmsWithTutorials.has(problem.id) && (
                                            <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold flex items-center gap-1">
                                                <BookOpen size={10} />
                                                Tutorial
                                            </span>
                                        )}
                                        {problem.inSyllabus && (
                                            <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold flex items-center gap-1">
                                                <Star size={10} />
                                                Syllabus
                                            </span>
                                        )}
                                    </div>
                                    <Code2 size={20} className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent-primary)] transition-colors" />
                                </div>

                                <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-accent-primary)] transition-colors">
                                    {problem.title}
                                </h3>

                                <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-6 flex-1">
                                    {problem.description}
                                </p>

                                {/* Visualization Note for Complex Algorithms */}
                                {problem.visualizationNote && (
                                    <div className="mb-3 p-2.5 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                                        <p className="text-xs font-medium text-yellow-700 dark:text-yellow-400">
                                            {problem.visualizationNote}
                                        </p>
                                    </div>
                                )}

                                <div className={`grid grid-cols-2 gap-2 mt-auto text-xs text-[var(--color-text-secondary)] font-mono ${isDark ? 'border-t border-[var(--color-border)]' : 'border-t border-[var(--color-border)]'} pt-4`}>
                                    <div className="flex items-center gap-1.5">
                                        <Clock size={14} />
                                        <span>Time: <span className="text-[var(--color-text-primary)]">{problem.timeComplexity}</span></span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Boxes size={14} />
                                        <span>Space: <span className="text-[var(--color-text-primary)]">{problem.spaceComplexity}</span></span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {filteredProblems.length === 0 && (
                <div className="text-center py-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-md mx-auto"
                    >
                        <div className="w-20 h-20 mx-auto mb-6 bg-[var(--color-bg-tertiary)] rounded-full flex items-center justify-center">
                            <Search className="text-[var(--color-text-tertiary)]" size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">No algorithms found</h3>
                        <p className="text-[var(--color-text-secondary)] mb-6">
                            Try adjusting your filters or search query
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <Button 
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedCategory("All");
                                    setSelectedDifficulty("All");
                                    setShowOnlySyllabus(false);
                                }}
                                variant="outline"
                            >
                                Clear All Filters
                            </Button>
                            {searchQuery && (
                                <Button 
                                    onClick={() => setSearchQuery("")}
                                    variant="ghost"
                                >
                                    Clear Search
                                </Button>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
