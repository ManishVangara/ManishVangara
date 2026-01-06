import React, { useRef, useEffect, useState } from 'react';
import { skills } from '../data/skills';

// Helper to map skill names to SimpleIcons slugs
// Adding some colors for a vibrant "flyer" look
const getIconData = (skillName) => {
    const map = {
        "Python": { slug: "python", color: "#3776AB" },
        "JavaScript": { slug: "javascript", color: "#F7DF1E" },
        "JavaScript/TypeScript": { slug: "javascript", color: "#F7DF1E" }, // Fallback to JS
        "TypeScript": { slug: "typescript", color: "#3178C6" },
        "SQL": { slug: "postgresql", color: "#4169E1" }, // Using generic DB color or PG
        "C++": { slug: "cplusplus", color: "#00599C" },
        "HTML/CSS": { slug: "html5", color: "#E34F26" },
        "PyTorch": { slug: "pytorch", color: "#EE4C2C" },
        "TensorFlow": { slug: "tensorflow", color: "#FF6F00" },
        "Scikit-Learn": { slug: "scikitlearn", color: "#F7931E" },
        "LangChain": { slug: "langchain", color: "#1C3C3C" }, // approx
        "OpenAI API": { slug: "openai", color: "#412991" },
        "Hugging Face": { slug: "huggingface", color: "#FFD21E" },
        "Apache Airflow": { slug: "apacheairflow", color: "#017CEE" },
        "Kafka": { slug: "apachekafka", color: "#231F20" },
        "Snowflake": { slug: "snowflake", color: "#29B5E8" },
        "dbt": { slug: "dbt", color: "#FF694B" },
        "Spark": { slug: "apachespark", color: "#E25A1C" },
        "Pandas": { slug: "pandas", color: "#150458" },
        "React": { slug: "react", color: "#61DAFB" },
        "FastAPI": { slug: "fastapi", color: "#009688" },
        "Node.js": { slug: "nodedotjs", color: "#339933" },
        "Tailwind CSS": { slug: "tailwindcss", color: "#06B6D4" },
        "Next.js": { slug: "nextdotjs", color: "#000000" },
        "Flask": { slug: "flask", color: "#000000" },
        "AWS": { slug: "amazonwebservices", color: "#232F3E" },
        "Docker": { slug: "docker", color: "#2496ED" },
        "Kubernetes": { slug: "kubernetes", color: "#326CE5" },
        "Git/GitHub": { slug: "github", color: "#181717" },
        "Tableau": { slug: "tableau", color: "#E97627" },
        "PostgreSQL": { slug: "postgresql", color: "#4169E1" }
    };

    // Handle combined names or fallbacks
    let normalized = skillName;
    if (skillName === "JavaScript/TypeScript") return map["JavaScript"]; // or return both? simplistic for now
    if (skillName === "Git/GitHub") return map["Git/GitHub"];

    return map[skillName] || { slug: "codeigniter", color: "#666" }; // Default fallback
};

export const Skills = () => {
    // We will organize categories into rows for the marquee
    const rows = [
        skills[0].items.concat(skills[3].items), // Languages + Web Dev
        skills[1].items.concat(skills[2].items), // AI + Data Eng
        skills[4].items // Tools
    ];

    return (
        <section id="skills" className="py-24 bg-white dark:bg-black overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 mb-16 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    Technical <span className="text-blue-600 dark:text-blue-400">Arsenel</span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    A comprehensive suite of tools and technologies I use to build robust, scalable, and intelligent systems.
                </p>
            </div>

            <div className="relative z-10 space-y-16 lg:space-y-20 transform scale-100">
                {rows.map((rowItems, idx) => (
                    <MarqueeRow
                        key={idx}
                        items={rowItems}
                        direction={idx % 2 === 0 ? "left" : "right"}
                        speed={idx % 2 === 0 ? 100 : 120}
                    />
                ))}
            </div>

            {/* Gradient overlays for seamless fade effect on edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white dark:from-black to-transparent z-20"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white dark:from-black to-transparent z-20"></div>
        </section>
    );
};

const MarqueeRow = ({ items, direction = "left", speed = 40 }) => {
    const containerRef = useRef(null);
    const [start, setStart] = useState(false);

    useEffect(() => {
        if (containerRef.current) {
            setStart(true);
        }
    }, []);

    // Create enough duplicates to fill the screen + buffer for smooth looping
    // 2x duplication for 1 Loop
    const displayItems = [...items, ...items];

    return (
        <div
            ref={containerRef}
            className="scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)]"
        >
            <ul
                className={`flex min-w-full shrink-0 gap-6 py-4 w-max flex-nowrap
                ${start && "animate-scroll"} 
                hover:[animation-play-state:paused]`}
                style={{
                    "--animation-duration": `${speed}s`,
                    "--animation-direction": direction === "left" ? "normal" : "reverse",
                }}
            >
                {displayItems.map((item, idx) => {
                    const { slug, color } = getIconData(item);
                    return (
                        <li
                            key={`${item}-${idx}`}
                            className="w-[220px] h-[100px] flex-shrink-0 relative rounded-2xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm px-6 py-4 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 group cursor-pointer"
                        >
                            <div className="flex flex-row items-center justify-start h-full gap-4">
                                {/* Icon */}
                                <div className="h-12 w-12 rounded-xl bg-gray-100 dark:bg-zinc-800 flex items-center justify-center p-2 group-hover:scale-110 transition-transform duration-300">
                                    <img
                                        src={`https://cdn.simpleicons.org/${slug}/${color.replace('#', '')}`}
                                        alt={item}
                                        className="h-full w-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                </div>

                                <span className="text-base font-semibold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {item}
                                </span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
