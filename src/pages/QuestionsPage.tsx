import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, HeartPulse, Activity, Target } from 'lucide-react';

const questions = [
    {
        id: 'goals',
        question: 'What are your primary health goals?',
        options: ['Weight Loss', 'Muscle Gain', 'Better Sleep', 'Stress Reduction'],
        icon: Target,
    },
    {
        id: 'activity',
        question: 'How active are you on a daily basis?',
        options: ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active'],
        icon: Activity,
    },
    {
        id: 'focus',
        question: 'Which area would you like to focus on first?',
        options: ['Nutrition', 'Heart Health', 'Mental Wellness', 'Physical Strength'],
        icon: HeartPulse,
    }
];

export const QuestionsPage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const navigate = useNavigate();

    const handleSelect = (option: string) => {
        setAnswers({ ...answers, [questions[currentStep].id]: option });
    };

    const handleNext = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // Save answers to local storage or state management for demo
            localStorage.setItem('health_profile', JSON.stringify(answers));
            navigate('/dashboard');
        }
    };

    const progress = ((currentStep + 1) / questions.length) * 100;

    return (
        <div className="section-container min-h-[80vh] flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl">
                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full mb-12 overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-blue-600"
                    />
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-12"
                    >
                        <div className="space-y-4">
                            <span className="label-micro uppercase tracking-widest text-blue-600">Question {currentStep + 1} of {questions.length}</span>
                            <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                                {questions[currentStep].question}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {questions[currentStep].options.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => handleSelect(option)}
                                    className={`p-6 rounded-2xl border-2 text-left transition-all duration-300 ${answers[questions[currentStep].id] === option
                                        ? 'border-blue-600 bg-blue-600/5 ring-4 ring-blue-600/10'
                                        : 'border-slate-100 dark:border-white/5 hover:border-slate-200 dark:hover:border-white/10'
                                        }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-lg">{option}</span>
                                        {answers[questions[currentStep].id] === option && (
                                            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white">
                                                <Check size={14} />
                                            </div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="pt-8 flex justify-between items-center">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                            >
                                Skip for now
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={!answers[questions[currentStep].id]}
                                className="btn-premium flex items-center gap-2 disabled:opacity-50"
                            >
                                {currentStep === questions.length - 1 ? 'Finish Profile' : 'Next Question'}
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
