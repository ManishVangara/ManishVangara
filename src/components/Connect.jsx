import React, { useState, useRef, useEffect } from 'react';
import { Send, Mail, Copy, Check, ArrowUpRight, Linkedin, Github, Twitter, Clock } from 'lucide-react';
import { profile } from '../data/profile';
import { QuoteBubble } from './QuoteBubble';

const topics = [
    { label: 'Data Analysis', icon: '📊' },
    { label: 'Data Engineering', icon: '🔧' },
    { label: 'Machine Learning', icon: '🤖' },
    { label: 'Collaboration', icon: '🤝' },
    { label: 'Freelance', icon: '💼' },
    { label: 'Just Saying Hi', icon: '👋' },
];

export const Connect = ({ quote }) => {
    const [formData, setFormData] = useState({ name: '', email: '', topic: '', message: '' });
    const [selectedTopic, setSelectedTopic] = useState('');
    const [status, setStatus] = useState('idle'); // idle | sending | sent | error
    const [copied, setCopied] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(profile.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setStatus('sent');
            setFormData({ name: '', email: '', topic: '', message: '' });
            setSelectedTopic('');
        } catch {
            setStatus('error');
        }
    };

    return (
        <section id="connect" ref={sectionRef} className="py-24 px-6 scroll-mt-20 relative">
            {/* Ambient glow behind heading */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none">
                <div className="absolute inset-0 bg-brand-blue/[0.04] rounded-full blur-[120px]" />
                <div className="absolute inset-16 bg-brand-purple/[0.03] rounded-full blur-[100px]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Big heading */}
                <div
                    className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                >
                    <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
                        Let's Build Something{' '}
                        <span className="text-gradient">Together</span>
                    </h2>
                    <p className="text-zinc-500 text-sm max-w-md mx-auto">
                        Have a project in mind, a data challenge to solve, or just want to chat? I'm all ears.
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Contact Form — with animated glow border */}
                    <div
                        className={`lg:col-span-3 glass-card-glow p-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                    >
                        {status === 'sent' ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
                                    <Check size={28} className="text-green-400" />
                                </div>
                                <h3 className="text-xl font-heading font-bold text-white mb-2">Message Sent!</h3>
                                <p className="text-sm text-zinc-500">I'll get back to you within 24 hours.</p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="mt-6 text-sm text-brand-blue hover:text-blue-300 transition-colors"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Topic chips with icons */}
                                <div>
                                    <label className="block text-xs text-zinc-500 uppercase tracking-wider mb-3">
                                        What's this about?
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {topics.map((topic) => (
                                            <button
                                                key={topic.label}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedTopic(topic.label);
                                                    setFormData(prev => ({ ...prev, topic: topic.label }));
                                                }}
                                                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 inline-flex items-center gap-1.5 ${selectedTopic === topic.label
                                                    ? 'bg-brand-blue/10 text-brand-blue border border-brand-blue/30 shadow-sm shadow-brand-blue/10'
                                                    : 'text-zinc-500 border border-white/5 hover:border-white/10 hover:text-white'
                                                    }`}
                                            >
                                                <span>{topic.icon}</span>
                                                {topic.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="relative">
                                        <label className="block text-xs text-zinc-500 uppercase tracking-wider mb-2">Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-white text-sm placeholder:text-zinc-700 focus:outline-none focus:border-brand-blue/30 focus:bg-white/[0.05] transition-all"
                                            placeholder="Your name"
                                            required
                                        />
                                    </div>
                                    <div className="relative">
                                        <label className="block text-xs text-zinc-500 uppercase tracking-wider mb-2">Email</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-white text-sm placeholder:text-zinc-700 focus:outline-none focus:border-brand-blue/30 focus:bg-white/[0.05] transition-all"
                                            placeholder="your@email.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs text-zinc-500 uppercase tracking-wider mb-2">Message</label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-white text-sm placeholder:text-zinc-700 focus:outline-none focus:border-brand-blue/30 focus:bg-white/[0.05] transition-all resize-none"
                                        placeholder="Tell me about your project or just say hi..."
                                        required
                                    />
                                </div>

                                <div className="flex flex-wrap items-center gap-4">
                                    <button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-sm font-medium text-white bg-gradient-to-r from-brand-blue to-brand-purple hover:shadow-lg hover:shadow-brand-blue/20 transition-all duration-300 disabled:opacity-50"
                                    >
                                        {status === 'sending' ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={16} />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                    {/* Response time badge */}
                                    <span className="inline-flex items-center gap-1.5 text-[11px] text-zinc-600">
                                        <Clock size={12} />
                                        Typical response: &lt; 24hrs
                                    </span>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div
                        className={`lg:col-span-2 space-y-4 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                    >
                        {/* Email card */}
                        <div className="glass-card p-5">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <Mail size={16} className="text-brand-blue" />
                                    <span className="text-xs text-zinc-500 uppercase tracking-wider">Email</span>
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
                                >
                                    {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                                </button>
                            </div>
                            <a
                                href={`mailto:${profile.email}`}
                                className="text-sm text-white hover:text-brand-blue transition-colors break-all"
                            >
                                {profile.email}
                            </a>
                        </div>

                        {/* Social links */}
                        {[
                            { icon: Linkedin, label: 'LinkedIn', href: profile.socials?.linkedin, handle: 'Connect on LinkedIn' },
                            { icon: Github, label: 'GitHub', href: profile.socials?.github, handle: 'View my code' },
                            { icon: Twitter, label: 'Twitter', href: profile.socials?.twitter, handle: 'Follow me' },
                        ]
                            .filter(s => s.href)
                            .map(social => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass-card p-5 flex items-center gap-4 group"
                                >
                                    <div className="p-2 rounded-xl bg-white/5 group-hover:bg-brand-blue/10 transition-colors">
                                        <social.icon size={18} className="text-zinc-400 group-hover:text-brand-blue transition-colors" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-white">{social.label}</p>
                                        <p className="text-xs text-zinc-600">{social.handle}</p>
                                    </div>
                                    <ArrowUpRight size={14} className="text-zinc-600 group-hover:text-brand-blue transition-colors" />
                                </a>
                            ))}
                    </div>
                </div>

                {quote && (
                    <div className="mt-16">
                        <QuoteBubble quote={quote} />
                    </div>
                )}
            </div>
        </section>
    );
};
