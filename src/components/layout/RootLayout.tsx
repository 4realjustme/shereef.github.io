import { Outlet, Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Activity, Search, User, ShoppingBag, Bot } from 'lucide-react';
import { cn } from '../../lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../../features/auth/AuthContext';
import { useUI } from '../../context/UIContext';
import { HealthAssistant } from '../../features/chat/HealthAssistant';

const NavLink = ({ to, icon: Icon, label, active }: { to: string; icon: any; label: string; active: boolean }) => (
    <Link
        to={to}
        className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300",
            active
                ? "bg-primary-900 text-white dark:bg-white dark:text-primary-900 shadow-lg"
                : "text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"
        )}
    >
        <Icon size={18} />
        <span className="text-sm font-medium">{label}</span>
    </Link>
);

export const RootLayout = () => {
    const location = useLocation();
    const { user } = useAuth();
    const { toggleChat, isChatOpen } = useUI();

    const navItems = [
        { to: "/", icon: Activity, label: "Home" },
        { to: "/dashboard", icon: User, label: "Stats" },
        { to: "/chat", icon: Bot, label: "Assistant", isChat: true },
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

            {/* ── HEADER (FUNCTIONAL) ── */}
            <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 dark:border-white/5 backdrop-blur-xl bg-white/70 dark:bg-black/70">
                <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 md:gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-black shadow-xl">
                            <Activity size={18} className="md:size-[22px]" />
                        </div>
                        <span className="text-lg md:text-xl font-bold font-display tracking-tight uppercase">Neurowell</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => (
                            item.isChat ? (
                                <button
                                    key="chat-trigger"
                                    onClick={toggleChat}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300",
                                        isChatOpen
                                            ? "bg-primary-900 text-white dark:bg-white dark:text-primary-900 shadow-lg"
                                            : "text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"
                                    )}
                                >
                                    <item.icon size={18} />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </button>
                            ) : (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    icon={item.icon}
                                    label={item.label}
                                    active={item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to)}
                                />
                            )
                        ))}
                    </nav>

                    <div className="flex items-center gap-2 md:gap-4">
                        <ThemeToggle />
                        {user ? (
                            <Link to="/profile" className="flex items-center gap-2 p-1 md:px-4 md:py-2 rounded-full md:bg-slate-100 dark:md:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs md:text-sm font-bold">
                                    {user.name[0].toUpperCase()}
                                </div>
                                <span className="hidden md:inline font-medium text-sm">{user.name.split('@')[0]}</span>
                            </Link>
                        ) : (
                            <Link to="/auth" className="px-4 py-1.5 md:px-6 md:py-2 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs md:text-sm font-bold">
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </header>

            {/* ── MAIN CONTENT ── */}
            <main className="flex-1 relative z-10 w-full pb-24 md:pb-20">
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

            {/* ── MOBILE BOTTOM NAVIGATION ── */}
            <nav className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-sm">
                <div className="glass-panel flex items-center justify-around p-2 shadow-2xl border-white/20 dark:border-white/5">
                    {navItems.map((item) => {
                        const active = item.isChat ? isChatOpen : (item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to));

                        if (item.isChat) {
                            return (
                                <button
                                    key="mobile-chat"
                                    onClick={toggleChat}
                                    className={cn(
                                        "flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-300",
                                        active ? "text-primary-600 dark:text-primary-400 bg-primary-500/5" : "text-slate-400 hover:text-slate-600"
                                    )}
                                >
                                    <item.icon size={20} className={cn(active && "animate-pulse")} />
                                    <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
                                </button>
                            );
                        }

                        return (
                            <Link
                                key={item.to}
                                to={item.to}
                                className={cn(
                                    "flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-300",
                                    active ? "text-primary-600 dark:text-primary-400 bg-primary-500/5" : "text-slate-400 hover:text-slate-600"
                                )}
                            >
                                <item.icon size={20} className={cn(active && "animate-pulse")} />
                                <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* ── HEALTH ASSISTANT CHATBOT ── */}
            <HealthAssistant />
        </div>
    );
};
