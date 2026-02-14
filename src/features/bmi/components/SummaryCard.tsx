import { useEffect, useState, FC } from 'react';
import { getRandomQuote } from '../utils/quotes';
import { RotateCcw } from 'lucide-react';
import { BmiResult } from '../utils/calculator';

interface SummaryCardProps {
    onReset: () => void;
    result: BmiResult | null;
}

export const SummaryCard: FC<SummaryCardProps> = ({ onReset }) => {
    const [quote, setQuote] = useState('');

    useEffect(() => {
        setQuote(getRandomQuote());
    }, []);

    return (
        <div className="w-full max-w-2xl mx-auto text-center">
            <blockquote className="text-3xl md:text-4xl font-light text-slate-800 dark:text-white italic mb-12 leading-tight">
                "{quote}"
            </blockquote>

            <p className="text-sm text-slate-400 dark:text-slate-500 mb-12 max-w-md mx-auto leading-relaxed">
                Your journey to better health begins with small, consistent steps. Use this analysis as a guideline, not a diagnosis.
            </p>

            <button
                onClick={onReset}
                className="btn-premium inline-flex items-center gap-3 group"
            >
                <RotateCcw size={18} className="group-hover:-rotate-180 transition-transform duration-700 ease-spring" />
                <span>Start New Analysis</span>
            </button>
        </div>
    );
};
