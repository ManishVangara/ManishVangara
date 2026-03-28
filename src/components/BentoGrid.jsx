import { MapPin, Brain, Music, Coffee, Rocket, BookOpen, ArrowRight, Database, Server, LineChart, Activity, Sparkles } from 'lucide-react';
import { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../data/profile';
// import { Globe } from './ui/Globe';
// import { useLastFM } from '../hooks/useLastFM';
const Globe = lazy(() => import('./ui/Globe').then(module => ({ default: module.Globe })));

const DataPipelineCard = () => {
    const [step, setStep] = useState(0);
    const steps = ['Extracting', 'Transforming', 'Loading', 'Serving'];
    
    useEffect(() => {
        const timer = setInterval(() => setStep(s => (s + 1) % steps.length), 1500);
        return () => clearInterval(timer);
    }, []);

    return (
        <Card className="md:col-span-1 border-blue-500/20 group relative overflow-hidden h-full cursor-default hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
            <style>{`
                @keyframes flow {
                    0% { transform: translateX(-100%); opacity: 0; }
                    20% { opacity: 1; }
                    80% { opacity: 1; }
                    100% { transform: translateX(300px); opacity: 0; }
                }
                .flow-1 { animation: flow 2s infinite linear; }
                .flow-2 { animation: flow 2.5s infinite linear 0.8s; }
                .flow-3 { animation: flow 1.8s infinite linear 1.5s; }
            `}</style>
            
            {/* Matrix/Data grid background pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none transition-opacity duration-300 group-hover:opacity-10" style={{
                backgroundImage: 'radial-gradient(circle, #3b82f6 1.5px, transparent 1.5px)',
                backgroundSize: '12px 12px'
            }}></div>

            {/* Glowing morphing background spheres */}
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -translate-y-10 translate-x-10 transition-all duration-700 group-hover:scale-150 ${step % 2 === 0 ? 'bg-blue-500/20' : 'bg-purple-500/20'}`} />
            
            <div className="h-full flex flex-col justify-between relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className="bg-gradient-to-br from-blue-400 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 border border-white/20 text-white group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                        <Activity size={18} />
                    </div>
                    {/* Dynamic Status badge */}
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 overflow-hidden min-w-[100px] justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider relative transition-all duration-300">
                            {steps[step]}...
                        </span>
                    </div>
                </div>

                {/* The Playful Pipeline Animation */}
                <div className="flex-1 flex items-center justify-center py-2">
                    <div className="flex items-center gap-3 w-full max-w-[220px] justify-between relative">
                        {/* Connecting Track */}
                        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden z-0">
                            {/* Colorful Data Packets */}
                            <div className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-blue-500 to-transparent flow-1 rounded-full" />
                            <div className="absolute top-0 h-full w-6 bg-gradient-to-r from-transparent via-purple-500 to-transparent flow-2 rounded-full" />
                            <div className="absolute top-0 h-full w-10 bg-gradient-to-r from-transparent via-green-500 to-transparent flow-3 rounded-full" />
                        </div>

                        {/* Node 1: DB */}
                        <div className="relative group/node z-10">
                            <div className={`absolute -inset-2 bg-blue-500/20 rounded-full blur-md transition-opacity duration-300 ${step === 0 ? 'opacity-100' : 'opacity-0'}`} />
                            <div className={`w-10 h-10 rounded-xl shadow-lg border-2 flex items-center justify-center transition-all duration-300 ${step === 0 ? 'bg-blue-500 border-blue-400 text-white scale-110' : 'bg-white dark:bg-zinc-800 border-gray-200 dark:border-white/10 text-gray-400'}`}>
                                <Database size={16} className={step === 0 ? 'animate-bounce' : ''} />
                            </div>
                        </div>

                        {/* Node 2: Processing (Gears/Server) */}
                        <div className="relative group/node z-10">
                            <div className={`absolute -inset-2 bg-purple-500/20 rounded-full blur-md transition-opacity duration-300 ${step === 1 || step === 2 ? 'opacity-100' : 'opacity-0'}`} />
                            <div className={`w-10 h-10 rounded-xl shadow-lg border-2 flex items-center justify-center transition-all duration-300 ${step === 1 || step === 2 ? 'bg-purple-500 border-purple-400 text-white scale-110' : 'bg-white dark:bg-zinc-800 border-gray-200 dark:border-white/10 text-gray-400'}`}>
                                <Server size={16} className={step === 1 || step === 2 ? 'animate-pulse' : ''} />
                            </div>
                        </div>

                        {/* Node 3: Output (Insights) */}
                        <div className="relative group/node z-10">
                            <div className={`absolute -inset-2 bg-green-500/20 rounded-full blur-md transition-opacity duration-300 ${step === 3 ? 'opacity-100' : 'opacity-0'}`} />
                            <div className={`w-12 h-12 rounded-xl shadow-lg border-2 flex items-center justify-center transition-all duration-300 ${step === 3 ? 'bg-green-500 border-green-400 text-white scale-110 rotate-12' : 'bg-white dark:bg-zinc-800 border-gray-200 dark:border-white/10 text-gray-400'}`}>
                                <Sparkles size={18} className={step === 3 ? 'animate-spin' : ''} style={step === 3 ? { animationDuration: '3s' } : {}}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-500">Data Flow</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-[13px] font-medium mt-1">Powering millions of data points seamlessly</p>
                </div>
            </div>
        </Card>
    );
};

const CoffeeCard = () => {
    const brews = [
        { name: "Iced Caramel Macchiato", line: "Because adulting is too hard without sugar." },
        { name: "Golden Eagle Freeze", line: "A necessity for surviving production deployments." },
        { name: "Caffe Americano", line: "Just keeping it simple and incredibly caffeinated." },
        { name: "Nitro Cold Brew", line: "Fueling my hyper-focus mode." },
        { name: "Kicker", line: "For when regular coffee alone isn't enough." },
        { name: "Iced Chai Latte", line: "Strictly for cozy coding vibes." },
        { name: "Annihilator", line: "Executing pipelines at terminal velocity." }
    ];
    
    const [brew, setBrew] = useState(brews[0]);
    useEffect(() => {
        // Create a pseudo-random hash based on today's date string
        const dateString = new Date().toDateString();
        let hash = 0;
        for (let i = 0; i < dateString.length; i++) {
            hash = Math.imul(31, hash) + dateString.charCodeAt(i) | 0;
        }
        setBrew(brews[Math.abs(hash) % brews.length]);
    }, []);

    return (
        <Card className="md:col-span-1 group relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl -translate-y-8 translate-x-8 transition-transform duration-500 group-hover:scale-150" />
            
            <div className="flex justify-between items-start relative z-10">
                <div className="bg-amber-100 dark:bg-amber-500/20 w-10 h-10 rounded-full flex items-center justify-center border border-amber-200 dark:border-amber-500/30 shadow-sm group-hover:-rotate-12 group-hover:scale-110 transition-transform duration-300">
                    <Coffee className="text-amber-600 dark:text-amber-400" size={18} />
                </div>
                <div className="px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                    <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Today's Brew
                    </span>
                </div>
            </div>
            
            <div className="relative z-10 mt-6 md:mt-10">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-snug mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {brew.name}
                </h3>
                <div className="flex flex-wrap items-center mt-1">
                    <p className="text-gray-500 dark:text-gray-400 text-xs italic">
                        "{brew.line}"
                    </p>
                </div>
            </div>
        </Card>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">

                {/* 1. Location Card - Large 2x2 */}
                <Card className="md:col-span-2 md:row-span-2 min-h-[300px] relative flex flex-col justify-between">
                    <div className="absolute inset-0 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                        <Suspense fallback={<div className="w-full h-full bg-gray-100 dark:bg-zinc-800 animate-pulse" />}>
                            <Globe className="w-full h-full" lat={profile.coordinates.lat} lng={profile.coordinates.lng} key={profile.location} />
                        </Suspense>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent dark:from-black dark:via-transparent" />

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
                                {time.toLocaleTimeString('en-US', { timeZone: profile.timezone, hour: 'numeric', minute: '2-digit' })} {new Date().toLocaleTimeString('en-us', { timeZone: profile.timezone, timeZoneName: 'short' }).split(' ')[2]}
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
                <Card className="md:col-span-1 bg-white dark:bg-zinc-900/50">
                    <div className="h-full flex flex-col justify-between">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <div className="w-2 h-2 rounded-full bg-yellow-500" />
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="ml-2 text-xs font-mono text-gray-500 dark:text-gray-400">curiously_learning_about.sh</span>
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

                {/* 3. Data Pipeline Component */}
                <DataPipelineCard />

                {/* 4. Coffee Tracker */}
                <CoffeeCard />

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
                                <AnimatedCounter end={11} />
                                <span className="text-base font-normal text-gray-500">+</span>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Projects Shipped</p>
                        </div>
                    </div>
                </Card>

                {/* 6. Lessons Learned - Wide */}
                <Card className="md:col-span-2 bg-white dark:bg-white/5 border-dashed">
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
