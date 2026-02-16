import React, { useState, useRef, useEffect } from 'react';
import { skills } from '../data/skills';
import { QuoteBubble } from './QuoteBubble';

// ─── Icon mapping (simplified) ────
const getSkillIcon = (name) => {
    const icons = {
        'Python': '🐍', 'SQL': '🗃️', 'R': '📊', 'Excel': '📈', 'Spark': '⚡',
        'Power BI': '📊', 'Tableau': '📉', 'Matplotlib': '📈', 'Seaborn': '🎨',
        'A/B Testing': '🧪', 'Hypothesis Testing': '📐', 'Regression': '📏', 'Cohort Analysis': '👥', 'Forecasting': '🔮',
        'AWS Glue': '🔧', 'Apache Airflow': '🌬️', 'Azure Data Factory': '☁️', 'ETL Development': '🔄',
        'Revenue Recognition': '💰', 'MRR/ARR': '📈', 'Churn Analysis': '📉', 'CLV': '💎', 'Billing Reconciliation': '✅', 'SaaS Metrics': '📋',
        'Scikit-learn': '🤖', 'Random Forest': '🌲', 'XGBoost': '🚀', 'Predictive Modeling': '🎯', 'Anomaly Detection': '🔍',
        'AWS': '☁️', 'Azure': '☁️', 'Salesforce': '💼', 'Snowflake': '❄️', 'BigQuery': '🔎',
    };
    return icons[name] || '⚙️';
};

export const Skills = ({ quote }) => {
    const [activeCategory, setActiveCategory] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const currentSkills = skills[activeCategory]?.items || [];

    return (
        <section id="skills" ref={sectionRef} className="py-24 px-6 scroll-mt-20">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h2 className="section-heading text-4xl sm:text-5xl text-gray-900 dark:text-white mb-3">
                        Technical <span className="text-gradient">Expertise</span>
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-500 text-sm max-w-md">
                        Technologies and methodologies I use to turn data into decisions.
                    </p>
                </div>

                {/* Category tabs */}
                <div className="flex flex-wrap gap-2 mb-10">
                    {skills.map((cat, i) => (
                        <button
                            key={cat.category}
                            onClick={() => setActiveCategory(i)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === i
                                ? 'glass-button bg-brand-blue/10 text-brand-blue border-brand-blue/30'
                                : 'text-zinc-600 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 border border-transparent'
                                }`}
                        >
                            {cat.category}
                        </button>
                    ))}
                </div>

                {/* Skills grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {currentSkills.map((skill, i) => (
                        <div
                            key={skill.name}
                            className={`glass-card p-5 text-center group cursor-default transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}
                            style={{ transitionDelay: `${i * 80}ms` }}
                        >
                            <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                                {getSkillIcon(skill.name)}
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-brand-blue transition-colors">
                                {skill.name}
                            </h3>
                            <p className="text-[10px] text-zinc-600 uppercase tracking-wider">{skill.stat}</p>
                        </div>
                    ))}
                </div>

                {/* Marquee ticker */}
                <div className="mt-12 overflow-hidden relative">
                    <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-brand-bg to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-brand-bg to-transparent z-10 pointer-events-none" />
                    <div className="flex gap-6 animate-scroll" style={{ '--animation-duration': '30s' }}>
                        {[...skills.flatMap(s => s.items), ...skills.flatMap(s => s.items)].map((skill, i) => (
                            <span key={i} className="text-xs text-zinc-700 whitespace-nowrap font-mono uppercase tracking-wider shrink-0">
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </div>

                {quote && (
                    <div className="mt-16">
                        <QuoteBubble quote={quote} />
                    </div>
                )}
            </div>
        </section>
    );
};
