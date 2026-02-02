import React, { useState, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const THEMES = {
    dark: {
        name: 'Dark',
        colors: {
            '--color-bg-primary': '#0a0e1a',
            '--color-bg-secondary': '#131825',
            '--color-bg-tertiary': '#1a1f35',
            '--color-text-primary': '#e2e8f0',
            '--color-text-secondary': '#94a3b8',
            '--color-text-tertiary': '#64748b',
            '--color-border': '#334155',
            '--color-accent-primary': '#8b5cf6',
            '--color-accent-secondary': '#ec4899',
            '--color-accent-hover': '#a78bfa',
        }
    },
    light: {
        name: 'Light',
        colors: {
            '--color-bg-primary': '#ffffff',
            '--color-bg-secondary': '#f8fafc',
            '--color-bg-tertiary': '#f1f5f9',
            '--color-text-primary': '#0f172a',
            '--color-text-secondary': '#475569',
            '--color-text-tertiary': '#94a3b8',
            '--color-border': '#e2e8f0',
            '--color-accent-primary': '#8b5cf6',
            '--color-accent-secondary': '#ec4899',
            '--color-accent-hover': '#7c3aed',
        }
    },
    nord: {
        name: 'Nord',
        colors: {
            '--color-bg-primary': '#2e3440',
            '--color-bg-secondary': '#3b4252',
            '--color-bg-tertiary': '#434c5e',
            '--color-text-primary': '#eceff4',
            '--color-text-secondary': '#d8dee9',
            '--color-text-tertiary': '#4c566a',
            '--color-border': '#4c566a',
            '--color-accent-primary': '#88c0d0',
            '--color-accent-secondary': '#81a1c1',
            '--color-accent-hover': '#8fbcbb',
        }
    },
    dracula: {
        name: 'Dracula',
        colors: {
            '--color-bg-primary': '#282a36',
            '--color-bg-secondary': '#44475a',
            '--color-bg-tertiary': '#6272a4',
            '--color-text-primary': '#f8f8f2',
            '--color-text-secondary': '#bd93f9',
            '--color-text-tertiary': '#6272a4',
            '--color-border': '#6272a4',
            '--color-accent-primary': '#ff79c6',
            '--color-accent-secondary': '#8be9fd',
            '--color-accent-hover': '#ff92df',
        }
    },
    solarized: {
        name: 'Solarized Dark',
        colors: {
            '--color-bg-primary': '#002b36',
            '--color-bg-secondary': '#073642',
            '--color-bg-tertiary': '#586e75',
            '--color-text-primary': '#fdf6e3',
            '--color-text-secondary': '#93a1a1',
            '--color-text-tertiary': '#657b83',
            '--color-border': '#586e75',
            '--color-accent-primary': '#268bd2',
            '--color-accent-secondary': '#2aa198',
            '--color-accent-hover': '#6c71c4',
        }
    }
};

export function ThemeSelector() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentTheme, setCurrentTheme] = useState('dark');

    useEffect(() => {
        const saved = localStorage.getItem('app-theme');
        if (saved && THEMES[saved]) {
            applyTheme(saved);
        }
    }, []);

    const applyTheme = (themeKey) => {
        const theme = THEMES[themeKey];
        if (!theme) return;

        const root = document.documentElement;
        Object.entries(theme.colors).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
        root.setAttribute('data-theme', themeKey);
        setCurrentTheme(themeKey);
        localStorage.setItem('app-theme', themeKey);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors"
                aria-label="Change theme"
            >
                <Palette size={20} className="text-[var(--color-text-secondary)]" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg shadow-xl z-50"
                    >
                        <div className="p-2">
                            <div className="px-3 py-2 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
                                Choose Theme
                            </div>
                            {Object.entries(THEMES).map(([key, theme]) => (
                                <button
                                    key={key}
                                    onClick={() => {
                                        applyTheme(key);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                                        currentTheme === key
                                            ? 'bg-[var(--color-accent-primary)] text-white'
                                            : 'hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)]'
                                    }`}
                                >
                                    <span>{theme.name}</span>
                                    {currentTheme === key && <Check size={16} />}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
