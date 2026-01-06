
import React from 'react';
import { lessons } from '../data/lessons';
import { AlertTriangle, Lightbulb, Brain, Server, Users, Code } from 'lucide-react';

const getIconForDomain = (domain) => {
    switch (domain) {
        case 'Machine Learning': return <Brain className="w-4 h-4" />;
        case 'Architecture': return <Server className="w-4 h-4" />;
        case 'Communication': return <Users className="w-4 h-4" />;
        case 'Engineering': return <Code className="w-4 h-4" />;
        default: return <AlertTriangle className="w-4 h-4" />;
    }
};

export const LessonsLearned = () => {
    return (
        <section id="lessons" className="py-24 bg-gray-50 dark:bg-black relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Lessons Learned <span className="text-red-500 dark:text-red-400">The Hard Way</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Experience is what you get when you didn't get what you wanted. Here are my most valuable scars.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {lessons.map((item, index) => (
                        <div
                            key={index}
                            className={`group relative bg-white dark:bg-zinc-900/50 rounded-3xl p-8 border border-gray-200 dark:border-white/10 overflow-hidden hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-black/20 ${item.borderColor ? `hover:${item.borderColor}` : ''}`}
                        >
                            {/* Decorative number */}
                            <span className="absolute top-6 right-8 text-8xl font-bold text-gray-100 dark:text-white/5 font-sans pointer-events-none select-none group-hover:scale-105 transition-transform duration-500">
                                {item.id}
                            </span>

                            {/* Header */}
                            <div className="relative z-10 mb-6">
                                <div className="flex flex-wrap gap-3 mb-4">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${item.type === 'Failure'
                                        ? 'bg-red-50/50 text-red-600 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20'
                                        : 'bg-orange-50/50 text-orange-600 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20'
                                        }`}>
                                        <AlertTriangle className="w-3 h-3" />
                                        {item.type}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-blue-50/50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20">
                                        {getIconForDomain(item.domain)}
                                        {item.domain}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-400 transition-all duration-300">
                                    {item.title}
                                </h3>
                            </div>

                            {/* Description */}
                            <div className="relative z-10 mb-8">
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>

                            {/* The Lesson Box */}
                            <div className="relative z-10 bg-gray-50 dark:bg-white/5 rounded-2xl p-5 border border-gray-100 dark:border-white/5 group-hover:bg-white dark:group-hover:bg-zinc-800/80 transition-colors duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-500/20 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                                        <Lightbulb className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">The Lesson</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                                            "{item.lesson}"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
