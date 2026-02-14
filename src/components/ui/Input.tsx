import React, { InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    icon?: React.ElementType;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, icon: Icon, ...props }, ref) => {
        return (
            <div className="w-full relative group">
                <div className="relative">
                    {Icon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-500 transition-colors">
                            <Icon size={20} />
                        </div>
                    )}
                    <input
                        className={cn(
                            "w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-4 outline-none transition-all duration-300 placeholder:text-transparent peer",
                            "focus:bg-white dark:focus:bg-black focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10",
                            Icon ? "pl-12" : "",
                            error ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "",
                            className
                        )}
                        placeholder={label}
                        ref={ref}
                        {...props}
                    />
                    <label
                        className={cn(
                            "absolute left-4 top-4 text-slate-400 dark:text-slate-500 text-base transition-all duration-200 pointer-events-none",
                            Icon ? "peer-placeholder-shown:left-12" : "",
                            "peer-focus:-translate-y-7 peer-focus:text-xs peer-focus:bg-white dark:peer-focus:bg-black peer-focus:px-2 peer-focus:text-blue-500",
                            "peer-not-placeholder-shown:-translate-y-7 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-white dark:peer-not-placeholder-shown:bg-black peer-not-placeholder-shown:px-2",
                            error ? "peer-focus:text-red-500" : ""
                        )}
                    >
                        {label}
                    </label>
                </div>
                {error && (
                    <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-500 mt-1 ml-1 block"
                    >
                        {error}
                    </motion.span>
                )}
            </div>
        );
    }
);
