
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogs } from '../data/blogs';
import { ArrowLeft, Calendar, Clock, Tag, Share2, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

export const BlogPost = () => {
    const { id } = useParams();
    const blog = blogs.find(b => b.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F3F0E6] dark:bg-black">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post not found</h2>
                    <Link to="/blogs" className="text-blue-600 hover:text-blue-500 font-medium flex items-center gap-2 justify-center">
                        <ArrowLeft size={16} /> Back to Blogs
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-[#F3F0E6] dark:bg-black pt-32 pb-24">

            {/* Reading Progress Bar (Optional enhancement could go here) */}

            {/* Header Section */}
            <div className="max-w-4xl mx-auto px-6 mb-12">
                <Link to="/blogs" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors mb-8 group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to all posts
                </Link>

                <div className="flex flex-wrap gap-4 mb-6">
                    {blog.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium border border-blue-100 dark:border-blue-500/20">
                            {tag}
                        </span>
                    ))}
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6 tracking-tight">
                    {blog.title}
                </h1>

                <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/10 pb-8">
                    <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-zinc-800 overflow-hidden">
                                <img src="https://ui-avatars.com/api/?name=Manish+Vangara&background=0D8ABC&color=fff" alt="Manish Vangara" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Manish Vangara</p>
                                <div className="flex items-center gap-3 text-xs opacity-80">
                                    <span className="flex items-center gap-1"><Calendar size={12} /> {blog.date}</span>
                                    <span className="flex items-center gap-1"><Clock size={12} /> {blog.readTime}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Share Actions */}
                    <div className="flex items-center gap-3">
                        <button className="p-2 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
                            <Linkedin size={20} />
                        </button>
                        <button className="p-2 rounded-full text-gray-400 hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all">
                            <Twitter size={20} />
                        </button>
                        <button className="p-2 rounded-full text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all">
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Featured Image */}
            <div className="max-w-5xl mx-auto px-6 mb-16">
                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Content Body */}
            <div className="max-w-3xl mx-auto px-6">
                <div
                    className="prose prose-lg dark:prose-invert prose-blue max-w-none 
                    prose-headings:font-bold prose-headings:tracking-tight 
                    prose-p:leading-relaxed prose-p:text-gray-600 dark:prose-p:text-gray-300
                    prose-li:text-gray-600 dark:prose-li:text-gray-300
                    prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50/50 dark:prose-blockquote:bg-blue-900/10 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                    prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:bg-blue-50 dark:prose-code:bg-blue-900/20 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-normal
                    prose-pre:bg-gray-900 dark:prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-gray-800 dark:prose-pre:border-white/10 prose-pre:shadow-xl
                    img:rounded-xl"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Footer / CTA */}
                <div className="mt-20 pt-10 border-t border-gray-100 dark:border-white/10 text-center">
                    <p className="text-gray-500 dark:text-gray-400 mb-6 italic">
                        Enjoyed this post? Check out the original version on Medium.
                    </p>
                    <a
                        href={blog.mediumUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold hover:opacity-80 transition-opacity"
                    >
                        Read on Medium <ArrowUpRight size={18} />
                    </a>
                </div>
            </div>
        </article>
    );
};
