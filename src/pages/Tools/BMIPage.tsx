import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateBMI, UserInput, BmiResult } from '../../features/bmi/utils/calculator';
import { InputForm } from '../../features/bmi/components/InputForm';
import { ResultCard } from '../../features/bmi/components/ResultCard';
import { DietSuggestion } from '../../features/bmi/components/DietSuggestion';
import { SummaryCard } from '../../features/bmi/components/SummaryCard';

export const BMI = () => {
    const [input, setInput] = useState<UserInput>({
        weight: 0, height: 0, age: 0, gender: 'male',
    });
    const [result, setResult] = useState<BmiResult | null>(null);
    const [showResults, setShowResults] = useState(false);
    const resultRef = useRef<HTMLDivElement>(null);

    const handleCalculate = () => {
        if (!input.weight || !input.height || !input.age) return;
        const res = calculateBMI(input);
        setResult(res);
        setShowResults(true);
        setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 500);
    };

    const handleReset = () => {
        setShowResults(false);
        setResult(null);
        setInput({ weight: 0, height: 0, age: 0, gender: 'male' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleChange = (field: keyof UserInput, value: any) => {
        setInput((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="section-container">
            <div className="text-center space-y-3 md:space-y-4 mb-10 md:mb-16">
                <span className="label-micro">Tools & Metrics</span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">BMI Calculator.</h1>
                <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 font-medium max-w-sm mx-auto">Professional biometric analysis.</p>
            </div>


            <div className="max-w-xl mx-auto space-y-8 md:space-y-12">
                <InputForm input={input} onChange={handleChange} onCalculate={handleCalculate} />
            </div>

            <AnimatePresence>
                {showResults && result && (
                    <motion.div ref={resultRef} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full space-y-12 md:space-y-16 mt-12 md:mt-20">

                        <ResultCard result={result} gender={input.gender} />
                        <div className="grid grid-cols-1 gap-8">
                            <DietSuggestion />
                        </div>
                        <SummaryCard result={result} onReset={handleReset} />
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};
