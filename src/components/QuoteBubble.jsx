import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const QuoteBubble = ({ quote }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" });

    if (!quote) return null;

    return (
        <div ref={ref} className="flex justify-center py-16 overflow-visible">
            <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 30 }}
                animate={isInView ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.8, opacity: 0, y: 30 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                // Organic blob shape using varying border radius
                style={{ borderRadius: "60% 40% 60% 40% / 50% 60% 40% 50%" }}
                className="relative max-w-lg mx-auto px-10 py-8 bg-blue-50/10 dark:bg-zinc-800/20 backdrop-blur-sm border border-blue-100/10 dark:border-white/5 text-center shadow-sm"
            >
                {/* Subtle cloud puffs as tails */}
                <div className="absolute -bottom-6 left-1/3 flex flex-col items-center opacity-40">
                    <div className="w-3 h-3 bg-blue-100/10 dark:bg-zinc-800/20 rounded-full border border-blue-100/10 dark:border-white/5 translate-x-2" />
                    <div className="w-2 h-2 bg-blue-100/10 dark:bg-zinc-800/20 rounded-full border border-blue-100/10 dark:border-white/5 translate-y-1" />
                </div>

                <p className="font-handwriting text-lg md:text-2xl text-gray-500/90 dark:text-gray-400/90 leading-relaxed italic">
                    "{quote}"
                </p>
            </motion.div>
        </div>
    );
};
