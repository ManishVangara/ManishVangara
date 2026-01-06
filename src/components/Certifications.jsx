import React, { useState } from 'react';
import { certificationsData } from '../data/certifications';
import { Award, ExternalLink, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Certifications = () => {
    const [showAll, setShowAll] = useState(false);

    // Display top 3 if collapsed, all if expanded
    const displayedCerts = showAll ? certificationsData : certificationsData.slice(0, 3);

    return (
        <section id="certifications" className="py-24 bg-gray-50 dark:bg-zinc-900/50 relative overflow-hidden transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-serif">
                        Licenses & <span className="text-blue-600 dark:text-blue-400">Certifications</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-sans">
                        Validating expertise through industry-recognized standards.
                    </p>
                </div>

                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {displayedCerts.map((cert) => (
                            <motion.div
                                layout
                                key={cert.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="group bg-white dark:bg-black p-8 rounded-3xl border border-gray-200 dark:border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden flex flex-col"
                            >
                                {/* Decorative gradient blob */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors" />

                                <div className="flex items-start justify-between mb-6">
                                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                                        <Award size={32} />
                                    </div>
                                    {cert.url && (
                                        <a
                                            href={cert.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                        >
                                            <ExternalLink size={20} />
                                        </a>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-sans group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {cert.title}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-400 mb-4 font-medium">
                                    {cert.issuer}
                                </p>

                                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500 border-t border-gray-100 dark:border-white/5 pt-4 mt-auto">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} />
                                        <span>Issued {cert.date}</span>
                                    </div>
                                    {cert.credentialId && (
                                        <span className="font-mono text-xs opacity-70">
                                            ID: {cert.credentialId}
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {certificationsData.length > 3 && (
                    <div className="mt-12 text-center">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="inline-flex items-center gap-2 px-8 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-gray-900 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            {showAll ? (
                                <>
                                    Show Less <ChevronUp size={18} />
                                </>
                            ) : (
                                <>
                                    View All ({certificationsData.length}) <ChevronDown size={18} />
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};
