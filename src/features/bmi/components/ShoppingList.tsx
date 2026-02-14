import React from 'react';
import { shoppingItems } from '../utils/shopping';
import { ArrowUpRight, ShoppingBag } from 'lucide-react';

export const ShoppingList: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {shoppingItems.map((item) => (
                <div key={item.id} className="group relative border-t border-slate-200 dark:border-white/10 pt-6 transition-all duration-300 hover:border-black dark:hover:border-white">

                    <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">{item.category}</span>
                        <ShoppingBag size={16} className="text-slate-300 group-hover:text-black dark:group-hover:text-white transition-colors" />
                    </div>

                    <h4 className="text-xl font-medium text-slate-900 dark:text-white mb-2 group-hover:translate-x-1 transition-transform duration-300 ease-spring">
                        {item.name}
                    </h4>

                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed line-clamp-3">
                        {item.description}
                    </p>

                    <div className="space-y-2">
                        {item.links.slice(0, 2).map((link) => (
                            <a
                                key={link.label}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between w-full py-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white transition-colors border-b border-transparent hover:border-black dark:hover:border-white"
                            >
                                {link.label}
                                <ArrowUpRight size={14} />
                            </a>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
