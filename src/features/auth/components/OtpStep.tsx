import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2 } from 'lucide-react';

interface OtpStepProps {
    otp: string;
    setOtp: (otp: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
    error: string;
    timer: number;
    onResend: () => void;
}

export const OtpStep: React.FC<OtpStepProps> = ({ otp, setOtp, onSubmit, isLoading, error, timer, onResend }) => {
    return (
        <motion.form
            key="otp-form"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            onSubmit={onSubmit}
            className="space-y-6"
        >
            <div className="flex justify-center gap-4 mb-8">
                {[0, 1, 2, 3].map((index) => (
                    <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={otp[index] || ''}
                        onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            if (val) {
                                const newOtp = otp.split('');
                                newOtp[index] = val;
                                const combined = newOtp.join('');
                                setOtp(combined);
                                if (index < 3) {
                                    document.getElementById(`otp-${index + 1}`)?.focus();
                                }
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Backspace' && !otp[index] && index > 0) {
                                document.getElementById(`otp-${index - 1}`)?.focus();
                            }
                        }}
                        className="w-14 h-16 text-center text-2xl font-bold bg-slate-50 dark:bg-white/5 border-2 border-slate-200 dark:border-white/10 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                    />
                ))}
            </div>

            {error && (
                <p className="text-sm text-red-500 mb-4">{error}</p>
            )}

            <button
                type="submit"
                disabled={isLoading || otp.length !== 4}
                className="w-full py-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl font-medium text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
                {isLoading ? <Loader2 className="animate-spin" /> : (
                    <>
                        Verify & Login <CheckCircle size={18} />
                    </>
                )}
            </button>

            <div className="flex flex-col items-center gap-2">
                {timer > 0 ? (
                    <p className="text-sm text-slate-400">
                        Resend code in <span className="font-mono text-slate-900 dark:text-white font-medium">00:{timer.toString().padStart(2, '0')}</span>
                    </p>
                ) : (
                    <button
                        type="button"
                        onClick={onResend}
                        className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline"
                    >
                        Resend Verification Code
                    </button>
                )}
            </div>
        </motion.form>
    );
};
