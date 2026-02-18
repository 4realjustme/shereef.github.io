import { Outlet, Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Activity, HeartPulse, Search, User, ShoppingBag } from 'lucide-react';
import { cn } from '../../lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../../features/auth/AuthContext';
import { HealthAssistant } from '../../features/chat/HealthAssistant';

const NavLink = ({ to, icon: Icon, label, active }: { to: string; icon: any; label: string; active: boolean }) => (
    <Link
        to={to}
        className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300",
            active
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg"
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

    return (
        <div className="min-h-screen flex flex-col relative bg-[#fbfbfd] dark:bg-black text-slate-900 dark:text-white transition-colors duration-500">
            {/* ── AMBIENT BACKGROUND ── */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-10%] left-[-5%] w-[100%] h-[100%] rounded-full bg-blue-500/5 dark:bg-blue-600/[0.02] blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[100%] h-[100%] rounded-full bg-indigo-500/5 dark:bg-indigo-600/[0.02] blur-[120px]"></div>
            </div>

            {/* ── HEADER (FUNCTIONAL) ── */}
            <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 dark:border-white/5 backdrop-blur-xl bg-white/70 dark:bg-black/70">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-black shadow-xl">
                            <Activity size={22} />
                        </div>
                        <span className="text-xl font-bold tracking-tight">SYNERGY</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-1">
                        <NavLink to="/" icon={Activity} label="Home" active={location.pathname === '/'} />
                        <NavLink to="/dashboard" icon={User} label="Dashboard" active={location.pathname === '/dashboard'} />
                        <NavLink to="/diagnostics" icon={HeartPulse} label="Health" active={location.pathname === '/diagnostics'} />
                        <NavLink to="/tools/bmi" icon={Search} label="BMI Tool" active={location.pathname.startsWith('/tools/bmi')} />
                        <NavLink to="/shop" icon={ShoppingBag} label="Shop" active={location.pathname === '/shop'} />
                    </nav>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        {user ? (
                            <Link to="/profile" className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
                                    {user.name[0].toUpperCase()}
                                </div>
                                <span className="font-medium text-sm">{user.name.split('@')[0]}</span>
                            </Link>
                        ) : (
                            <Link to="/auth" className="px-6 py-2 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-sm font-bold">
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </header>

            {/* ── MAIN CONTENT ── */}
            <main className="flex-1 relative z-10 w-full pb-20">
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
