import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const TextLoop = ({ words, interval = 3000, className = "" }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, interval);
        return () => clearInterval(timer);
    }, [words.length, interval]);

    return (
        <div className={`relative inline-block w-full ${className}`}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0, filter: 'blur(4px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
                    transition={{
                        y: { type: "spring", stiffness: 100, damping: 20 },
                        opacity: { duration: 0.3 },
                        filter: { duration: 0.3 }
                    }}
                    className="absolute top-0 left-0 right-0 mx-auto text-center w-full"
                >
                    {words[index]}
                </motion.div>
            </AnimatePresence>
            {/* Invisible placeholder to maintain width/height roughly */}
            <span className="invisible" aria-hidden="true">{words[index]}</span>
        </div>
    );
};
