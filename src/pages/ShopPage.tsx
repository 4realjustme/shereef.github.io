import { ShoppingList } from '../features/bmi/components/ShoppingList';

export const ShopPage = () => {
    return (
        <div className="section-container">
            <div className="space-y-4 mb-16">
                <span className="label-micro">Curated Selection</span>
                <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Health Shop.
                </h1>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-xl">
                    Premium equipment and supplements curated for your personalized health journey.
                </p>
            </div>

            <div className="glass-panel p-12 mb-12">
                <ShoppingList />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-panel p-8 bg-blue-500/5 border-blue-500/20">
                    <h3 className="text-xl font-bold mb-4">Membership Perks</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Synergy Health members get exclusive access to limited edition products and priority shipping on all orders.
                    </p>
                </div>
                <div className="glass-panel p-8 bg-indigo-500/5 border-indigo-500/20">
                    <h3 className="text-xl font-bold mb-4">Expert Support</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Need help choosing the right equipment? Our team of health experts is available for 1-on-1 consultations.
                    </p>
                </div>
            </div>
        </div>
    );
};
