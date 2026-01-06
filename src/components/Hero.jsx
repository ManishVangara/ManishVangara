import { Download } from 'lucide-react';
import heroBg from '../assets/hero-bg.png';
import { useTypewriter } from '../hooks/useTypewriter';

export const Hero = () => {
    const typewriterText = useTypewriter([
        "Building Scalable Data Infrastructure",
        "Deriving Actionable Insights from Data",
        "Engineering Robust AI Solutions"
    ]);

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:from-transparent dark:via-gray-900/50 dark:to-gray-900 z-10" />
                <img
                    src={heroBg}
                    alt="Data Science Background"
                    className="w-full h-full object-cover opacity-60 dark:opacity-40"
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                {/* Greeting */}
                <h3 className="text-xl md:text-2xl font-light text-gray-800 dark:text-gray-200 mb-4 flex items-center justify-center gap-2">
                    Hello <span className="animate-wave text-2xl">👋</span>, I am
                </h3>

                {/* Name */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                    Manish <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-600">Vangara</span>
                </h1>

                {/* Role */}
                <h2 className="text-xl md:text-2xl font-medium text-blue-600 dark:text-blue-400 mb-6 tracking-wide uppercase">
                    Data Scientist & Data Engineer
                </h2>

                {/* Typewriter Effect */}
                <div className="min-h-[40px] md:min-h-[60px] mb-8">
                    <p className="text-2xl md:text-4xl font-semibold text-gray-700 dark:text-gray-300">
                        {typewriterText}
                        <span className="animate-blink">|</span>
                    </p>
                </div>

                {/* Tagline */}
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed transition-colors duration-300">
                    Crafting intelligent systems from chaos. Passionate about uncovering stories hidden within data and building scalable infrastructure to tell them.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                        href="#projects"
                        className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
                    >
                        View Work
                    </a>
                    <a
                        href="#contact"
                        className="px-8 py-3 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white font-semibold rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-200"
                    >
                        Contact Me
                    </a>
                    <a
                        href="/resume.pdf"
                        download
                        className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-lg shadow-blue-500/20"
                    >
                        <Download size={20} />
                        Resume
                    </a>
                </div>
            </div>
        </section>
    );
};
