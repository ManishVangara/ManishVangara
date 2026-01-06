import { useState, useEffect } from 'react';
import { Github, Linkedin, Moon, Sun, Menu, X, ChevronDown } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { Link, useLocation } from 'react-router-dom';
import { profile } from '../data/profile';

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/projects' },
        { name: 'About', path: '/about' },

        { name: 'Journey', path: '/#experience' },
        { name: 'Blogs', path: '/blogs' },
        { name: 'Connect', path: '/#contact' },
    ];

    const moreLinks = [
        { name: 'Bucketlist', href: '/about#bucketlist' },
        { name: 'Certifications', href: '#certifications' },
        { name: 'Lessons', href: '#lessons' },
        { name: 'Hobbies', href: '/about#hobbies' },
    ];

    const isLinkActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <>
            {/* Top Bar - Logo and Socials */}
            <div className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-start pointer-events-none">
                {/* Logo */}
                <div className="pointer-events-auto">
                    <Link to="/" className="font-bold text-xl tracking-tighter text-gray-900 dark:text-white drop-shadow-lg transition-colors duration-300">
                        {profile.logoText}<span className="text-blue-500">.</span>
                    </Link>
                </div>

                {/* Socials & Theme Toggle (Desktop) */}
                <div className="hidden md:flex items-center gap-4 pointer-events-auto bg-white/50 dark:bg-black/20 backdrop-blur-md p-2 rounded-full border border-gray-200 dark:border-white/10 transition-colors duration-300">
                    <SocialLink href={profile.socials.github} icon={<Github size={20} />} label="GitHub" />
                    <SocialLink href={profile.socials.linkedin} icon={<Linkedin size={20} />} label="LinkedIn" />
                    <div className="w-px h-6 bg-gray-300 dark:bg-white/20 mx-1" />
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden pointer-events-auto">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 rounded-full bg-white/50 dark:bg-black/20 backdrop-blur-md border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white transition-colors duration-300"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Floating Center Navigation (Desktop) */}
            <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center px-2 py-2 rounded-full border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-xl transition-all duration-300 ${scrolled ? 'shadow-2xl shadow-blue-500/10' : ''}`}>
                <ul className="flex items-center gap-1">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            {link.path.startsWith('/') ? (
                                <Link
                                    to={link.path}
                                    className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 ${isLinkActive(link.path) ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/10' : 'text-gray-600 dark:text-gray-400'}`}
                                >
                                    {link.name}
                                </Link>
                            ) : (
                                <a
                                    href={link.path}
                                    className="relative px-5 py-2 rounded-full text-sm font-medium text-gray-600 dark:text-gray-400 transition-all duration-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
                                >
                                    {link.name}
                                </a>
                            )}
                        </li>
                    ))}

                    {/* Desktop Dropdown */}
                    <li className="relative group">
                        <button className="flex items-center gap-1 px-5 py-2 rounded-full text-sm font-medium text-gray-600 dark:text-gray-400 transition-all duration-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 group-hover:text-black dark:group-hover:text-white group-hover:bg-black/5 dark:group-hover:bg-white/10">
                            More <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
                        </button>

                        {/* Dropdown Menu */}
                        <div className="absolute top-full right-0 mt-2 w-48 py-2 bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                            {moreLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </li>
                </ul>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-30 bg-white/95 dark:bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-6 md:hidden overflow-y-auto transition-colors duration-300">
                    {navLinks.map((link) => (
                        link.path.startsWith('/') ? (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-2xl font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ) : (
                            <a
                                key={link.name}
                                href={link.path}
                                className="text-2xl font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        )
                    ))}

                    {/* Mobile More Section */}
                    <div className="flex flex-col items-center gap-4 w-full">
                        <button
                            onClick={() => setIsMoreOpen(!isMoreOpen)}
                            className="flex items-center gap-2 text-2xl font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                        >
                            More <ChevronDown size={20} className={`transition-transform duration-300 ${isMoreOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isMoreOpen && (
                            <div className="flex flex-col items-center gap-4 bg-black/5 dark:bg-white/5 w-full py-4 backdrop-blur-sm">
                                {moreLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-lg text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-6 mt-8">
                        <SocialLink href={profile.socials.github} icon={<Github size={24} />} label="GitHub" />
                        <SocialLink href={profile.socials.linkedin} icon={<Linkedin size={24} />} label="LinkedIn" />
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all"
                        >
                            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

const SocialLink = ({ href, icon, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all"
        aria-label={label}
    >
        {icon}
    </a>
);
