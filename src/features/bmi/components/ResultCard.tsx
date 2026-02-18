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
            <div className="flex flex-col items-center justify-center relative py-12">
                <div className="scale-150 transform transition-all duration-1000 hover:scale-[1.6] ease-spring opacity-90">
                    <HumanFigure category={result.category} gender={gender} />
                </div>
            </div>

            {/* Right: Stats - Typographic Layout */}
            <div className="flex flex-col gap-10">

                {/* Main Score */}
                <div>
                    <div className="flex items-baseline gap-6 mb-4">
                        <h3 className="text-9xl font-black tracking-[-0.08em] text-slate-900 dark:text-white">
                            {result.bmi}
                        </h3>
                        <span className="text-2xl font-light tracking-wide text-blue-500 dark:text-blue-400 uppercase">
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
                <div className="grid grid-cols-2 gap-x-12 gap-y-12 border-t border-slate-100 dark:border-white/5 pt-12">
                    <div>
                        <span className="label-micro text-left">Ideal Target</span>
                        <p className="text-4xl font-extralight text-slate-900 dark:text-white tracking-tight">
                            {result.healthyRange.min} — {result.healthyRange.max} <span className="text-base text-slate-400 tracking-normal uppercase ml-1">kg</span>
                        </p>
                    </div>

                    <div>
                        <span className="label-micro text-left">Metabolic Need</span>
                        <p className="text-4xl font-extralight text-slate-900 dark:text-white tracking-tight">
                            {result.calories.maintenance} <span className="text-base text-slate-400 tracking-normal uppercase ml-1">kcal</span>
                        </p>
                    </div>

                    {result.category !== 'Normal' && (
                        <div className="col-span-2 bg-blue-500/5 dark:bg-white/5 p-8 rounded-[2rem] border border-blue-500/10 dark:border-white/10">
                            <span className="label-micro text-left">PRO-ACTIVE RECOVERY</span>
                            <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                                To reach a healthy weight, aim for a daily intake of <strong className="text-black dark:text-white font-semibold underline decoration-blue-500/30 underline-offset-8">{result.category === 'Underweight' ? result.calories.gain : result.calories.loss} kcal</strong>. {result.prediction}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
