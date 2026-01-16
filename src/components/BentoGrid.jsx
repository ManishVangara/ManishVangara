import { MapPin, Brain, Music, Coffee, Rocket, BookOpen, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../data/profile';
// import { Globe } from './ui/Globe';
import { useLastFM } from '../hooks/useLastFM';
const Globe = lazy(() => import('./ui/Globe').then(module => ({ default: module.Globe })));

const MusicCard = () => {
    const { musicData, loading } = useLastFM();

    if (loading || !musicData) {
        return (
            <Card className="md:col-span-1 border-pink-500/20 group">
                <div className="h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="bg-pink-100 dark:bg-pink-500/20 w-10 h-10 rounded-full flex items-center justify-center">
                            <Music className="text-pink-600 dark:text-pink-400" size={20} />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Offline</h3>
                        <p className="text-pink-600 dark:text-pink-400 text-sm font-medium">Spotify not connected</p>
                    </div>
                </div>
            </Card>
        );
    }

    return (
        <a href={musicData.url} target="_blank" rel="noopener noreferrer" className="block h-full">
            <Card className="md:col-span-1 h-full p-0 overflow-hidden relative group border-0 ring-1 ring-gray-200 dark:ring-white/10">
                {/* Background Art */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${musicData.art})` }}
                />
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm group-hover:backdrop-blur-md transition-all duration-300" />

                <div className="relative h-full p-6 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-start">
                        <div className="bg-green-500/20 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10">
                            {musicData.isPlaying ? (
                                <div className="flex items-end gap-1 h-4">
                                    <div className="w-1 bg-green-500 rounded-t animate-[music_1s_ease-in-out_infinite]" style={{ height: '40%' }}></div>
                                    <div className="w-1 bg-green-500 rounded-t animate-[music_1.2s_ease-in-out_infinite_0.1s]" style={{ height: '80%' }}></div>
                                    <div className="w-1 bg-green-500 rounded-t animate-[music_0.8s_ease-in-out_infinite_0.2s]" style={{ height: '50%' }}></div>
                                </div>
                            ) : (
                                <Music className="text-green-400" size={20} />
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className={`w-2 h-2 rounded-full ${musicData.isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                            <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">
                                {musicData.isPlaying ? 'Listening To' : 'Last Played'}
                            </span>
                        </div>
                        <h3 className="text-lg font-bold text-white leading-tight line-clamp-1" title={musicData.name}>
                            {musicData.name}
                        </h3>
                        <p className="text-gray-300 text-sm font-medium line-clamp-1" title={musicData.artist}>
                            {musicData.artist}
                        </p>
                    </div>
                </div>
            </Card>
        </a>
    );
};

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

import { QuoteBubble } from './QuoteBubble';

export const BentoGrid = ({ quote }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 60000); // Update every minute
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">

                {/* 1. Location Card - Large 2x2 */}
                <Card className="md:col-span-2 md:row-span-2 min-h-[300px] relative flex flex-col justify-between">
                    <div className="absolute inset-0 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                        <Suspense fallback={<div className="w-full h-full bg-gray-100 dark:bg-zinc-800 animate-pulse" />}>
                            <Globe className="w-full h-full" />
                        </Suspense>
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
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                {time.toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', hour: 'numeric', minute: '2-digit' })} PST
                            </span>
                        </div>
                    </div>

                    <div className="relative z-10 mt-auto">
                        <div className="bg-blue-600/10 dark:bg-blue-500/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                            <MapPin className="text-blue-600 dark:text-blue-400" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Based in {profile.location}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 mb-4">Open to relocation & remote work.</p>

                        <Link to="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:gap-3 transition-all">
                            Learn more about me <ArrowRight size={16} />
                        </Link>
                    </div>
                </Card>

                {/* 2. Curious About -> The Learning Stack */}
                <Card className="md:col-span-1 bg-zinc-50 dark:bg-zinc-900/50">
                    <div className="h-full flex flex-col justify-between">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <div className="w-2 h-2 rounded-full bg-yellow-500" />
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="ml-2 text-xs font-mono text-gray-400">curiously_learning_about.sh</span>
                        </div>

                        <div className="space-y-2 font-mono text-xs">
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                <span className="text-green-500">➜</span>
                                <span className="text-blue-500">~</span>
                                <span>current_focus</span>
                            </div>

                            <div className="space-y-1 pl-4">
                                <div className="flex items-center justify-between group/item">
                                    <span className="text-gray-500 dark:text-gray-400">1. [ACTIVE]</span>
                                    <span className="text-gray-900 dark:text-gray-200 font-medium">Agents</span>
                                </div>
                                <div className="flex items-center justify-between group/item">
                                    <span className="text-gray-500 dark:text-gray-400">2. [BUILD]</span>
                                    <span className="text-gray-900 dark:text-gray-200 font-medium">RAG Systems</span>
                                </div>
                                <div className="flex items-center justify-between group/item">
                                    <span className="text-gray-500 dark:text-gray-400">3. [STUDY]</span>
                                    <span className="text-gray-900 dark:text-gray-200 font-medium">Gen AI</span>
                                </div>
                            </div>

                            <div className="animate-pulse text-green-500 mt-2">_</div>
                        </div>
                    </div>
                </Card>

                {/* 3. Music */}
                <Card className="md:col-span-1 border-pink-500/20 group">
                    {/* 3. Music */}
                    <MusicCard />
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

                {/* 5. Projects Shipped -> Contribution Activity */}
                <Card className="md:col-span-1 min-h-[180px] overflow-hidden">
                    {/* Background Grid Pattern */}
                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-1 p-2 opacity-20 dark:opacity-10 pointer-events-none">
                        {Array.from({ length: 24 }).map((_, i) => (
                            <div
                                key={i}
                                className={`rounded-sm transition-all duration-1000 ${[2, 5, 8, 12, 15, 19, 21].includes(i) ? 'bg-green-500 animate-pulse' : 'bg-gray-300 dark:bg-white/20'
                                    }`}
                                style={{ animationDelay: `${i * 100}ms` }}
                            />
                        ))}
                    </div>

                    <div className="relative h-full flex flex-col justify-between z-10">
                        <div className="bg-green-100 dark:bg-green-500/20 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm">
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

                {/* 7. Quote - Wide (Beside Lessons Learned or below depending on grid flow, but actually Lessons Learned is col-span-2 so we have 2 cols left in a 4 col grid if it's on the same row, wait.
                   Row 1: Location (2x2), Curious (1), Music (1) -> 4 cols occupied.
                   Row 2: Location (cont.), Coffee (1), Projects (1) -> 4 cols occupied.
                   Row 3: Lessons Learned (2) -> 2 cols busy, 2 cols free.
                   Perfect spot for Quote (2).
                */}
                <div className="md:col-span-2 flex items-center justify-center">
                    <QuoteBubble quote={quote} className="!py-0" />
                </div>

            </div>
        </section>
    );
};
