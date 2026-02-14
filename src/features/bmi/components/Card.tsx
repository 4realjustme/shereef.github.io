import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    subtitle?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, subtitle }) => {
    return (
        <div className={`glass-card p-6 md:p-8 dark:border-opacity-10 dark:text-slate-100 ${className}`}>
            {(title || subtitle) && (
                <div className="mb-6">
                    {title && <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white font-display">{title}</h3>}
                    {subtitle && <p className="text-sm text-slate-400 dark:text-slate-400 mt-1">{subtitle}</p>}
                </div>
            )}
            {children}
        </div>
    );
};
