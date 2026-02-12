import React, { useEffect, useRef, useState, useCallback } from 'react';
import { profile } from '../data/profile';
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin, Mouse } from 'lucide-react';

// Animated 3D wireframe orb using Canvas — with mouse parallax & multi-color gradient
const WireframeOrb = ({ mouseX, mouseY }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
        };
        resize();

        let animFrame;
        let time = 0;

        const draw = () => {
            const w = canvas.width / dpr;
            const h = canvas.height / dpr;
            const cx = w / 2 + (mouseX.current || 0) * 12;
            const cy = h / 2 + (mouseY.current || 0) * 8;
            const r = Math.min(w, h) * 0.38;

            ctx.clearRect(0, 0, w, h);

            const meridians = 14;
            const parallels = 9;
            const rotSpeed = 0.0006;

            // Multi-color gradient across meridians
            const colors = [
                [59, 130, 246],   // blue
                [99, 102, 241],   // indigo
                [139, 92, 246],   // purple
                [6, 182, 212],    // cyan
                [59, 130, 246],   // back to blue
            ];

            const getColor = (t, alpha) => {
                const idx = t * (colors.length - 1);
                const i = Math.floor(idx);
                const f = idx - i;
                const c1 = colors[Math.min(i, colors.length - 1)];
                const c2 = colors[Math.min(i + 1, colors.length - 1)];
                const r = c1[0] + (c2[0] - c1[0]) * f;
                const g = c1[1] + (c2[1] - c1[1]) * f;
                const b = c1[2] + (c2[2] - c1[2]) * f;
                return `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${alpha})`;
            };

            // Glow
            ctx.shadowColor = '#6366F1';
            ctx.shadowBlur = 25;

            // Meridians (vertical lines) — multi-color
            for (let i = 0; i < meridians; i++) {
                const angle = (i / meridians) * Math.PI + time * rotSpeed;
                const colorT = i / meridians;
                ctx.beginPath();
                ctx.strokeStyle = getColor(colorT, 0.15 + 0.1 * Math.sin(angle));
                ctx.lineWidth = 0.8;
                for (let j = 0; j <= 60; j++) {
                    const phi = (j / 60) * Math.PI * 2;
                    const x = cx + r * Math.sin(phi) * Math.cos(angle);
                    const y = cy + r * Math.cos(phi);
                    if (j === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }

            // Parallels (horizontal rings)
            for (let i = 1; i < parallels; i++) {
                const phi = (i / parallels) * Math.PI;
                const ringR = r * Math.sin(phi);
                const ringY = cy + r * Math.cos(phi);
                const colorT = i / parallels;
                ctx.beginPath();
                ctx.strokeStyle = getColor(colorT, 0.1 + 0.05 * Math.sin(phi + time * 0.001));
                ctx.lineWidth = 0.6;
                ctx.ellipse(cx, ringY, ringR, ringR * 0.3, 0, 0, Math.PI * 2);
                ctx.stroke();
            }

            // Floating nodes on the sphere — multi-color
            ctx.shadowBlur = 10;
            for (let i = 0; i < 35; i++) {
                const theta = (i * 2.399) + time * 0.0003;
                const phi = Math.acos(1 - 2 * (i + 0.5) / 35);
                const x = cx + r * Math.sin(phi) * Math.cos(theta);
                const y = cy + r * Math.cos(phi);
                const z = Math.sin(phi) * Math.sin(theta);

                const alpha = 0.3 + 0.5 * (z + 1) / 2;
                const dotR = 1.5 + 1 * (z + 1) / 2;
                const colorT = (i / 35 + time * 0.0001) % 1;

                ctx.beginPath();
                ctx.fillStyle = getColor(colorT, alpha);
                ctx.arc(x, y, dotR, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.shadowBlur = 0;
            time++;
            animFrame = requestAnimationFrame(draw);
        };

        draw();
        window.addEventListener('resize', resize);
        return () => {
            cancelAnimationFrame(animFrame);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ width: '100%', height: '100%' }}
        />
    );
};

// Ambient floating particles around the orb
const FloatingParticles = () => {
    const particles = [
        { size: 3, x: '15%', y: '20%', delay: '0s', dur: '6s' },
        { size: 2, x: '80%', y: '15%', delay: '1s', dur: '7s' },
        { size: 4, x: '70%', y: '75%', delay: '2s', dur: '5s' },
        { size: 2, x: '25%', y: '80%', delay: '0.5s', dur: '8s' },
        { size: 3, x: '90%', y: '45%', delay: '1.5s', dur: '6.5s' },
        { size: 2, x: '10%', y: '55%', delay: '3s', dur: '7.5s' },
    ];

    return (
        <>
            {particles.map((p, i) => (
                <div
                    key={i}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: p.x,
                        top: p.y,
                        background: i % 2 === 0
                            ? 'rgba(59, 130, 246, 0.4)'
                            : 'rgba(139, 92, 246, 0.4)',
                        animation: `float ${p.dur} ease-in-out infinite`,
                        animationDelay: p.delay,
                        boxShadow: i % 2 === 0
                            ? '0 0 8px rgba(59, 130, 246, 0.3)'
                            : '0 0 8px rgba(139, 92, 246, 0.3)',
                    }}
                />
            ))}
        </>
    );
};

// Animated text loop for roles
const TextLoop = ({ texts, interval = 3000 }) => {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setIndex((i) => (i + 1) % texts.length);
                setFade(true);
            }, 400);
        }, interval);
        return () => clearInterval(timer);
    }, [texts, interval]);

    return (
        <span
            className={`transition-all duration-400 inline-block ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
        >
            {texts[index]}
        </span>
    );
};

// Staggered reveal wrapper
const StaggerItem = ({ children, delay = 0 }) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <div
            className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
        >
            {children}
        </div>
    );
};

export const Hero = () => {
    const roles = profile.hero?.roles || ['Data Analyst', 'Data Engineer', 'Data Scientist'];
    const mouseX = useRef(0);
    const mouseY = useRef(0);

    const handleMouseMove = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.current = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouseY.current = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    }, []);

    return (
        <section
            className="relative min-h-screen flex items-center overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* Radial glow behind orb — enlarged and multi-color */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none">
                <div className="absolute inset-0 bg-brand-blue/5 rounded-full blur-[150px]" />
                <div className="absolute inset-12 bg-brand-purple/4 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-4 items-center min-h-screen py-32">

                    {/* Left — Text Content */}
                    <div className="space-y-8 lg:pr-8">
                        <StaggerItem delay={200}>
                            <p className="text-sm font-mono text-zinc-500 tracking-widest uppercase">
                                Portfolio / 2025
                            </p>
                        </StaggerItem>

                        <StaggerItem delay={400}>
                            <h1 className="section-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-[0.95]">
                                {profile.name.split(' ')[0]}
                                <br />
                                <span className="text-gradient">{profile.name.split(' ').slice(1).join(' ')}</span>
                            </h1>
                        </StaggerItem>

                        <StaggerItem delay={600}>
                            <p className="text-xl sm:text-2xl text-zinc-400 font-light max-w-lg leading-relaxed">
                                <TextLoop texts={roles} interval={3000} />
                            </p>
                        </StaggerItem>

                        <StaggerItem delay={750}>
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                                    <MapPin size={12} />
                                    <span>Seattle, WA — Open to opportunities</span>
                                </div>
                            </div>
                        </StaggerItem>

                        <StaggerItem delay={900}>
                            <p className="text-base text-zinc-500 max-w-md leading-relaxed">
                                {profile.hero?.tagline || 'Building data pipelines and ML systems that turn complex data into actionable intelligence.'}
                            </p>
                        </StaggerItem>

                        <StaggerItem delay={1100}>
                            <div className="flex flex-wrap gap-3 pt-2">
                                <a
                                    href="#projects"
                                    className="glass-button inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white group"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    View Projects
                                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                </a>
                                {profile.resume && (
                                    <a
                                        href={profile.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-zinc-400 border border-white/10 hover:border-white/20 hover:text-white transition-all duration-300"
                                    >
                                        <Download size={16} />
                                        Download CV
                                    </a>
                                )}
                            </div>
                        </StaggerItem>

                        <StaggerItem delay={1300}>
                            <div className="flex items-center gap-4 pt-4">
                                <span className="text-xs text-zinc-600 uppercase tracking-wider">Find me on</span>
                                <div className="h-px flex-1 bg-white/5 max-w-[60px]" />
                                {profile.socials?.github && (
                                    <a href={profile.socials.github} target="_blank" rel="noopener noreferrer"
                                        className="text-zinc-500 hover:text-white transition-colors duration-300">
                                        <Github size={18} />
                                    </a>
                                )}
                                {profile.socials?.linkedin && (
                                    <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer"
                                        className="text-zinc-500 hover:text-white transition-colors duration-300">
                                        <Linkedin size={18} />
                                    </a>
                                )}
                                {profile.email && (
                                    <a href={`mailto:${profile.email}`}
                                        className="text-zinc-500 hover:text-white transition-colors duration-300">
                                        <Mail size={18} />
                                    </a>
                                )}
                            </div>
                        </StaggerItem>
                    </div>

                    {/* Right — 3D Wireframe Orb with particles */}
                    <div className="relative hidden lg:flex items-center justify-center">
                        <div className="w-[480px] h-[480px] xl:w-[560px] xl:h-[560px] relative">
                            <WireframeOrb mouseX={mouseX} mouseY={mouseY} />
                            <FloatingParticles />
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator — improved with mouse icon */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group">
                <span className="text-[10px] text-zinc-600 tracking-wider uppercase group-hover:text-zinc-400 transition-colors">
                    Scroll to explore
                </span>
                <div className="w-5 h-8 rounded-full border border-zinc-700 flex justify-center pt-1.5 group-hover:border-zinc-500 transition-colors">
                    <div className="w-0.5 h-2 bg-zinc-500 rounded-full animate-bounce" />
                </div>
            </div>
        </section>
    );
};
