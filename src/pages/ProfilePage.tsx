import { useEffect } from 'react';
import { useAuth } from '../features/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
// Corrected imports
import { Calendar, Activity, Weight, Ruler, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ icon: Icon, label, value, unit }: { icon: any, label: string, value: string | number, unit?: string }) => (
    <div className="glass-panel p-6 flex items-center gap-4 hover:scale-105 transition-transform duration-300">
        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-900 dark:text-white">
            <Icon size={20} />
        </div>
        <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
            <p className="text-2xl font-semibold text-slate-900 dark:text-white">
                {value} <span className="text-sm font-normal text-slate-400">{unit}</span>
            </p>
        </div>
    </div>
);

export const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Protect Route
    useEffect(() => {
        if (!user) {
            navigate('/auth');
        }
    }, [user, navigate]);

    if (!user) return null;

    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-12">

            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 glass-panel p-8"
            >
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                        {user.name ? user.name[0].toUpperCase() : 'U'}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white capitalize">{user.name.split('@')[0]}</h1>
                        <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 mt-2 text-sm">
                            <div className="flex items-center gap-1">
                                <Mail size={14} />
                                <span>{user.email}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar size={14} />
                                <span>Joined {user.joinDate}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => { logout(); navigate('/'); }}
                    className="px-6 py-3 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 rounded-xl font-medium hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                >
                    Sign Out
                </button>
            </motion.div>

            {/* Health Overview */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <Activity size={20} className="text-blue-500" />
                    Health Overview
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <StatCard
                        icon={Activity}
                        label="Latest BMI"
                        value={user.stats?.bmi || '--'}
                    />
                    <StatCard
                        icon={Weight}
                        label="Weight"
                        value={user.stats?.weight || '--'}
                        unit="kg"
                    />
                    <StatCard
                        icon={Ruler}
                        label="Height"
                        value={user.stats?.height || '--'}
                        unit="cm"
                    />
                    <StatCard
                        icon={Calendar}
                        label="Last Check-in"
                        value={user.stats?.lastCheck || 'Never'}
                    />
                </div>
            </motion.div>

            {/* Detailed Analysis Placeholder */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-panel p-12 text-center min-h-[300px] flex flex-col items-center justify-center border-dashed border-2 border-slate-200 dark:border-white/10"
            >
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-4 text-slate-400">
                    <Activity size={32} />
                </div>
                <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2">Detailed Analysis</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                    Complete your first full health assessment to unlock AI-driven insights, risk predictions, and personalized recommendations.
                </p>
                <button
                    onClick={() => navigate('/tools/bmi')}
                    className="mt-6 btn-premium text-sm"
                >
                    Start Assessment
                </button>
            </motion.div>
        </div>
    );
};
