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

            {/* Gender Switcher - Minimalist Segmented Control */}
            <div className="flex justify-center mb-12">
                <div className="bg-slate-100 dark:bg-white/10 p-1 rounded-full inline-flex relative">
                    <button
                        onClick={() => onChange('gender', 'male')}
                        className={`relative z-10 px-8 py-2 rounded-full text-sm font-medium transition-all duration-300 ${input.gender === 'male' ? 'text-black dark:text-black' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
                    >
                        Male
                    </button>
                    <button
                        onClick={() => onChange('gender', 'female')}
                        className={`relative z-10 px-8 py-2 rounded-full text-sm font-medium transition-all duration-300 ${input.gender === 'female' ? 'text-black dark:text-black' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
                    >
                        Female
                    </button>

                    {/* Sliding Background */}
                    <div
                        className={`absolute top-1 bottom-1 w-[50%] bg-white dark:bg-white rounded-full shadow-sm transition-all duration-300 ease-spring ${input.gender === 'male' ? 'left-1' : 'left-[calc(50%-4px)]'}`}
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
