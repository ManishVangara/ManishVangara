import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Heart, ArrowUp } from 'lucide-react';
import { profile } from '../data/profile';

export const Footer = () => {
    const year = new Date().getFullYear();
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const onScroll = () => setShowBackToTop(window.scrollY > 600);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const links = [
        { label: 'Projects', to: '/projects' },
        { label: 'About', to: '/about' },
        { label: 'Journey', to: '/#experience' },
        { label: 'Blog', to: '/blogs' },
        { label: 'Connect', to: '/#connect' },
    ];

    const socials = [
        { icon: Github, href: profile.socials?.github },
        { icon: Linkedin, href: profile.socials?.linkedin },
        { icon: Twitter, href: profile.socials?.twitter },
    ].filter(s => s.href);

    return (
        <>
            <footer className="relative">
                {/* Gradient top border */}
                <div className="h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />

                <div className="max-w-6xl mx-auto px-6 py-12">
                    <div className="grid sm:grid-cols-3 gap-8 mb-10">
                        {/* Brand */}
                        <div>
                            <Link to="/" className="inline-block text-xl font-heading font-bold text-white mb-3">
                                {profile.name.split(' ')[0]}<span className="text-brand-blue">.</span>
                            </Link>
                            <p className="text-xs text-zinc-600 leading-relaxed max-w-[200px]">
                                Data Engineer & ML Systems Architect based in Seattle, WA.
                            </p>
                        </div>

                        {/* Sitemap */}
                        <div>
                            <h4 className="text-xs text-zinc-500 uppercase tracking-wider mb-4">Navigation</h4>
                            <nav className="space-y-2">
                                {links.map((link) => (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        className="block text-sm text-zinc-500 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Socials */}
                        <div>
                            <h4 className="text-xs text-zinc-500 uppercase tracking-wider mb-4">Connect</h4>
                            <div className="flex gap-3">
                                {socials.map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg text-zinc-600 hover:text-white hover:bg-white/5 transition-all"
                                    >
                                        <social.icon size={18} />
                                    </a>
                                ))}
                            </div>
                            {profile.resume && (
                                <a
                                    href={profile.resume}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-4 text-xs text-brand-blue hover:text-blue-300 transition-colors"
                                >
                                    Download Resume →
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-zinc-700">
                            © {year} {profile.name}. All rights reserved.
                        </p>
                        <p className="text-xs text-zinc-700 inline-flex items-center gap-1">
                            Built with <Heart size={10} className="text-red-400" style={{ animation: 'pulseGlow 2s ease-in-out infinite' }} /> React + Tailwind CSS
                        </p>
                    </div>
                </div>
            </footer>

            {/* Back to top button */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-6 right-6 z-40 p-3 rounded-full glass-nav shadow-lg shadow-black/20 text-zinc-400 hover:text-white transition-all duration-300 ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
                aria-label="Back to top"
            >
                <ArrowUp size={16} />
            </button>
        </>
    );
};
