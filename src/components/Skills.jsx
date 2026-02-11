import React, { useState, useEffect, useRef } from 'react';
import { skills } from '../data/skills';
import { QuoteBubble } from './QuoteBubble';
import glueIcon from '../assets/Glue.svg';

// --- Icon Mapping ---
const getIconData = (skillName) => {
    const slugMap = {
        "Python": "python",
        "NumPy": "numpy",
        "Pandas": "pandas",
        "SciPy": "scipy",
        "Statsmodels": "python",
        "R": "r",
        "SQL": "postgresql",
        "PostgreSQL": "postgresql",
        "PySpark": "apachespark",
        "Excel": "microsoftexcel",
        "Clustering": "scikitlearn",
        "Regression Analysis": "scikitlearn",
        "Decision Trees": "scikitlearn",
        "SVM": "scikitlearn",
        "KNN": "scikitlearn",
        "PCA": "scikitlearn",
        "Time Series Analysis": "pandas",
        "Hypothesis Testing": "scipy",
        "A/B Testing": "googleoptimize",
        "Regression": "scikitlearn",
        "Cohort Analysis": "googleanalytics",
        "Forecasting": "facebook",
        "Scikit-learn": "scikitlearn",
        "PyTorch": "pytorch",
        "TensorFlow": "tensorflow",
        "XGBoost": "python",
        "Random Forest": "scikitlearn",
        "Gradient Boosting": "scikitlearn",
        "Ensemble Methods": "scikitlearn",
        "Feature Engineering": "kaggle",
        "Reinforcement Learning": "openai",
        "Predictive Modeling": "scikitlearn",
        "Anomaly Detection": "splunk",
        "LangChain": "langchain",
        "LangGraph": "langchain",
        "OpenAI API": "openai",
        "Autonomous Agents": "robotframework",
        "Multi-Agent Systems": "robotframework",
        "ReAct Frameworks": "langchain",
        "Agent Memory Systems": "redis",
        "NLP": "huggingface",
        "Sentiment Analysis": "huggingface",
        "Entity Recognition": "spacy",
        "Word Embeddings": "google",
        "Transformers": "huggingface",
        "AWS": "amazon",
        "Databricks": "databricks",
        "Snowflake": "snowflake",
        "ETL Pipelines": "apacheairflow",
        "Spark Streaming": "apachespark",
        "AWS Glue": "awsglue",
        "Apache Airflow": "apacheairflow",
        "Azure Data Factory": "microsoftazure",
        "ETL development in Python": "python",
        "ETL Development": "python",
        "Azure": "microsoftazure",
        "Salesforce": "salesforce",
        "BigQuery": "googlecloud",
        "Power BI": "powerbi",
        "Tableau": "tableau",
        "Matplotlib": "python",
        "Seaborn": "python",
        "Revenue Recognition": "quickbooks",
        "MRR/ARR": "stripe",
        "Churn Analysis": "mixpanel",
        "CLV": "googleanalytics",
        "Billing Reconciliation": "xero",
        "SaaS Metrics": "chartmogul",
        "Spark": "apachespark",
        "Tableau": "tableau"
    };
    return slugMap[skillName] || "codeigniter";
};

// --- Updated Visibility & Color Config (SVG Compatible) ---
// We need direct color values for fill/stroke in SVG if not using classes.
// However, Tailwind classes on SVG elements work for fill/stroke too!
// "fill-blue-100", "stroke-blue-200" etc.
const CATEGORY_COLORS = {
    "Core Programming": {
        stroke: "stroke-blue-400 dark:stroke-blue-500/60",
        fill: "fill-blue-200 dark:fill-blue-900/60",
        shadow: "drop-shadow-[0_4px_4px_rgba(59,130,246,0.25)]", // blue-500 shadow
        text: "text-blue-700 dark:text-blue-100",
        bg: "bg-blue-100 dark:bg-blue-900/60", // Keeping for Thinking Bubble
        border: "border-blue-200 dark:border-blue-500/60" // Keeping for Thinking Bubble
    },
    "Visualization": {
        stroke: "stroke-orange-400 dark:stroke-orange-500/60",
        fill: "fill-orange-200 dark:fill-orange-900/60",
        shadow: "drop-shadow-[0_4px_4px_rgba(249,115,22,0.25)]",
        text: "text-orange-700 dark:text-orange-100",
        bg: "bg-orange-100 dark:bg-orange-900/60",
        border: "border-orange-200 dark:border-orange-500/60"
    },
    "Statistical Methods": {
        stroke: "stroke-indigo-400 dark:stroke-indigo-500/60",
        fill: "fill-indigo-200 dark:fill-indigo-900/60",
        shadow: "drop-shadow-[0_4px_4px_rgba(99,102,241,0.25)]",
        text: "text-indigo-700 dark:text-indigo-100",
        bg: "bg-indigo-100 dark:bg-indigo-900/60",
        border: "border-indigo-200 dark:border-indigo-500/60"
    },
    "Data Engineering": {
        stroke: "stroke-cyan-400 dark:stroke-cyan-500/60",
        fill: "fill-cyan-200 dark:fill-cyan-900/60",
        shadow: "drop-shadow-[0_4px_4px_rgba(6,182,212,0.25)]",
        text: "text-cyan-700 dark:text-cyan-100",
        bg: "bg-cyan-100 dark:bg-cyan-900/60",
        border: "border-cyan-200 dark:border-cyan-500/60"
    },
    "Domain Knowledge": {
        stroke: "stroke-emerald-400 dark:stroke-emerald-500/60",
        fill: "fill-emerald-200 dark:fill-emerald-900/60",
        shadow: "drop-shadow-[0_4px_4px_rgba(16,185,129,0.25)]",
        text: "text-emerald-700 dark:text-emerald-100",
        bg: "bg-emerald-100 dark:bg-emerald-900/60",
        border: "border-emerald-200 dark:border-emerald-500/60"
    },
    "Machine Learning": {
        stroke: "stroke-purple-400 dark:stroke-purple-500/60",
        fill: "fill-purple-200 dark:fill-purple-900/60",
        shadow: "drop-shadow-[0_4px_4px_rgba(168,85,247,0.25)]",
        text: "text-purple-700 dark:text-purple-100",
        bg: "bg-purple-100 dark:bg-purple-900/60",
        border: "border-purple-200 dark:border-purple-500/60"
    },
    "Platforms": {
        stroke: "stroke-slate-400 dark:stroke-slate-500/60",
        fill: "fill-slate-200 dark:fill-slate-800/60",
        shadow: "drop-shadow-[0_4px_4px_rgba(100,116,139,0.25)]",
        text: "text-slate-700 dark:text-slate-100",
        bg: "bg-slate-100 dark:bg-slate-800/60",
        border: "border-slate-200 dark:border-slate-500/60"
    },
    "Default": {
        stroke: "stroke-gray-400 dark:stroke-gray-500/60",
        fill: "fill-gray-200 dark:fill-gray-800/60",
        shadow: "drop-shadow-[0_4px_4px_rgba(107,114,128,0.25)]",
        text: "text-gray-700 dark:text-gray-100",
        bg: "bg-gray-100 dark:bg-gray-800/60",
        border: "border-gray-200 dark:border-gray-500/60"
    }
};

// --- Hexagon Component (SVG Based) ---
const HexagonTile = ({ item, category, x, y, size }) => {
    const iconSlug = getIconData(item.name);
    const config = CATEGORY_COLORS[category] || CATEGORY_COLORS["Default"];

    // Geometry
    const width = size * Math.sqrt(3) / 2;
    // Points for Pointy Topped Hexagon
    const w = width;
    const h = size;
    const points = [
        `${w / 2},0`,
        `${w},${h * 0.25}`,
        `${w},${h * 0.75}`,
        `${w / 2},${h}`,
        `0,${h * 0.75}`,
        `0,${h * 0.25}`
    ].join(" ");

    return (
        <div
            className="absolute group flex items-center justify-center transition-all duration-300 cursor-default hover:z-50"
            style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                width: `${width}px`,
                height: `${size}px`,
                transform: 'translate(-50%, -50%)',
            }}
        >
            {/* Thinking Bubble (Tooltip) */}
            <div
                className="absolute bottom-[95%] left-1/2 -translate-x-1/2 z-[60] pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform group-hover:-translate-y-2 w-max max-w-[180px]"
            >
                {/* Main Bubble */}
                <div className={`relative px-4 py-3 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-xl border ${config.border} flex flex-col items-center text-center`}>
                    <span className={`text-xs md:text-sm font-bold ${config.text} mb-1 whitespace-nowrap`}>
                        {item.name}
                    </span>
                    <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 leading-tight font-medium">
                        {item.stat}
                    </span>
                </div>

                {/* Thought Dots (Tail) */}
                <div className={`absolute -bottom-2 left-1/2 -translate-x-[20%] w-3 h-3 bg-white dark:bg-[#1a1a1a] rounded-full border ${config.border} shadow-sm z-10`}></div>
                <div className={`absolute -bottom-5 left-1/2 -translate-x-[50%] w-1.5 h-1.5 bg-white dark:bg-[#1a1a1a] rounded-full border ${config.border} opacity-80 shadow-sm z-10`}></div>
            </div>

            {/* SVG Background Layer */}
            <div className="absolute inset-0 w-full h-full transition-transform duration-300 ease-out group-hover:scale-110">
                <svg
                    width="100%"
                    height="100%"
                    viewBox={`0 0 ${width} ${size}`}
                    className="overflow-visible"
                >
                    <polygon
                        points={points}
                        className={`
                            ${config.fill} 
                            ${config.stroke} 
                            stroke-[1.5px]
                            transition-all duration-300
                        `}
                        style={{
                            filter: `drop-shadow(0 4px 3px rgba(0,0,0,0.1))`
                        }}
                    />
                </svg>
            </div>

            {/* Content Layer (Centered over SVG) */}
            <div
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-3 z-10 pointer-events-none transition-transform duration-300 ease-out group-hover:scale-110"
            >
                <img
                    src={item.name === "AWS Glue" ? glueIcon : `https://cdn.jsdelivr.net/npm/simple-icons/icons/${iconSlug}.svg`}
                    alt={item.name}
                    className={`w-[28%] h-[28%] mb-2 transition-all duration-300 grayscale group-hover:grayscale-0 dark:invert drop-shadow-sm opacity-80 group-hover:scale-110 group-hover:opacity-100`}
                />
                {/* Only Name in Hexagon now */}
                <span className={`text-[9px] md:text-[10px] font-bold ${config.text} uppercase tracking-wide leading-tight px-1 truncate w-full`}>
                    {item.name}
                </span>
            </div>
        </div>
    );
};

export const Skills = ({ quote }) => {
    const containerRef = useRef(null);
    const [positionedSkills, setPositionedSkills] = useState([]);
    const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

    useEffect(() => {
        const updateLayout = () => {
            if (!containerRef.current) return;
            const isMobile = window.innerWidth < 768;
            const SKILL_HEX_SIZE = isMobile ? 110 : 140;
            const GAP = 4;

            // 1. Setup Block & Slots
            const totalSkills = skills.reduce((acc, cat) => acc + cat.items.length, 0);

            const ASPECT = isMobile ? 0.7 : 2.5;
            let cols = Math.ceil(Math.sqrt(totalSkills * ASPECT));
            if (cols < 3) cols = 3;
            const rows = Math.ceil(totalSkills / cols);

            // Grid Math for Pointy-Topped Hex
            const R = SKILL_HEX_SIZE / 2;
            const W = Math.sqrt(3) * R;
            const H = SKILL_HEX_SIZE;

            // Steps
            const x_step = W + GAP;
            const y_step = (H * 0.75) + GAP;

            const slots = [];
            const slotMap = new Map();

            for (let i = 0; i < totalSkills; i++) {
                const r = Math.floor(i / cols);
                const c = i % cols;

                const isLastRow = (r === rows - 1);
                const itemsInLastRow = totalSkills % cols || cols;
                let xOffset = 0;
                if (isLastRow && itemsInLastRow < cols) {
                    xOffset = (cols - itemsInLastRow) * x_step * 0.5;
                }

                const rowShift = (r % 2) !== 0 ? x_step * 0.5 : 0;
                const px = (c * x_step) + rowShift + xOffset;
                const py = r * y_step;

                const k = `${c},${r}`;
                const slot = { x: px, y: py, c, r, occupied: false, key: k, id: i };
                slots.push(slot);
                slotMap.set(k, i);
            }

            let minX = Math.min(...slots.map(s => s.x));
            let maxX = Math.max(...slots.map(s => s.x));
            let minY = Math.min(...slots.map(s => s.y));
            let maxY = Math.max(...slots.map(s => s.y));
            const rangeX = maxX - minX || 1;
            const rangeY = maxY - minY || 1;

            // 2. Setup Category Data
            const SEED_CONFIG = {
                "Core Programming": { x: 0.15, y: 0.15 },
                "Machine Learning": { x: 0.85, y: 0.15 },
                "Data Engineering": { x: 0.15, y: 0.85 },
                "Domain Knowledge": { x: 0.85, y: 0.85 },
                "Visualization": { x: 0.35, y: 0.5 },
                "Statistical Methods": { x: 0.65, y: 0.5 },
                "Platforms": { x: 0.5, y: 0.5 }
            };

            const empireData = skills.map(cat => {
                const seed = SEED_CONFIG[cat.category] || { x: 0.5, y: 0.5 };
                const tx = minX + (seed.x * rangeX);
                const ty = minY + (seed.y * rangeY);
                return {
                    name: cat.category,
                    quota: cat.items.length,
                    items: [...cat.items],
                    targetX: tx,
                    targetY: ty,
                    claimed: [],
                    frontier: []
                };
            });

            // Initial Seeds
            empireData.forEach(emp => {
                if (emp.quota > 0) {
                    let bestIdx = -1;
                    let minDist = Infinity;

                    slots.forEach((s, idx) => {
                        const d = (s.x - emp.targetX) ** 2 + (s.y - emp.targetY) ** 2;
                        if (d < minDist) {
                            minDist = d;
                            bestIdx = idx;
                        }
                    });
                    if (bestIdx !== -1) {
                        emp.startIdx = bestIdx;
                    }
                }
            });

            // Pre-calculate Distances for Priority Queue
            empireData.forEach(emp => {
                const dists = slots.map((s, idx) => ({
                    idx,
                    dist: (s.x - emp.targetX) ** 2 + (s.y - emp.targetY) ** 2
                }));
                dists.sort((a, b) => a.dist - b.dist);
                emp.sortedSlots = dists;
                emp.ptr = 0;
            });

            let remainingQuota = totalSkills;
            const assignments = [];

            while (remainingQuota > 0) {
                let bestEmpire = null;
                let bestSlotIdx = -1;
                let bestDist = Infinity;

                empireData.forEach(emp => {
                    if (emp.quota > 0) {
                        while (emp.ptr < emp.sortedSlots.length && slots[emp.sortedSlots[emp.ptr].idx].occupied) {
                            emp.ptr++;
                        }

                        if (emp.ptr < emp.sortedSlots.length) {
                            const candidate = emp.sortedSlots[emp.ptr];
                            if (candidate.dist < bestDist) {
                                bestDist = candidate.dist;
                                bestEmpire = emp;
                                bestSlotIdx = candidate.idx;
                            }
                        }
                    }
                });

                if (bestEmpire && bestSlotIdx !== -1) {
                    const slot = slots[bestSlotIdx];
                    slot.occupied = true;
                    slot.assignedCat = bestEmpire.name;
                    bestEmpire.quota--;
                    remainingQuota--;

                    const item = bestEmpire.items.shift();
                    assignments.push({
                        ...item,
                        ...slot,
                        category: bestEmpire.name,
                        size: SKILL_HEX_SIZE
                    });
                } else {
                    break;
                }
            }

            // 4. Render
            const fullW = maxX - minX + SKILL_HEX_SIZE + 20;
            const fullH = maxY - minY + SKILL_HEX_SIZE + 20;

            const finalCentered = assignments.map(p => ({
                ...p,
                x: p.x - (minX + maxX) / 2,
                y: p.y - (minY + maxY) / 2
            }));

            setContainerSize({ w: fullW, h: fullH });
            setPositionedSkills(finalCentered);
        };

        updateLayout();
        window.addEventListener('resize', updateLayout);
        return () => window.removeEventListener('resize', updateLayout);
    }, []);

    return (
        <section id="skills" className="py-24 bg-transparent dark:bg-[#050505] relative overflow-hidden transition-colors duration-300">

            {/* Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white dark:from-black dark:to-black opacity-40 pointer-events-none" />

            <div className="relative z-10 w-full flex flex-col items-center">

                <div className="text-center mb-16 relative px-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
                        Technical Expertise
                    </h2>
                    <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        Tools of the trade, clustered by domain.
                    </p>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-8 max-w-4xl px-4">
                    {Object.keys(CATEGORY_COLORS).filter(k => k !== 'Default').map(category => (
                        <div key={category} className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${CATEGORY_COLORS[category].fill.replace('fill-', 'bg-').split(' ')[0].replace('100', '500').replace('/60', '')}`} />
                            <span className={`text-[10px] md:text-xs uppercase tracking-widest font-bold text-gray-600 dark:text-gray-300`}>
                                {category}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Solid Block Container */}
                <div
                    ref={containerRef}
                    className="relative transition-all duration-300 ease-out mx-auto"
                    style={{
                        width: '100%',
                        height: containerSize.h > 0 ? `${containerSize.h}px` : '80vh',
                        maxWidth: '100vw',
                        overflow: 'visible'
                    }}
                >
                    {positionedSkills.map((skill, i) => (
                        <HexagonTile
                            key={i}
                            item={skill}
                            category={skill.category}
                            x={skill.x}
                            y={skill.y}
                            size={skill.size}
                        />
                    ))}
                </div>

                <div className="relative z-10 mt-12 w-full flex justify-center">
                    <QuoteBubble quote={quote} />
                </div>
            </div>
        </section>
    );
};
