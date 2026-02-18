import { Outlet, Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Activity, Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../../features/auth/AuthContext';
import { useUI } from '../../context/UIContext';
import { HealthAssistant } from '../../features/chat/HealthAssistant';

const NavLink = ({ to, icon: Icon, label, active, onClick }: { to: string; icon: any; label: string; active: boolean; onClick?: () => void }) => (
    <Link
        to={to}
        onClick={onClick}
        className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300",
            active
                ? "bg-primary-900 text-white dark:bg-white dark:text-primary-900 shadow-xl"
                : "text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"
        )}
    >
        <Icon size={20} />
        <span className="text-base font-semibold">{label}</span>
    </Link>
);

export const RootLayout = () => {
    const location = useLocation();
    const { user } = useAuth();
    const { isSidebarOpen, toggleSidebar, setSidebarOpen } = useUI();

    const navItems = [
        { to: "/", icon: Activity, label: "Home" },
        { to: "/dashboard", icon: User, label: "Stats" },
        { to: "/tools/bmi", icon: Search, label: "BMI" },
        { to: "/shop", icon: ShoppingBag, label: "Shop" },
    ];


    return (
        <div className="min-h-screen flex flex-col relative bg-[#fbfbfd] dark:bg-black text-slate-900 dark:text-white transition-colors duration-500">
            {/* ── AMBIENT BACKGROUND ── */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-10%] left-[-5%] w-[100%] h-[100%] rounded-full bg-blue-500/5 dark:bg-blue-600/[0.02] blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[100%] h-[100%] rounded-full bg-indigo-500/5 dark:bg-indigo-600/[0.02] blur-[120px]"></div>
            </div>

            {/* ── MOBILE SIDEBAR (LEFT DRAWER) ── */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] lg:hidden"
                        />

                        {/* Sidebar Panel */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed top-0 left-0 bottom-0 w-[280px] bg-white/90 dark:bg-slate-900/95 backdrop-blur-2xl z-[101] lg:hidden flex flex-col p-6 shadow-2xl border-r border-white/20 dark:border-white/5"
                        >
                            <div className="flex items-center justify-between mb-10">
                                <Link to="/" onClick={() => setSidebarOpen(false)} className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-xl bg-primary-900 dark:bg-white flex items-center justify-center text-white dark:text-primary-900 shadow-lg">
                                        <Activity size={24} />
                                    </div>
                                    <span className="text-xl font-bold font-display tracking-tight uppercase">Neurowell</span>
                                </Link>
                                <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400">
                                    <X size={24} />
                                </button>
                            </div>

                            <nav className="flex flex-col gap-2">
                                {navItems.map((item) => (
                                    <NavLink
                                        key={item.to}
                                        to={item.to}
                                        icon={item.icon}
                                        label={item.label}
                                        active={item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to)}
                                        onClick={() => setSidebarOpen(false)}
                                    />
                                ))}

                            </nav>

                            <div className="mt-auto pt-6 border-t border-slate-200 dark:border-white/10">
                                {user ? (
                                    <Link to="/profile" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                                        <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold shadow-md">
                                            {user.name[0].toUpperCase()}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-sm">{user.name.split('@')[0]}</span>
                                            <span className="text-xs text-slate-400">View Profile</span>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link to="/auth" onClick={() => setSidebarOpen(false)} className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-primary-900 text-white dark:bg-white dark:text-primary-900 font-bold shadow-lg">
                                        Sign In
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* ── HEADER (FUNCTIONAL) ── */}
            <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 dark:border-white/5 backdrop-blur-xl bg-white/70 dark:bg-black/70">
                <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={toggleSidebar}
                            className="lg:hidden p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                        >
                            <Menu size={24} />
                        </button>

                        <Link to="/" className="flex items-center gap-2 md:gap-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-primary-900 dark:bg-white flex items-center justify-center text-white dark:text-primary-900 shadow-xl">
                                <Activity size={18} className="md:size-[22px]" />
                            </div>
                            <span className="text-lg md:text-xl font-bold font-display tracking-tight uppercase">Neurowell</span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                icon={item.icon}
                                label={item.label}
                                active={item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to)}
                            />
                        ))}

                    </nav>

                    <div className="flex items-center gap-2 md:gap-4">
                        <ThemeToggle />
                        <div className="hidden md:block">
                            {user ? (
                                <Link to="/profile" className="flex items-center gap-2 p-1 md:px-4 md:py-2 rounded-full md:bg-slate-100 dark:md:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs md:text-sm font-bold">
                                        {user.name[0].toUpperCase()}
                                    </div>
                                    <span className="hidden md:inline font-medium text-sm">{user.name.split('@')[0]}</span>
                                </Link>
                            ) : (
                                <Link to="/auth" className="px-4 py-1.5 md:px-6 md:py-2 rounded-full bg-primary-900 text-white dark:bg-white dark:text-primary-900 text-xs md:text-sm font-bold shadow-sm">
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* ── MAIN CONTENT ── */}
            <main className="flex-1 relative z-10 w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, scale: 0.99 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.99 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full"
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* ── HEALTH ASSISTANT CHATBOT ── */}
            <HealthAssistant />
        </div>
    );
};
