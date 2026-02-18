import React from 'react';
import { UserInput, Gender } from '../utils/calculator';

interface InputFormProps {
    input: UserInput;
    onChange: (field: keyof UserInput, value: string | number | Gender) => void;
    onCalculate: () => void;
}

export const InputForm: React.FC<InputFormProps> = ({ input, onChange, onCalculate }) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (input.weight && input.height && input.age) {
                onCalculate();
            }
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto animate-scale-reveal">

            {/* Gender Switcher - High-End Segmented Control */}
            <div className="flex justify-center mb-16">
                <div className="bg-white/20 dark:bg-white/5 p-1.5 rounded-full inline-flex relative backdrop-blur-3xl border border-white/20 dark:border-white/10 shadow-2xl">
                    <button
                        onClick={() => onChange('gender', 'male')}
                        className={`relative z-10 px-10 py-3 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-700 ${input.gender === 'male' ? 'text-black' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'}`}
                    >
                        Male
                    </button>
                    <button
                        onClick={() => onChange('gender', 'female')}
                        className={`relative z-10 px-10 py-3 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-700 ${input.gender === 'female' ? 'text-black' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'}`}
                    >
                        Female
                    </button>

                    {/* Sliding Background - Tesla Style */}
                    <div
                        className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-full shadow-2xl transition-all duration-700 ease-spring ${input.gender === 'male' ? 'left-1.5' : 'left-[calc(50%+1.5px)]'}`}
                    />
                </div>
            </div>

            <div className="space-y-12" onKeyDown={handleKeyDown}>
                <div className="grid grid-cols-2 gap-12">
                    <div>
                        <label className="label-micro">Age</label>
                        <input
                            type="number"
                            value={input.age || ''}
                            onChange={(e) => onChange('age', parseInt(e.target.value) || 0)}
                            className="input-minimal"
                            placeholder="0"
                        />
                    </div>
                    <div>
                        <label className="label-micro">Height (cm)</label>
                        <input
                            type="number"
                            value={input.height || ''}
                            onChange={(e) => onChange('height', parseInt(e.target.value) || 0)}
                            className="input-minimal"
                            placeholder="0"
                        />
                    </div>
                </div>

                <div>
                    <label className="label-micro">Weight (kg)</label>
                    <input
                        type="number"
                        value={input.weight || ''}
                        onChange={(e) => onChange('weight', parseFloat(e.target.value) || 0)}
                        className="input-minimal"
                        placeholder="0"
                    />
                </div>

                <div className="pt-8 flex justify-center">
                    <button
                        onClick={onCalculate}
                        disabled={!input.weight || !input.height || !input.age}
                        className="btn-premium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Calculate Analysis
                    </button>
                </div>
            </div>
        </div>
    );
};
