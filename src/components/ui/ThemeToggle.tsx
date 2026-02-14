import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '../../lib/utils';

export const ThemeToggle = ({ className }: { className?: string }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                "p-3 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-all duration-300 backdrop-blur-md",
                className
            )}
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <Moon size={18} className="text-slate-800 opacity-70" />
            ) : (
                <Sun size={18} className="text-white opacity-80" />
            )}
        </button>
    );
};
