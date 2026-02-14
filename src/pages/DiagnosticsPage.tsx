

export const Diagnostics = () => {
    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">AI Diagnostics</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-white/5 backdrop-blur-md min-h-[300px] flex items-center justify-center">
                    <p className="text-slate-500 dark:text-slate-400">Symptom Checker Module</p>
                </div>
                <div className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-white/5 backdrop-blur-md min-h-[300px] flex items-center justify-center">
                    <p className="text-slate-500 dark:text-slate-400">Radiology Analysis Module</p>
                </div>
            </div>
        </div>
    );
};
