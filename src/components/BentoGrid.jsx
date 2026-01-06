import { MapPin, Brain, Music, Coffee, Rocket, BookOpen, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Globe } from './ui/Globe';

const Card = ({ children, className = "" }) => (
    <div className={`bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-6 overflow-hidden relative group hover:border-blue-500/30 transition-all duration-300 ${className}`}>
        {children}
    </div>
);

const AnimatedCounter = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTime;
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            setCount(Math.floor(end * percentage));

            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [end, duration, isVisible]);

    return <span ref={countRef}>{count}</span>;
};

export const BentoGrid = () => {
    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">

                {/* 1. Location Card - Large 2x2 */}
                <Card className="md:col-span-2 md:row-span-2 min-h-[300px] relative flex flex-col justify-between">
                    <div className="absolute inset-0 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                        <Globe className="w-full h-full" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-black dark:via-transparent" />

                    {/* Blinking Dot Map Placeholder (CSS Pattern) */}
                    <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none" style={{
                        backgroundImage: 'radial-gradient(circle, #888 1px, transparent 1px)',
                        backgroundSize: '24px 24px'
                    }}></div>

                    <div className="relative z-10 flex justify-end">
                        <div className="bg-white/90 dark:bg-black/80 backdrop-blur px-3 py-1 rounded-full flex items-center gap-2 border border-gray-200 dark:border-white/10">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">San Francisco, CA</span>
                        </div>
                    </div>

                    <div className="relative z-10 mt-auto">
                        <div className="bg-blue-600/10 dark:bg-blue-500/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                            <MapPin className="text-blue-600 dark:text-blue-400" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Based in SF</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 mb-4">Open to relocation & remote work.</p>

                        <Link to="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:gap-3 transition-all">
                            Learn more about me <ArrowRight size={16} />
                        </Link>
                    </div>
                </Card>

                {/* 2. Curious About */}
                <Card className="md:col-span-1 bg-gradient-to-br from-purple-500/5 to-blue-500/5 hover:from-purple-500/10 hover:to-blue-500/10">
                    <div className="h-full flex flex-col justify-between">
                        <div className="bg-purple-100 dark:bg-purple-500/20 w-10 h-10 rounded-full flex items-center justify-center">
                            <Brain className="text-purple-600 dark:text-purple-400" size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Curious about</h3>
                            <div className="flex flex-wrap gap-2">
                                {['LLMs', 'RAG', 'Agents'].map(tag => (
                                    <span key={tag} className="text-xs px-2 py-1 bg-white dark:bg-white/10 rounded-md border border-gray-200 dark:border-white/5 text-gray-600 dark:text-gray-300">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>

                {/* 3. Music */}
                <Card className="md:col-span-1 border-pink-500/20 group">
                    <div className="h-full flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <div className="bg-pink-100 dark:bg-pink-500/20 w-10 h-10 rounded-full flex items-center justify-center">
                                <Music className="text-pink-600 dark:text-pink-400" size={20} />
                            </div>
                            {/* Visualizer Animation */}
                            <div className="flex items-end gap-1 h-6">
                                <div className="w-1 bg-pink-500/50 rounded-t animate-[music_1s_ease-in-out_infinite]" style={{ height: '40%' }}></div>
                                <div className="w-1 bg-pink-500/50 rounded-t animate-[music_1.2s_ease-in-out_infinite_0.1s]" style={{ height: '80%' }}></div>
                                <div className="w-1 bg-pink-500/50 rounded-t animate-[music_0.8s_ease-in-out_infinite_0.2s]" style={{ height: '50%' }}></div>
                                <div className="w-1 bg-pink-500/50 rounded-t animate-[music_1.1s_ease-in-out_infinite_0.3s]" style={{ height: '70%' }}></div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Coding to</h3>
                            <p className="text-pink-600 dark:text-pink-400 text-sm font-medium">Lo-fi Beats</p>
                        </div>
                    </div>
                </Card>

                {/* 4. Coffee Counter */}
                <Card className="md:col-span-1">
                    <div className="h-full flex flex-col justify-between">
                        <div className="bg-amber-100 dark:bg-amber-500/20 w-10 h-10 rounded-full flex items-center justify-center">
                            <Coffee className="text-amber-600 dark:text-amber-400" size={20} />
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white flex items-baseline gap-1">
                                <AnimatedCounter end={1250} />
                                <span className="text-base font-normal text-gray-500">+</span>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Coffees Consumed</p>
                        </div>
                    </div>
                </Card>

                {/* 5. Projects Shipped */}
                <Card className="md:col-span-1">
                    <div className="h-full flex flex-col justify-between">
                        <div className="bg-green-100 dark:bg-green-500/20 w-10 h-10 rounded-full flex items-center justify-center">
                            <Rocket className="text-green-600 dark:text-green-400" size={20} />
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white flex items-baseline gap-1">
                                <AnimatedCounter end={45} />
                                <span className="text-base font-normal text-gray-500">+</span>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Projects Shipped</p>
                        </div>
                    </div>
                </Card>

                {/* 6. Lessons Learned - Wide */}
                <Card className="md:col-span-2 bg-gray-50 dark:bg-white/5 border-dashed">
                    <div className="h-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex gap-4 items-center">
                            <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                                <BookOpen className="text-blue-600 dark:text-blue-400" size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Lessons Learned</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm max-w-sm">
                                    Mistakes are just undocumented features... until you fix them. Check out my journey.
                                </p>
                            </div>
                        </div>

                        <a href="#lessons" className="group/btn flex items-center gap-2 px-6 py-3 bg-white dark:bg-white/10 rounded-full text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/20 transition-all">
                            Sneak Peek
                            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </Card>

            </div>
        </section>
    );
};
