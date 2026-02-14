import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Loader2 } from 'lucide-react';
import { Input } from '../../../components/ui/Input';

interface EmailStepProps {
    email: string;
    setEmail: (email: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
    error: string;
}

export const EmailStep: React.FC<EmailStepProps> = ({ email, setEmail, onSubmit, isLoading, error }) => {
    return (
        <motion.form
            key="email-form"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            onSubmit={onSubmit}
            className="space-y-6"
        >
            <Input
                label="Email Address"
                type="email"
                icon={Mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error}
            />

            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl font-medium text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
                {isLoading ? <Loader2 className="animate-spin" /> : (
                    <>
                        Continue <ArrowRight size={18} />
                    </>
                )}
            </button>
        </motion.form>
    );
};
