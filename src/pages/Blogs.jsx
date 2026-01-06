
import React from 'react';
import { blogs } from '../data/blogs';
import { ArrowUpRight, Calendar, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Blogs = () => {
    return (
        <div className="min-h-screen pt-32 px-6 pb-24 bg-gray-50 dark:bg-black">
            {/* Background Grids */}
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))] pointer-events-none fixed" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white tracking-tight">
                        My <span className="text-blue-600 dark:text-blue-400">Writings</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Thoughts on technology, engineering, and the future. Published on my site and Medium.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const BlogCard = ({ blog }) => {
    // If mediumUrl exists, use anchor tag to redirect. Else use React Router Link.
    const isExternal = !!blog.mediumUrl;
    const Component = isExternal ? 'a' : Link;
    const props = isExternal
        ? { href: blog.mediumUrl, target: "_blank", rel: "noopener noreferrer" }
        : { to: `/blogs/${blog.id}` };

    return (
        <Component
            {...props}
            className="group flex flex-col bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 h-full"
        >
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gray-200 dark:bg-zinc-800 animate-pulse" /> {/* Placeholder */}
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    onLoad={(e) => e.target.previousSibling.style.display = 'none'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-white font-medium border border-white/30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {isExternal ? "Read on Medium" : "Read Article"} <ArrowUpRight size={16} />
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-8 flex flex-col">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {blog.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {blog.readTime}
                    </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {blog.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {blog.excerpt}
                </p>

                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5 flex flex-wrap gap-2">
                    {blog.tags.map((tag, i) => (
                        <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-100 dark:bg-white/5 text-xs text-gray-600 dark:text-gray-400 font-medium group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                            <Tag size={10} />
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </Component>
    );
};
