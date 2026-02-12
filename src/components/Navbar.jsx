import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Sun, Moon, Menu, X,
    ChevronDown
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'About', path: '/about' },
    { label: 'Journey', path: '/#experience' },
    { label: 'Blogs', path: '/blogs' },
    { label: 'Connect', path: '/#connect' },
];

const moreItems = [
    { label: 'Skills', path: '/#skills' },
    { label: 'Certifications', path: '/#certifications' },
    { label: 'Lessons', path: '/#lessons' },
];

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const moreRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (moreRef.current && !moreRef.current.contains(e.target)) {
                setIsMoreOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleNavClick = (path) => {
        setIsMenuOpen(false);
        setIsMoreOpen(false);
        if (path.startsWith('/#')) {
            const hash = path.slice(1);
            if (location.pathname !== '/') {
                navigate('/' + hash);
            } else {
                const el = document.querySelector(hash);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        if (path.startsWith('/#')) return location.hash === path.slice(1);
        return location.pathname.startsWith(path);
    };

    return (
        <>
            {/* Desktop Navbar */}
            <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${scrolled ? 'top-3' : 'top-5'}`}>
                <div className="hidden md:flex items-center gap-1 glass-nav rounded-full px-2 py-1.5 shadow-lg shadow-black/20">

                    {/* Available for work badge */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 mr-1">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-medium text-zinc-400">Available</span>
                    </div>

                    <div className="w-px h-4 bg-white/10 mx-1"></div>

                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={(e) => {
                                if (item.path.startsWith('/#')) {
                                    e.preventDefault();
                                    handleNavClick(item.path);
                                }
                            }}
                            className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${isActive(item.path)
                                    ? 'bg-white/10 text-white'
                                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}

                    {/* More dropdown */}
                    <div ref={moreRef} className="relative">
                        <button
                            onClick={() => setIsMoreOpen(!isMoreOpen)}
                            className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${isMoreOpen ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            More
                            <ChevronDown size={14} className={`transition-transform duration-300 ${isMoreOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isMoreOpen && (
                            <div className="absolute top-full right-0 mt-2 glass-nav rounded-xl py-1 min-w-[160px] shadow-xl shadow-black/30">
                                {moreItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavClick(item.path);
                                        }}
                                        className="block px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="w-px h-4 bg-white/10 mx-1"></div>

                    {/* Theme toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-300"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Navbar */}
            <nav className="md:hidden fixed top-0 left-0 right-0 z-50">
                <div className={`flex items-center justify-between px-4 py-3 transition-all duration-300 ${scrolled ? 'glass-nav' : 'bg-transparent'
                    }`}>
                    <Link to="/" className="text-lg font-heading font-bold text-white">
                        MV<span className="text-brand-blue">.</span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-zinc-400 hover:text-white transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-full text-zinc-400 hover:text-white transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu overlay */}
                {isMenuOpen && (
                    <div className="fixed inset-0 top-[56px] bg-brand-bg/95 backdrop-blur-xl z-40">
                        <div className="flex flex-col px-6 py-8 space-y-1">
                            {/* Available badge mobile */}
                            <div className="flex items-center gap-2 px-4 py-3 mb-4">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-sm text-green-400 font-medium">Available for work</span>
                            </div>

                            {[...navItems, ...moreItems].map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={(e) => {
                                        if (item.path.startsWith('/#')) {
                                            e.preventDefault();
                                        }
                                        handleNavClick(item.path);
                                    }}
                                    className={`px-4 py-3 rounded-xl text-lg font-medium transition-all duration-300 ${isActive(item.path)
                                            ? 'bg-white/10 text-white'
                                            : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};
