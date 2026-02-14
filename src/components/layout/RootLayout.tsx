import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Activity, HeartPulse, Search, Menu, X, User } from 'lucide-react';
import { cn } from '../../lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../../features/auth/AuthContext';

const NavLink = ({ to, icon: Icon, label, active }: { to: string; icon: any; label: string; active: boolean }) => (
    <Link
        to={to}
        className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300",
            active
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg shadow-black/5"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10"
        )}
    >
        <Icon size={18} />
        <span className="font-medium text-sm">{label}</span>
    </Link>
);

export const RootLayout = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user } = useAuth();

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#fbfbfd] dark:bg-black text-slate-900 dark:text-white transition-colors duration-500">
            {/* ── AMBIENT BACKGROUND ── */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full bg-blue-200/40 dark:bg-blue-900/20 animate-pulse-slow blur-[120px] mix-blend-multiply dark:mix-blend-screen"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] rounded-full bg-indigo-200/40 dark:bg-indigo-900/20 animate-pulse-slow delay-1000 blur-[120px] mix-blend-multiply dark:mix-blend-screen"></div>
            </div>

            {/* ── HEADER ── */}
            <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl border-b border-white/20 dark:border-white/5 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/60">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 shadow-xl shadow-blue-500/20 transition-transform group-hover:scale-105">
                            <Activity size={24} />
                        </div>
                        <span className="text-xl font-bold tracking-tight">Health Mate.</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-2">
                        <NavLink to="/" icon={Activity} label="Overview" active={location.pathname === '/'} />
                        <NavLink to="/dashboard" icon={User} label="Patient Portal" active={location.pathname === '/dashboard'} />
                        <NavLink to="/diagnostics" icon={HeartPulse} label="Diagnostics" active={location.pathname === '/diagnostics'} />
                        <NavLink to="/tools/bmi" icon={Search} label="Tools" active={location.pathname.startsWith('/tools')} />
                    </nav>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <ThemeToggle />
                        {user ? (
                            <Link to="/profile" className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
                                    {user.name[0].toUpperCase()}
                                </div>
                                <span className="font-medium text-sm">{user.name.split('@')[0]}</span>
                            </Link>
                        ) : (
                            <Link to="/auth" className="px-6 py-2.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-medium text-sm hover:opacity-90 transition-opacity">
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2 text-slate-600 dark:text-slate-300"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* ── MOBILE MENU ── */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-white dark:bg-black pt-24 px-6 md:hidden"
                    >
                        <nav className="flex flex-col gap-4">
                            <NavLink to="/" icon={Activity} label="Overview" active={location.pathname === '/'} />
                            <NavLink to="/dashboard" icon={User} label="Patient Portal" active={location.pathname === '/dashboard'} />
                            <NavLink to="/diagnostics" icon={HeartPulse} label="Diagnostics" active={location.pathname === '/diagnostics'} />
                            <NavLink to="/tools/bmi" icon={Search} label="Tools" active={location.pathname.startsWith('/tools')} />
                            <div className="h-px bg-slate-200 dark:bg-slate-800 my-4" />
                            {user ? (
                                <>
                                    <Link to="/profile" className="flex items-center gap-3 p-2 text-slate-900 dark:text-white">
                                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
                                            {user.name[0].toUpperCase()}
                                        </div>
                                        <span className="font-medium">My Profile</span>
                                    </Link>
                                </>
                            ) : (
                                <Link to="/auth" className="w-full py-4 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-medium text-center">
                                    Sign In
                                </Link>
                            )}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── MAIN CONTENT ── */}
            <main className="flex-1 pt-20 relative z-10">
                <Outlet />
            </main>
        </div>
    );
};
