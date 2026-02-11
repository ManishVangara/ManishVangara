import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { allProjects } from '../data/projects';

export const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        const foundProject = allProjects.find(p => p.id === parseInt(id));
        setProject(foundProject);
    }, [id]);

    if (!project) {
        return <div className="min-h-screen pt-24 text-center">Loading or Project Not Found...</div>;
    }

    return (
        <div className="min-h-screen bg-[#F3F0E6] dark:bg-black transition-colors duration-300">
            {/* Header / Navigation */}
            <div className="fixed top-20 left-0 w-full z-10 px-6 pointer-events-none">
                <div className="max-w-7xl mx-auto pointer-events-auto">
                    <Link to="/projects" className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-black/80 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-full text-sm font-medium hover:bg-gray-100 dark:hover:bg-white/10 transition-all shadow-lg">
                        <ArrowLeft size={16} />
                        Back to Projects
                    </Link>
                </div>
            </div>

            {/* Content Area */}
            <div className="pt-32 pb-20 px-4 md:px-0 max-w-4xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                        {project.title}
                    </h1>
                    <div className="flex gap-2 mb-6 flex-wrap">
                        {project.tech.map((t, i) => (
                            <span key={t} className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                                {t}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        {project.github && project.github !== '#' && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <span className="underline">View Code</span>
                            </a>
                        )}
                        {project.live && project.live !== '#' && (
                            <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <span className="underline">Live Demo</span>
                            </a>
                        )}
                    </div>
                </div>

                {project.htmlContent ? (
                    <div
                        className="prose dark:prose-invert max-w-none prose-lg
                                   prose-headings:font-bold prose-headings:tracking-tight
                                   prose-h1:text-gray-900 dark:prose-h1:text-white
                                   prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-500
                                   prose-img:rounded-xl prose-img:shadow-lg
                                   prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-800"
                        dangerouslySetInnerHTML={{ __html: project.htmlContent }}
                    />
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500">Content for this project is not yet available.</p>
                        {project.notionId && <p className="text-xs text-gray-400 mt-2">Notion ID: {project.notionId}</p>}
                    </div>
                )}
            </div>
        </div>
    );
};
