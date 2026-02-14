import { useState, useRef, useEffect } from 'react';
import { calculateBMI, UserInput, BmiResult } from '../../features/bmi/utils/calculator';
import { InputForm } from '../../features/bmi/components/InputForm';
import { ResultCard } from '../../features/bmi/components/ResultCard';
import { DietSuggestion } from '../../features/bmi/components/DietSuggestion';
import { ShoppingList } from '../../features/bmi/components/ShoppingList';
import { SummaryCard } from '../../features/bmi/components/SummaryCard';

export const BMI = () => {
    const [input, setInput] = useState<UserInput>({
        weight: 0,
        height: 0,
        age: 0,
        gender: 'male',
    });
    const [result, setResult] = useState<BmiResult | null>(null);
    const [showResults, setShowResults] = useState(false);

    // Section refs
    const inputRef = useRef<HTMLDivElement>(null);
    const resultRef = useRef<HTMLDivElement>(null);
    const dietRef = useRef<HTMLDivElement>(null);
    const shopRef = useRef<HTMLDivElement>(null);
    const summaryRef = useRef<HTMLDivElement>(null);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!showResults) return; // Only enable nav if results are shown

            // Collect active sections
            const sections = [inputRef, resultRef, dietRef, shopRef, summaryRef]
                .map(ref => ref.current)
                .filter(el => el !== null) as HTMLDivElement[];

            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();

                // Find currently visible section
                const scrollY = window.scrollY + window.innerHeight / 3;
                let currentIndex = sections.findIndex(section => {
                    const rect = section.getBoundingClientRect();
                    return rect.top + window.scrollY <= scrollY && rect.bottom + window.scrollY > scrollY;
                });

                if (currentIndex === -1) currentIndex = 0;

                let nextIndex = currentIndex;
                if (e.key === 'ArrowDown') {
                    nextIndex = Math.min(currentIndex + 1, sections.length - 1);
                } else if (e.key === 'ArrowUp') {
                    nextIndex = Math.max(currentIndex - 1, 0);
                }

                if (nextIndex !== currentIndex) {
                    sections[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showResults]);

    const handleCalculate = () => {
        if (!input.weight || !input.height || !input.age) return;
        const res = calculateBMI(input);
        setResult(res);
        setShowResults(true);
        setTimeout(() => {
            resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300); // Slower delay for elegance
    };

    const handleReset = () => {
        setShowResults(false);
        setResult(null);
        setInput({ ...input, weight: 0, height: 0, age: 0 });
        setTimeout(() => {
            inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const handleChange = (field: keyof UserInput, value: any) => {
        setInput((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="flex flex-col relative w-full">
            {/* ===== HEADER ===== */}
            <div className="w-full py-12 text-center relative z-40 animate-reveal">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Body Metrics.
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2">
                    Understanding your body composition is the first step.
                </p>
            </div>

            {/* ===== SECTION 1 — INPUT ===== */}
            <section ref={inputRef} className="section-container flex flex-col items-center justify-center min-h-[50vh] relative z-10">
                <InputForm
                    input={input}
                    onChange={handleChange}
                    onCalculate={handleCalculate}
                />
            </section>

            {/* ===== SECTIONS 2-5 — VISIBLE AFTER CALCULATION ===== */}
            {showResults && result && (
                <>
                    {/* ===== SECTION 2 — ANALYSIS ===== */}
                    <section ref={resultRef} className="section-container animate-reveal delay-100">
                        <div className="mb-16">
                            <h2 className="text-5xl md:text-6xl font-semibold tracking-tighter text-slate-900 dark:text-white mb-4">
                                Analysis.
                            </h2>
                            <p className="text-xl text-slate-500 dark:text-slate-400 font-light max-w-2xl">
                                Based on your inputs, here is a detailed breakdown of your body metrics and health status.
                            </p>
                        </div>
                        <ResultCard result={result} gender={input.gender} />
                    </section>

                    {/* Divider line */}
                    <div className="w-full max-w-4xl mx-auto border-t border-slate-200 dark:border-white/10" />

                    {/* ===== SECTION 3 — DIET ===== */}
                    <section ref={dietRef} className="section-container animate-reveal delay-200">
                        <div className="mb-16">
                            <h2 className="text-5xl md:text-6xl font-semibold tracking-tighter text-slate-900 dark:text-white mb-4">
                                Nutrition.
                            </h2>
                            <p className="text-xl text-slate-500 dark:text-slate-400 font-light max-w-2xl">
                                Curated meal plans designed to align with your specific health goals.
                            </p>
                        </div>
                        <DietSuggestion />
                    </section>

                    <div className="w-full max-w-4xl mx-auto border-t border-slate-200 dark:border-white/10" />

                    {/* ===== SECTION 4 — SHOPPING ===== */}
                    <section ref={shopRef} className="section-container animate-reveal delay-300">
                        <div className="mb-16">
                            <h2 className="text-5xl md:text-6xl font-semibold tracking-tighter text-slate-900 dark:text-white mb-4">
                                Essentials.
                            </h2>
                            <p className="text-xl text-slate-500 dark:text-slate-400 font-light max-w-2xl">
                                High-quality supplements and gear recommended for your journey.
                            </p>
                        </div>
                        <ShoppingList />
                    </section>

                    {/* ===== SECTION 5 — SUMMARY ===== */}
                    <section ref={summaryRef} className="section-container pb-32 animate-reveal delay-300">
                        <SummaryCard result={result} onReset={handleReset} />
                    </section>
                </>
            )}
        </div>
    );
};
