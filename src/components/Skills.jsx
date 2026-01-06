import React, { useRef, useEffect, useState } from 'react';
import { skills } from '../data/skills';

// Helper to map skill names to SimpleIcons slugs and brand colors
const getIconData = (skillName) => {
    const slugMap = {
        // Programming & Data
        "Python": { slug: "python", color: "#3776AB" },
        "NumPy": { slug: "numpy", color: "#013243" },
        "Pandas": { slug: "pandas", color: "#150458" },
        "SciPy": { slug: "scipy", color: "#8CAAE6" },
        "Statsmodels": { slug: "python", color: "#3776AB" }, // Fallback
        "R": { slug: "r", color: "#276DC3" },
        "SQL": { slug: "postgresql", color: "#4169E1" }, // Generic DB
        "PostgreSQL": { slug: "postgresql", color: "#4169E1" },
        "PySpark": { slug: "apachespark", color: "#E25A1C" },

        // Data Mining & Stats (Concepts -> Mapped to representative tools)
        "Clustering": { slug: "scikitlearn", color: "#F7931E" },
        "Regression Analysis": { slug: "scikitlearn", color: "#F7931E" },
        "Decision Trees": { slug: "scikitlearn", color: "#F7931E" },
        "SVM": { slug: "scikitlearn", color: "#F7931E" },
        "KNN": { slug: "scikitlearn", color: "#F7931E" },
        "PCA": { slug: "scikitlearn", color: "#F7931E" },
        "Time Series Analysis": { slug: "pandas", color: "#150458" },
        "Hypothesis Testing": { slug: "scipy", color: "#8CAAE6" },

        // Machine Learning
        "Scikit-learn": { slug: "scikitlearn", color: "#F7931E" },
        "PyTorch": { slug: "pytorch", color: "#EE4C2C" },
        "TensorFlow": { slug: "tensorflow", color: "#FF6F00" },
        "XGBoost": { slug: "xgboost", color: "#3B4752" },
        "Random Forest": { slug: "scikitlearn", color: "#F7931E" },
        "Gradient Boosting": { slug: "scikitlearn", color: "#F7931E" },
        "Ensemble Methods": { slug: "scikitlearn", color: "#F7931E" },
        "Feature Engineering": { slug: "kaggle", color: "#20BEFF" }, // Generic DS
        "Reinforcement Learning": { slug: "openai", color: "#412991" },

        // Agentic AI
        "LangChain": { slug: "langchain", color: "#1C3C3C" },
        "LangGraph": { slug: "langchain", color: "#1C3C3C" },
        "OpenAI API": { slug: "openai", color: "#412991" },
        "Autonomous Agents": { slug: "robotframework", color: "#000000" }, // Fun fallback
        "Multi-Agent Systems": { slug: "robotframework", color: "#000000" },
        "ReAct Frameworks": { slug: "langchain", color: "#1C3C3C" },
        "Agent Memory Systems": { slug: "redis", color: "#DC382D" }, // Metaphorical

        // NLP
        "NLP": { slug: "huggingface", color: "#FFD21E" },
        "Sentiment Analysis": { slug: "huggingface", color: "#FFD21E" },
        "Entity Recognition": { slug: "spacy", color: "#09A3D5" },
        "Word Embeddings": { slug: "google", color: "#4285F4" },
        "Transformers": { slug: "huggingface", color: "#FFD21E" },

        // Cloud & Platforms
        "AWS": { slug: "amazonwebservices", color: "#232F3E" },
        "Databricks": { slug: "databricks", color: "#FF3621" },
        "Snowflake": { slug: "snowflake", color: "#29B5E8" },
        "ETL Pipelines": { slug: "apacheairflow", color: "#017CEE" },
        "Spark Streaming": { slug: "apachespark", color: "#E25A1C" },

        // Visualization
        "Power BI": { slug: "powerbi", color: "#F2C811" },
        "Tableau": { slug: "tableau", color: "#E97627" },
        "Matplotlib": { slug: "python", color: "#3776AB" },
        "Seaborn": { slug: "python", color: "#3776AB" }
    };

    // Default fallback
    return slugMap[skillName] || { slug: "codeigniter", color: "#666" };
};

export const Skills = () => {
    // Categories indices:
    // 0: Programming & Data
    // 1: Data Mining & Stats
    // 2: ML & Advanced Analytics
    // 3: Agentic AI
    // 4: NLP
    // 5: Cloud
    // 6: Visualization

    const getItems = (index) => (skills && skills[index] && skills[index].items) ? skills[index].items : [];

    // Grouping strategies for balanced rows
    const rows = [
        // Row 1: Foundation (Prog + Cloud + Viz)
        [...getItems(0), ...getItems(5), ...getItems(6)],

        // Row 2: Core Data Science & ML
        [...getItems(1), ...getItems(2)],

        // Row 3: Advanced AI & Agents (NLP + Agents)
        [...getItems(4), ...getItems(3)]
    ];

    return (
        <section id="skills" className="py-24 bg-white dark:bg-black overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 mb-16 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    Technical <span className="text-blue-600 dark:text-blue-400">Expertise</span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    A comprehensive suite of tools, frameworks, and methodologies I leverage to solve complex data challenges.
                </p>
            </div>

            <div className="relative z-10 space-y-10 transform scale-100">
                {rows.map((rowItems, idx) => (
                    <MarqueeRow
                        key={idx}
                        items={rowItems}
                        direction={idx % 2 === 0 ? "left" : "right"}
                        speed={idx % 2 === 0 ? 80 : 100}
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

    const displayItems = [...items, ...items];

    return (
        <div
            ref={containerRef}
            className="scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)]"
        >
            <ul
                className={`flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap
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
                            className="w-[auto] min-w-[180px] h-[80px] flex-shrink-0 relative rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm px-6 py-3 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 group cursor-pointer flex items-center justify-center"
                        >
                            <div className="flex flex-row items-center justify-start gap-4">
                                <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-gray-100 dark:bg-zinc-800 flex items-center justify-center p-2 group-hover:scale-110 transition-transform duration-300">
                                    <img
                                        src={`https://cdn.simpleicons.org/${slug}/${color.replace('#', '')}`}
                                        alt={item}
                                        className="h-full w-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                </div>

                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors whitespace-nowrap">
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
