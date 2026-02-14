import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { EmailStep } from '../features/auth/components/EmailStep';
import { OtpStep } from '../features/auth/components/OtpStep';

export const Auth = () => {
    const { login, verifyOtp, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [step, setStep] = useState<'email' | 'otp'>('email');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [timer, setTimer] = useState(30);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        let interval: any;
        if (step === 'otp' && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [step, timer]);

    const handleResendOtp = async () => {
        setIsLoading(true);
        await login(email);
        setIsLoading(false);
        setTimer(30);
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email.includes('@')) {
            setError('Please enter a valid email address');
            return;
        }

        setIsLoading(true);
        await login(email);
        setIsLoading(false);
        setStep('otp');
        setTimer(30);
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (otp.length !== 4) {
            setError('Please enter a 4-digit code');
            return;
        }

        setIsLoading(true);
        const success = await verifyOtp(otp);
        setIsLoading(false);

        if (success) {
            navigate('/dashboard');
        } else {
            setError('Invalid code. Try 1234');
        }
    };

    return (
        <div className="w-full min-h-[80vh] flex items-center justify-center px-6 relative z-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md p-8 glass-panel text-center relative overflow-hidden"
            >
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                        {step === 'email' ? 'Welcome Back' : 'Check your Inbox'}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400">
                        {step === 'email'
                            ? 'Enter your email to access your health portal.'
                            : `We've sent a code to ${email}`}
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {step === 'email' ? (
                        <EmailStep
                            email={email}
                            setEmail={setEmail}
                            onSubmit={handleEmailSubmit}
                            isLoading={isLoading}
                            error={error}
                        />
                    ) : (
                        <div className="space-y-6">
                            <OtpStep
                                otp={otp}
                                setOtp={setOtp}
                                onSubmit={handleOtpSubmit}
                                isLoading={isLoading}
                                error={error}
                                timer={timer}
                                onResend={handleResendOtp}
                            />

                            <button
                                onClick={() => setStep('email')}
                                className="text-sm text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                            >
                                ← Change email
                            </button>
                        </div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};
