import React, { useState, useEffect } from 'react';
import { Bookmark, BookmarkCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function BookmarkManager({ currentAlgorithm, allProblems, onSelectProblem }) {
    const [bookmarks, setBookmarks] = useState([]);
    const [showPanel, setShowPanel] = useState(false);

    // Load bookmarks from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('algo-bookmarks');
        if (saved) {
            try {
                setBookmarks(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to load bookmarks', e);
            }
        }
    }, []);

    // Save bookmarks to localStorage
    const saveBookmarks = (newBookmarks) => {
        setBookmarks(newBookmarks);
        localStorage.setItem('algo-bookmarks', JSON.stringify(newBookmarks));
    };

    const isBookmarked = currentAlgorithm && bookmarks.includes(currentAlgorithm.id);

    const toggleBookmark = () => {
        if (!currentAlgorithm) return;

        const newBookmarks = isBookmarked
            ? bookmarks.filter(id => id !== currentAlgorithm.id)
            : [...bookmarks, currentAlgorithm.id];
        
        saveBookmarks(newBookmarks);
    };

    const removeBookmark = (id) => {
        saveBookmarks(bookmarks.filter(bm => bm !== id));
    };

    const bookmarkedProblems = allProblems.filter(p => bookmarks.includes(p.id));

    return (
        <>
            {/* Bookmark Toggle Button */}
            {currentAlgorithm && (
                <button
                    onClick={toggleBookmark}
                    className={`p-2 rounded-lg transition-all ${
                        isBookmarked
                            ? 'bg-[var(--color-accent-primary)] text-white'
                            : 'hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]'
                    }`}
                    aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                    title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                >
                    {isBookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                </button>
            )}

            {/* Bookmarks Panel */}
            <div className="relative">
                <button
                    onClick={() => setShowPanel(!showPanel)}
                    className="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors relative"
                    aria-label="View bookmarks"
                >
                    <BookmarkCheck size={20} className="text-[var(--color-text-secondary)]" />
                    {bookmarks.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-[var(--color-accent-primary)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                            {bookmarks.length}
                        </span>
                    )}
                </button>

                <AnimatePresence>
                    {showPanel && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg shadow-xl z-50"
                        >
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                                        Bookmarked Algorithms ({bookmarks.length})
                                    </h3>
                                    <button
                                        onClick={() => setShowPanel(false)}
                                        className="p-1 hover:bg-[var(--color-bg-tertiary)] rounded"
                                    >
                                        <X size={16} className="text-[var(--color-text-secondary)]" />
                                    </button>
                                </div>

                                {bookmarkedProblems.length === 0 ? (
                                    <p className="text-sm text-[var(--color-text-secondary)] text-center py-8">
                                        No bookmarks yet. Click the bookmark icon to save your favorite algorithms!
                                    </p>
                                ) : (
                                    <div className="space-y-2">
                                        {bookmarkedProblems.map((problem) => (
                                            <div
                                                key={problem.id}
                                                className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] cursor-pointer group"
                                            >
                                                <button
                                                    onClick={() => {
                                                        onSelectProblem(problem);
                                                        setShowPanel(false);
                                                    }}
                                                    className="flex-1 text-left"
                                                >
                                                    <div className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)]">
                                                        {problem.title}
                                                    </div>
                                                    <div className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                                                        {problem.category} • {problem.difficulty}
                                                    </div>
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeBookmark(problem.id);
                                                    }}
                                                    className="p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[var(--color-bg-primary)] rounded"
                                                    aria-label="Remove bookmark"
                                                >
                                                    <X size={14} className="text-[var(--color-text-tertiary)]" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
