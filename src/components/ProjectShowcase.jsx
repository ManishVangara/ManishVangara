import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { allProjects } from '../data/projects';

const projects = allProjects.slice(0, 4);
const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80";

export const ProjectShowcase = () => {
    const [activeProject, setActiveProject] = useState(0);
    const projectRefs = useRef([]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -20% 0px",
            threshold: 0.5
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = parseInt(entry.target.getAttribute('data-index'));
                    setActiveProject(index);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        projectRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    if (!projects || projects.length === 0) return null;

    const currentProject = projects[activeProject] || projects[0];

    return (
        <section id="projects" className="py-24 bg-gray-50 dark:bg-zinc-900/30 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white capitalize mb-4">
                        Featured <span className="text-blue-600 dark:text-blue-400">Projects</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                        A selection of data-driven solutions and intelligent systems I've engineered.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">

                    {/* Left Column - Scrolling Images */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-12 lg:gap-24">
                        {projects.map((project, index) => (
                            <div
                                key={project.id}
                                ref={el => projectRefs.current[index] = el}
                                data-index={index}
                                className={`group transition-all duration-500 ${index === activeProject
                                    ? 'opacity-100 scale-100 blur-0'
                                    : 'opacity-40 scale-95 blur-sm'
                                    }`}
                            >
                                {/* Image Container */}
                                <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10 relative h-[400px] lg:h-[500px]">
                                    <Link to={`/projects/${project.id}`}>
                                        <img
                                            src={project.image || PLACEHOLDER_IMAGE}
                                            alt={project.title || 'Project Image'}
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        {/* Overlay */}
                                        <div className={`absolute inset-0 transition-colors duration-300 ${index === activeProject ? 'bg-black/20 group-hover:bg-black/10' : 'bg-black/40'}`} />

                                        <div className="absolute bottom-6 right-6">
                                            <div className="bg-black/60 backdrop-blur-md text-white p-3 rounded-full hover:bg-blue-600 transition-colors">
                                                <ArrowUpRight size={20} />
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                                {/* Mobile Only: Project Details (Interleaved) */}
                                <div className="lg:hidden mt-6 space-y-4">
                                    <span className="text-blue-600 dark:text-blue-400 font-medium tracking-wide text-sm uppercase">
                                        {project.category || 'Project'}
                                    </span>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        <Link to={`/projects/${project.id}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                            {project.title}
                                        </Link>
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech?.map((t) => (
                                            <span key={t} className="px-2 py-1 text-xs bg-white dark:bg-zinc-800 border border-gray-200 dark:border-white/10 rounded-full text-gray-700 dark:text-gray-300">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="pt-2">
                                        <Link to={`/projects/${project.id}`} className="text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:gap-2 transition-all">
                                            View Details <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column - Sticky Details (Desktop Only) */}
                    <div className="hidden lg:flex w-1/2 h-screen sticky top-0 items-start pt-32">
                        {/* We maintain a key based on activeProject to trigger animations/transitions if needed, 
                or just let React reconcile the DOM updates for smooth text transitions. */}
                        {currentProject && (
                            <div key={activeProject} className="space-y-8 p-6 animate-fadeInUp">
                                <div className="relative">
                                    {/* Progress Bar & Counter */}
                                    <div className="flex items-center gap-4 mb-8">
                                        <span className="text-4xl font-light text-blue-600 dark:text-blue-400">
                                            0{activeProject + 1}
                                        </span>
                                        <div className="h-px bg-gray-200 dark:bg-zinc-700 flex-1 relative">
                                            <div
                                                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 dark:bg-blue-400 transition-all duration-500"
                                                style={{ width: `${((activeProject + 1) / projects.length) * 100}%` }}
                                            />
                                        </div>
                                        <span className="text-xl font-light text-gray-400">
                                            0{projects.length}
                                        </span>
                                    </div>

                                    <span className="text-blue-600 dark:text-blue-400 font-bold tracking-wider text-sm uppercase mb-2 block">
                                        {currentProject.category || 'Project'}
                                    </span>
                                    <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                                        <Link to={`/projects/${currentProject.id}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                            {currentProject.title || 'Untitled Project'}
                                        </Link>
                                    </h3>
                                    <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {currentProject.description || 'No description available.'}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    {currentProject.tech?.map((t) => (
                                        <span key={t} className="px-4 py-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-white/10 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-6 pt-4">
                                    <Link to={`/projects/${currentProject.id}`} className="flex items-center gap-2 text-gray-900 dark:text-white font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-lg">
                                        <ArrowUpRight size={24} />
                                        View Project Details
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* See All Projects Button */}
                <div className="mt-20 flex justify-center">
                    <Link to="/projects" className="px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 shadow-xl shadow-blue-500/10 hover:shadow-blue-500/20 flex items-center gap-3">
                        See All Projects
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
};
