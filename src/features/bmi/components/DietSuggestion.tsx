import { useState, useCallback, FC } from 'react';
import { getNextDietPlan, DietType, DietPlan } from '../utils/diet';
import { RotateCcw } from 'lucide-react';

export const DietSuggestion: FC = () => {
    const [dietType, setDietType] = useState<DietType | null>(null);
    const [plan, setPlan] = useState<DietPlan | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const selectDiet = (type: DietType) => {
        setDietType(type);
        setPlan(getNextDietPlan(type));
    };

    const refreshPlan = useCallback(() => {
        if (!dietType) return;
        setIsRefreshing(true);
        setTimeout(() => {
            setPlan(getNextDietPlan(dietType));
            setIsRefreshing(false);
        }, 300);
    }, [dietType]);

    if (!dietType) {
        return (
            <div className="flex gap-6 justify-center">
                <button
                    onClick={() => selectDiet('veg')}
                    className="glass-panel px-10 py-12 flex flex-col items-center gap-4 hover:bg-white/80 dark:hover:bg-white/10 group cursor-pointer w-48 text-center"
                >
                    <span className="text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-green-600 transition-colors">Vegetarian</span>
                    <div className="w-12 h-12 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:border-green-500 transition-colors">
                        <span className="block w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-green-500" />
                    </div>
                </button>

                <button
                    onClick={() => selectDiet('non-veg')}
                    className="glass-panel px-10 py-12 flex flex-col items-center gap-4 hover:bg-white/80 dark:hover:bg-white/10 group cursor-pointer w-48 text-center"
                >
                    <span className="text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-red-500 transition-colors">Non-Veg</span>
                    <div className="w-12 h-12 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:border-red-500 transition-colors">
                        <span className="block w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-red-500" />
                    </div>
                </button>
            </div>
        );
    }

    if (!plan) return null;

    return (
        <div className={`w-full transition-opacity duration-500 ${isRefreshing ? 'opacity-50' : 'opacity-100'}`}>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-white/5">
                <div>
                    <span className="label-micro text-left">{dietType === 'veg' ? 'Vegetarian Plan' : 'Non-Vegetarian Plan'}</span>
                    <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">{plan.name}</h3>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => { setDietType(null); setPlan(null); }} className="btn-secondary">
                        Change Type
                    </button>
                    <button onClick={refreshPlan} className="btn-secondary !px-4" title="Regenerate">
                        <RotateCcw size={16} />
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Main Nutrition Panel */}
                <div className="md:col-span-1 space-y-6">
                    <div className="glass-panel p-6">
                        <span className="label-micro text-left mb-4">Macros</span>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-500 dark:text-slate-400">Calories</span>
                                <span className="text-lg font-medium text-slate-900 dark:text-white">{plan.nutrition.calories}</span>
                            </div>
                            <div className="h-px w-full bg-slate-100 dark:bg-white/5" />
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-500 dark:text-slate-400">Protein</span>
                                <span className="text-lg font-medium text-slate-900 dark:text-white">{plan.nutrition.protein}</span>
                            </div>
                            <div className="h-px w-full bg-slate-100 dark:bg-white/5" />
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-500 dark:text-slate-400">Carbs</span>
                                <span className="text-lg font-medium text-slate-900 dark:text-white">{plan.nutrition.carbs}</span>
                            </div>
                            <div className="h-px w-full bg-slate-100 dark:bg-white/5" />
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-500 dark:text-slate-400">Fats</span>
                                <span className="text-lg font-medium text-slate-900 dark:text-white">{plan.nutrition.fats}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Meals List */}
                <div className="md:col-span-2 space-y-4">
                    <span className="label-micro text-left mb-2">Today's Menu</span>
                    {plan.meals.map((item, index) => (
                        <div key={index} className="flex gap-4 items-start group">
                            <div className="mt-1 w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center flex-shrink-0">
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 group-hover:bg-black dark:group-hover:bg-white transition-colors duration-300" />
                            </div>
                            <p className="text-lg text-slate-700 dark:text-slate-300 font-light group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
                                {item}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
