import { useState, useEffect } from 'react';
import { Activity, Shield, Zap, TrendingUp, Lock } from 'lucide-react';
import { useAuth } from '../features/auth/AuthContext';
import { Link } from 'react-router-dom';

const StatCard = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) => (
    <div className="glass-panel p-6 flex flex-col gap-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
            <Icon size={20} />
        </div>
        <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{value}</h3>
        </div>
    </div>
);

export const Dashboard = () => {
    const { isAuthenticated, user } = useAuth();
    const [healthProfile, setHealthProfile] = useState<any>(null);

    useEffect(() => {
        const profile = localStorage.getItem('health_profile');
        if (profile) {
            setHealthProfile(JSON.parse(profile));
        }
    }, []);

    if (!isAuthenticated) {
        // ... (previous non-auth view remains same)
        return (
            <div className="section-container flex flex-col items-center justify-center min-h-[60vh] text-center">
                <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 mb-8">
                    <Lock size={32} />
                </div>
                <h1 className="text-4xl font-bold mb-4">Dashboard Locked</h1>
                <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">
                    Sign in to access your personal health metrics, tracking data, and AI-driven insights.
                </p>
                <Link to="/auth" className="btn-premium">
                    Sign In to Unlock
                </Link>
            </div>
        );
    }

    return (
        <div className="section-container">
            <div className="space-y-8 mb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <span className="label-micro">Synergy Health OS</span>
                        <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Welcome back, {user?.name.split('@')[0]}
                        </h1>
                        {healthProfile && (
                            <p className="text-slate-500 mt-2 font-medium">
                                Monitoring your plan for <span className="text-blue-600 font-bold">{healthProfile.goals}</span> and <span className="text-indigo-600 font-bold">{healthProfile.focus}</span>.
                            </p>
                        )}
                    </div>
                    {healthProfile && (
                        <div className="flex gap-2">
                            <span className="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 text-xs font-bold uppercase tracking-wider">{healthProfile.activity}</span>
                            <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 text-xs font-bold uppercase tracking-wider">{healthProfile.focus}</span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <StatCard icon={Activity} label="Heart Rate" value="72 BPM" color="bg-rose-500/10 text-rose-500" />
                    <StatCard icon={TrendingUp} label="Daily Steps" value="8,432" color="bg-green-500/10 text-green-500" />
                    <StatCard icon={Zap} label="Active Energy" value="450 kcal" color="bg-amber-500/10 text-amber-500" />
                    <StatCard icon={Shield} label="Sleep Score" value="85%" color="bg-indigo-500/10 text-indigo-500" />
                </div>
            </div>

            <div className="glass-panel p-12 text-center border-2 border-dashed border-slate-200 dark:border-white/10">
                <div className="max-w-md mx-auto space-y-4">
                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                        Detailed health analytics and biometric history will appear here as you integrate your devices.
                    </p>
                    <button className="text-blue-600 font-bold text-sm uppercase tracking-widest hover:underline">
                        Connect Apple Health / Google Fit →
                    </button>
                </div>
            </div>
        </div>
    );
};


