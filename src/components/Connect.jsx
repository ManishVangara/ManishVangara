
import React, { useState } from 'react';
import { Mail, Github, Linkedin, Twitter, ArrowRight, Send, Check, Copy } from 'lucide-react';

export const Connect = () => {
    const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success
    const [copied, setCopied] = useState(false);
    const [activeTopic, setActiveTopic] = useState(null);
    const [message, setMessage] = useState('');

    const topics = [
        { id: 'project', label: 'Start a Project', emoji: '🚀' },
        { id: 'ai', label: 'Discuss AI', emoji: '🤖' },
        { id: 'react', label: 'React / Next.js', emoji: '⚛️' },
        { id: 'coffee', label: 'Grab a Coffee', emoji: '☕' }
    ];

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('manish.vangara@example.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleTopicClick = (topic) => {
        setActiveTopic(topic.id);
        const starters = {
            project: "Hi Manish, I have a project idea involving...",
            ai: "Hey, I'd love to chat about the latest in AI...",
            react: "Hi, I noticed your work with React and wanted to ask...",
            coffee: "Hi, are you free for a coffee chat near SF?"
        };
        setMessage(starters[topic.id] || "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('sending');
        // Simulate sending
        setTimeout(() => {
            setFormStatus('success');
            setTimeout(() => {
                setFormStatus('idle');
                setMessage('');
                setActiveTopic(null);
            }, 3000);
        }, 1500);
    };

    return (
        <section id="contact" className="py-24 bg-white dark:bg-black relative overflow-hidden">
            {/* Background Grids */}
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left Column: Info */}
                    <div className="space-y-10">
                        <div>
                            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                                Let's build something <br />
                                <span className="text-blue-600 dark:text-blue-400">extraordinary.</span>
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-lg mb-8">
                                Whether you have a groundbreaking idea or just want to talk tech, I'm all ears. Currently based in
                                <span className="font-semibold text-gray-900 dark:text-white"> San Francisco</span> & open to global collaborations.
                            </p>

                            {/* Conversation Starters */}
                            <div className="flex flex-wrap gap-3">
                                {topics.map((topic) => (
                                    <button
                                        key={topic.id}
                                        onClick={() => handleTopicClick(topic)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeTopic === topic.id
                                                ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/25'
                                                : 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400'
                                            }`}
                                    >
                                        <span className="mr-2">{topic.emoji}</span>
                                        {topic.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Email Copy Component */}
                            <div
                                onClick={handleCopyEmail}
                                className="group cursor-pointer inline-flex items-center gap-4 bg-white dark:bg-zinc-900 p-2 pr-6 rounded-full border border-gray-200 dark:border-white/10 hover:border-blue-500/30 transition-all duration-300"
                            >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${copied ? 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400' : 'bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-600 dark:group-hover:bg-blue-500/20 dark:group-hover:text-blue-400'}`}>
                                    {copied ? <Check size={20} /> : <Mail size={20} />}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                                        {copied ? "Copied to clipboard!" : "Drop me an email"}
                                    </span>
                                    <span className="text-base font-semibold text-gray-900 dark:text-white">
                                        manish.vangara@example.com
                                    </span>
                                </div>
                                <Copy size={16} className={`ml-auto text-gray-400 group-hover:text-blue-500 transition-colors ${copied ? 'opacity-0' : 'opacity-100'}`} />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <SocialIcon href="https://github.com" icon={<Github size={24} />} />
                                <SocialIcon href="https://linkedin.com" icon={<Linkedin size={24} />} />
                                <SocialIcon href="https://twitter.com" icon={<Twitter size={24} />} />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="bg-white/80 dark:bg-zinc-900/50 backdrop-blur-2xl p-8 md:p-10 rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl shadow-gray-200/50 dark:shadow-black/50">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    What should I call you?
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Where can I reach you?
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    How can I help?
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    required
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none placeholder:text-gray-400 dark:placeholder:text-gray-600"
                                    placeholder="Tell me about your project, goals, or just say hi..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={formStatus === 'sending' || formStatus === 'success'}
                                className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-95 ${formStatus === 'success'
                                        ? 'bg-green-500 hover:bg-green-600'
                                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-500/25'
                                    }`}
                            >
                                {formStatus === 'idle' && (
                                    <>Send Message <Send size={18} /></>
                                )}
                                {formStatus === 'sending' && (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                )}
                                {formStatus === 'success' && (
                                    <>Message Sent! <Check size={18} /></>
                                )}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

const SocialLink = ({ href, icon, label, isEmail }) => (
    <a
        href={href}
        className="flex items-center gap-4 text-lg font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
    >
        <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-500/10 transition-colors">
            {icon}
        </div>
        {label}
        {isEmail && <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />}
    </a>
);

const SocialIcon = ({ href, icon }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
    >
        {icon}
    </a>
);
