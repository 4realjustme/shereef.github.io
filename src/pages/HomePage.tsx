
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Brain, ArrowRight } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay * 0.1 }}
        viewport={{ once: true }}
        className="glass-panel p-8 flex flex-col items-start gap-4 hover:bg-white/80 dark:hover:bg-white/5 group"
    >
        <div className="p-3 rounded-2xl bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white group-hover:scale-110 transition-transform duration-300">
            <Icon size={24} />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
            {description}
        </p>
    </motion.div>
);

export const Home = () => {
    return (
        <div className="flex flex-col items-center">
            {/* ── HERO SECTION ── */}
            <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center px-6 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl mx-auto space-y-8"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/10 border border-white/60 dark:border-white/10 backdrop-blur-md shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">AI-Powered Health Monitoring</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-slate-900 dark:text-white leading-[1.1]">
                        Health, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">reimagined.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
                        Your personal health companion powered by advanced AI.
                        Predictive diagnostics, personalized wellness, and secure records in one beautiful interface.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link to="/auth" className="btn-premium flex items-center gap-2 group">
                            Get Started
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/tools/bmi" className="btn-secondary">
                            Try BMI Tool
                        </Link>
                    </div>
                </motion.div>

                {/* Hero Graphical Elements (Abstract) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-[100px] -z-10" />
            </section>

            {/* ── FEATURES GRID ── */}
            <section className="w-full max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-3 gap-6">
                <FeatureCard
                    icon={Brain}
                    title="AI Diagnostics"
                    description="Advanced machine learning models analyze your symptoms and vitals to provide early warning signs."
                    delay={1}
                />
                <FeatureCard
                    icon={ShieldCheck}
                    title="Secure Records"
                    description="Your health data is encrypted and stored securely. Access your history anytime, anywhere."
                    delay={2}
                />
                <FeatureCard
                    icon={Zap}
                    title="Smart Wellness"
                    description="Personalized daily routines, diet plans, and workout schedules adapted to your real-time needs."
                    delay={3}
                />
            </section>

            {/* ── CTA SECTION ── */}
            <section className="w-full px-6 py-32 flex justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="w-full max-w-5xl glass-panel p-12 md:p-24 text-center space-y-8 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5" />
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white relative z-10">
                        Ready to take control?
                    </h2>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto relative z-10">
                        Join thousands of users who have transformed their health journey with Health Mate.
                    </p>
                    <div className="relative z-10">
                        <Link to="/auth" className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-full font-medium text-lg hover:opacity-90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                            Create Free Account
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};
