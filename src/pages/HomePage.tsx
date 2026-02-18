import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Brain } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: delay * 0.1 }}
        viewport={{ once: true }}
        className="glass-panel p-6 md:p-8 flex flex-col items-start gap-4"

    >
        <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Icon size={24} />
        </div>
        <div className="space-y-2">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {description}
            </p>
        </div>
    </motion.div>
);

export const Home = () => {
    return (
        <div className="flex flex-col items-center">
            {/* ── HERO SECTION ── */}
            <section className="section-container text-center pt-12 md:pt-20 pb-20 md:pb-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6 md:space-y-8"
                >
                    <div className="label-micro">Synergy Health OS</div>

                    <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15] md:leading-[1.1]">
                        Health intelligence <br /> <span className="text-blue-600">reimagined.</span>
                    </h1>

                    <p className="text-base md:text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed px-4 md:px-0">
                        The ultimate dashboard for your biological data.
                        Professional diagnostics, real-time tracking, and AI-driven growth.
                    </p>

                    <div className="flex items-center justify-center gap-3 md:gap-4 pt-2 md:pt-4">
                        <Link to="/auth" className="btn-premium">
                            Get Started
                        </Link>
                        <Link to="/tools/bmi" className="btn-secondary">
                            Try BMI Tool
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* ── FEATURES GRID ── */}
            <section className="w-full max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 pb-20 md:pb-32">

                <FeatureCard
                    icon={Brain}
                    title="Predictive AI"
                    description="Advanced models that interpret your biometrics to suggest actionable wellness optimizations."
                    delay={1}
                />
                <FeatureCard
                    icon={ShieldCheck}
                    title="Secure Records"
                    description="Enterprise-grade encryption for all your biological data, accessible only by you."
                    delay={2}
                />
                <FeatureCard
                    icon={Zap}
                    title="Real-time Tracking"
                    description="Connect your devices for a seamless stream of live health data directly to your portal."
                    delay={3}
                />
            </section>
        </div>
    );
};
