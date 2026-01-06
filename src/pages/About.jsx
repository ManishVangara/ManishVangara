import React, { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, Laptop, Coffee, Camera, Plane, Music, Code, CheckCircle2, Circle, ArrowUpRight } from 'lucide-react';

export const About = () => {
    return (
        <div className="min-h-screen pt-32 px-6 pb-24 overflow-x-hidden">
            <div className="max-w-6xl mx-auto space-y-32">

                {/* Hero Section with Photo */}
                <div className="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24 animate-fadeInUp">
                    {/* Text Content */}
                    <div className="flex-1 space-y-8">
                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
                            About <span className="text-blue-600 dark:text-blue-400 relative inline-block">
                                Me.
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-200 dark:text-blue-900 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z" fill="currentColor" />
                                </svg>
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                            A glimpse into my life, interests, and the tools I use to build the future.
                            <br /><br />
                            <span className="text-base md:text-lg text-gray-500 italic">
                                "I write code not just to solve problems, but to create experiences."
                            </span>
                        </p>

                        <div className="flex gap-4 pt-4">
                            <SocialButton href="https://linkedin.com/in/manishvangara" icon={<Linkedin />} label="LinkedIn" />
                            <SocialButton href="mailto:hello@manishvangara.com" icon={<Mail />} label="Email" />
                        </div>
                    </div>

                    {/* Photo Container */}
                    <div className="relative flex-1 flex justify-center lg:justify-end group">
                        <div className="relative w-72 h-72 md:w-96 md:h-96">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 -right-4 w-full h-full bg-blue-100 dark:bg-blue-900/20 rounded-t-[100px] rounded-br-[100px] rounded-bl-[20px] -rotate-6 transition-transform duration-500 group-hover:rotate-0" />
                            <div className="absolute bottom-0 -left-4 w-full h-full bg-purple-100 dark:bg-purple-900/20 rounded-b-[100px] rounded-tl-[100px] rounded-tr-[20px] rotate-6 transition-transform duration-500 group-hover:rotate-0" />

                            {/* Image */}
                            <div className="relative w-full h-full overflow-hidden rounded-[40px] shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-blue-500/20 border-4 border-white dark:border-black">
                                <img
                                    src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1000&auto=format&fit=crop"
                                    alt="Manish Vangara"
                                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 scale-110 group-hover:scale-100"
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 1. My Story */}
                <FadeInSection id="story" className="grid lg:grid-cols-12 gap-12 items-start scroll-mt-32">
                    <div className="lg:col-span-4 sticky top-32">
                        <SectionTitle icon="blue" title="My Story" />
                    </div>
                    <div className="lg:col-span-8 prose dark:prose-invert prose-lg text-gray-600 dark:text-gray-400 leading-loose">
                        <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-blue-600 first-letter:float-left first-letter:mr-3">
                            I started my journey with a curiosity for how things work, which quickly evolved into a passion for software engineering.
                            Over the years, I've honed my skills in building scalable applications, exploring data engineering, and diving deep into
                            artificial intelligence.
                        </p>
                        <p>
                            From late-night debugging sessions to deploying production-grade systems, I thrive on the challenge of solving complex problems.
                            My philosophy is simple: build things that matter, and never stop learning.
                        </p>
                    </div>
                </FadeInSection>

                {/* 2. Hobbies */}
                <FadeInSection id="hobbies" className="grid lg:grid-cols-12 gap-12 items-start scroll-mt-32">
                    <div className="lg:col-span-4 sticky top-32">
                        <SectionTitle icon="purple" title="Hobbies" />
                    </div>
                    <div className="lg:col-span-8 grid grid-cols-2 gap-6">
                        <HobbyCard icon={<Camera size={32} />} label="Photography" desc="Capturing moments" color="bg-pink-500/10 text-pink-600" />
                        <HobbyCard icon={<Plane size={32} />} label="Traveling" desc="Exploring cultures" color="bg-blue-500/10 text-blue-600" />
                        <HobbyCard icon={<Music size={32} />} label="Production" desc="Creating beats" color="bg-purple-500/10 text-purple-600" />
                        <HobbyCard icon={<Coffee size={32} />} label="Coffee" desc="Brewing perfection" color="bg-amber-500/10 text-amber-600" />
                    </div>
                </FadeInSection>

                {/* 3. Bucketlist */}
                <FadeInSection id="bucketlist" className="grid lg:grid-cols-12 gap-12 items-start scroll-mt-32">
                    <div className="lg:col-span-4 sticky top-32">
                        <SectionTitle icon="green" title="Bucket List" />
                    </div>
                    <div className="lg:col-span-8 grid md:grid-cols-2 gap-4">
                        <BucketItem done={true} label="Deploy a production app to millions" />
                        <BucketItem done={false} label="Visit Japan" />
                        <BucketItem done={true} label="Build a custom mechanical keyboard" />
                        <BucketItem done={false} label="Contribute to a major Open Source project" />
                        <BucketItem done={false} label="Learn to fly a plane" />
                        <BucketItem done={true} label="Run a marathon" />
                    </div>
                </FadeInSection>

                {/* 5. Workstation Tools */}
                <FadeInSection id="setup" className="grid lg:grid-cols-12 gap-12 items-start scroll-mt-32">
                    <div className="lg:col-span-4 sticky top-32">
                        <SectionTitle icon="yellow" title="My Setup" />
                    </div>
                    <div className="lg:col-span-8 grid md:grid-cols-2 gap-8">
                        <ToolCategory title="Hardware" items={[
                            "MacBook Pro M3 Max",
                            "Keychron Q1 Pro",
                            "Logitech MX Master 3S",
                            "Dell UltraSharp 27\" 4K"
                        ]} />
                        <ToolCategory title="Software" items={[
                            "VS Code + Cursor AI",
                            "iTerm2 + Oh My Zsh",
                            "Figma",
                            "Notion"
                        ]} />
                    </div>
                </FadeInSection>

                {/* 4. Connect/Links */}
                <FadeInSection id="connect" className="text-center py-12">
                    <div className="inline-block p-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 cursor-pointer hover:scale-105 transition-transform duration-300">
                        <a href="mailto:hello@manishvangara.com" className="block px-12 py-4 bg-white dark:bg-black rounded-full text-xl font-bold text-gray-900 dark:text-white hover:bg-transparent hover:text-white transition-colors">
                            Let's Build Something Together
                        </a>
                    </div>
                </FadeInSection>

            </div>
        </div>
    );
};

// --- Sub-components ---

const SectionTitle = ({ icon, title }) => {
    const colorMap = {
        blue: 'bg-blue-600',
        purple: 'bg-purple-600',
        green: 'bg-green-600',
        yellow: 'bg-yellow-600',
    };

    return (
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-4">
            <span className={`w-12 h-1.5 ${colorMap[icon] || 'bg-gray-500'} rounded-full`} />
            {title}
        </h2>
    );
};

const FadeInSection = ({ children, className, id }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setIsVisible(entry.isIntersecting));
        });
        if (domRef.current) observer.observe(domRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id={id}
            ref={domRef}
            className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'} ${className}`}
        >
            {children}
        </section>
    );
};

const HobbyCard = ({ icon, label, desc, color }) => (
    <div className="relative group p-6 bg-gray-50 dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-white/5 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-default">
        <div className={`absolute top-0 right-0 p-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${color.split(' ')[0]}`} />

        <div className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
            {icon}
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{label}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
    </div>
);

const BucketItem = ({ done, label }) => {
    const [checked, setChecked] = useState(done);
    // Allow interactivity just for fun
    return (
        <div
            onClick={() => setChecked(!checked)}
            className={`cursor-pointer group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${checked ? 'bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800' : 'bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'}`}
        >
            <div className={`relative flex-shrink-0 transition-transform duration-300 ${checked ? 'scale-110' : 'group-hover:scale-110'}`}>
                {checked ? <CheckCircle2 className="text-green-500" /> : <Circle className="text-gray-400" />}
            </div>
            <span className={`${checked ? 'text-gray-900 dark:text-white font-medium line-through decoration-green-500/50 decoration-2' : 'text-gray-600 dark:text-gray-400'}`}>
                {label}
            </span>
        </div>
    );
};

const ToolCategory = ({ title, items }) => (
    <div className="bg-gray-50 dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-white/5 p-8 hover:border-blue-500/30 transition-colors duration-500">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            {title === "Hardware" ? <Laptop size={20} /> : <Code size={20} />}
            {title}
        </h3>
        <ul className="space-y-4">
            {items.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-600 dark:text-gray-400 group">
                    <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-600 rounded-full group-hover:bg-blue-500 group-hover:scale-150 transition-all" />
                    <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{item}</span>
                </li>
            ))}
        </ul>
    </div>
);

const SocialButton = ({ href, icon, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 dark:bg-white/5 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
    >
        {icon}
        {label}
        <ArrowUpRight size={14} />
    </a>
);
