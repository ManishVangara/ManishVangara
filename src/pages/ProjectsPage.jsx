import { useState } from 'react';
import { ExternalLink, Github, Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import { allProjects } from '../data/projects';

const categories = ["All", "Generative AI", "Machine Learning", "Data Engineering", "Computer Vision", "NLP", "Full Stack"];


export const ProjectsPage = () => {
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");

    const filteredProjects = allProjects.filter(project => {
        const matchesCategory = filter === "All" || project.category === filter;
        const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) ||
            project.description.toLowerCase().includes(search.toLowerCase()) ||
            project.tech.some(t => t.toLowerCase().includes(search.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen pt-24 pb-16 px-6 max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <Link to="/" className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-4">
                        <ArrowLeft size={20} />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                        All <span className="text-blue-600 dark:text-blue-400">Projects</span>
                    </h1>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search projects, tech..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-white/5 border border-transparent focus:border-blue-500 rounded-full text-gray-900 dark:text-white outline-none transition-all placeholder:text-gray-500"
                    />
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-12">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                            : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map(project => (
                    <div key={project.id} className="group bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl dark:hover:shadow-blue-900/10 flex flex-col h-full">
                        {/* Image */}
                        <div className="h-48 overflow-hidden relative">
                            <Link to={`/projects/${project.id}`} className="block h-full w-full">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </Link>
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                <a href={project.github} className="p-2 bg-white rounded-full hover:scale-110 transition-transform text-black" title="View Code">
                                    <Github size={20} />
                                </a>
                                <a href={project.live} className="p-2 bg-white rounded-full hover:scale-110 transition-transform text-black" title="Live Demo">
                                    <ExternalLink size={20} />
                                </a>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-grow">
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
                                {project.category}
                            </span>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                <Link to={`/projects/${project.id}`}>
                                    {project.title}
                                </Link>
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3">
                                {project.description}
                            </p>

                            <div className="mt-auto flex flex-wrap gap-2">
                                {project.tech.map(t => (
                                    <span key={t} className="px-2 py-1 bg-gray-100 dark:bg-white/5 text-xs font-medium text-gray-600 dark:text-gray-300 rounded-md">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProjects.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-gray-500 dark:text-gray-400 text-lg">No projects found matching your criteria.</p>
                    <button
                        onClick={() => { setFilter("All"); setSearch(""); }}
                        className="mt-4 text-blue-600 dark:text-blue-400 font-medium hover:underline"
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    );
};
