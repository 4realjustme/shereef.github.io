import React from 'react';
import { BmiResult, Gender } from '../utils/calculator';
import HumanFigure from './HumanFigure';

interface ResultCardProps {
    result: BmiResult;
    gender: Gender;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, gender }) => {

    // BMI gauge: position percentage (range 15-40)
    const getIndicatorPercent = () => {
        const min = 15;
        const max = 40;
        const clamped = Math.min(Math.max(result.bmi, min), max);
        return ((clamped - min) / (max - min)) * 100;
    };

    return (
        <div className="w-full grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Character - Clean Presentation */}
            <div className="flex flex-col items-center justify-center relative">
                <div className="scale-125 transform transition-transform duration-700 hover:scale-[1.3] ease-spring">
                    <HumanFigure category={result.category} gender={gender} />
                </div>
            </div>

            {/* Right: Stats - Typographic Layout */}
            <div className="flex flex-col gap-10">

                {/* Main Score */}
                <div>
                    <div className="flex items-baseline gap-4 mb-2">
                        <h3 className="text-8xl font-black tracking-tighter text-slate-900 dark:text-white font-display">
                            {result.bmi}
                        </h3>
                        <span className="text-xl font-medium text-slate-500 dark:text-slate-400 capitalize">
                            {result.category}
                        </span>
                    </div>

                    {/* Minimalist Gauge line */}
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-white/10 rounded-full relative overflow-hidden mt-2">
                        {/* Gradient bar based on category */}
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-300 via-green-300 to-red-300 opacity-30" />
                        <div
                            className="absolute top-0 h-full w-2 bg-black dark:bg-white rounded-full transition-all duration-1000 ease-spring"
                            style={{ left: `${getIndicatorPercent()}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-300 dark:text-slate-600 mt-2 font-medium tracking-wide">
                        <span>UNDERWEIGHT</span>
                        <span>NORMAL</span>
                        <span>OVERWEIGHT</span>
                        <span>OBESE</span>
                    </div>
                </div>

                {/* Supporting Stats - Grid */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-8 border-t border-slate-100 dark:border-white/5 pt-8">
                    <div>
                        <span className="label-micro text-left">Healthy Range</span>
                        <p className="text-2xl font-light text-slate-800 dark:text-slate-200">
                            {result.healthyRange.min} — {result.healthyRange.max} <span className="text-sm text-slate-400">kg</span>
                        </p>
                    </div>

                    <div>
                        <span className="label-micro text-left">Daily Maintenance</span>
                        <p className="text-2xl font-light text-slate-800 dark:text-slate-200">
                            {result.calories.maintenance} <span className="text-sm text-slate-400">kcal</span>
                        </p>
                    </div>

                    {result.category !== 'Normal' && (
                        <div className="col-span-2">
                            <span className="label-micro text-left">Recommendation</span>
                            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                To reach a healthy weight, aim for a daily intake of <strong className="text-black dark:text-white font-semibold">{result.category === 'Underweight' ? result.calories.gain : result.calories.loss} kcal</strong>. {result.prediction}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
