
import React, { useRef, useState } from 'react';
import { experienceData } from '../data/experience';
import { Briefcase, GraduationCap, Calendar, ArrowRight } from 'lucide-react';

export const Experience = () => {
    return (
        <section id="experience" className="py-24 bg-white dark:bg-black relative overflow-hidden">
            {/* Background Grids */}
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        My <span className="text-blue-600 dark:text-blue-400">Journey</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        A timeline of my professional career and academic achievements.
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Unique Connector Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent opacity-30 dark:opacity-50 hidden md:block rounded-full" />

                    <div className="space-y-12 md:space-y-0 relative">
                        {experienceData.map((item, index) => (
                            <TimelineItem
                                key={item.id}
                                item={item}
                                index={index}
                                isLeft={index % 2 === 0}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const TimelineItem = ({ item, index, isLeft }) => {
    return (
        <div className={`flex flex-col md:flex-row items-center justify-between w-full md:mb-12 group ${isLeft ? '' : 'md:flex-row-reverse'}`}>

            {/* Spacer for Desktop Alignment */}
            <div className="hidden md:block w-5/12" />

            {/* Central Node */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20 hidden md:flex">
                <div className={`w-8 h-8 rounded-full border-4 border-white dark:border-black shadow-lg flex items-center justify-center transition-all duration-500 group-hover:scale-125 group-hover:shadow-blue-500/50 ${item.type === 'work' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                    {item.type === 'work' ?
                        <Briefcase size={14} className="text-white" /> :
                        <GraduationCap size={14} className="text-white" />
                    }
                </div>
            </div>

            {/* Content Card */}
            <div className="w-full md:w-5/12">
                <div className={`relative bg-gray-50 dark:bg-zinc-900 p-6 rounded-3xl border border-gray-200 dark:border-white/5 transition-all duration-300 hover:shadow-2xl hover:border-blue-500/30 group-hover:-translate-y-1 ${isLeft ? 'md:mr-auto' : 'md:ml-auto'}`}>

                    {/* Connecting Line for Mobile (optional) or just decoration */}

                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${item.type === 'work'
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'
                                : 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400'
                            }`}>
                            {item.type === 'work' ? <Briefcase size={12} /> : <GraduationCap size={12} />}
                            {item.type === 'work' ? 'Work' : 'Education'}
                        </span>
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                            <Calendar size={14} />
                            {item.period}
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.title}
                    </h3>
                    <div className="text-base font-medium text-gray-700 dark:text-gray-300 mb-4">
                        {item.company}
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                        {item.description}
                    </p>

                    {/* Skills/Tags */}
                    <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill, i) => (
                            <span
                                key={i}
                                className="px-2.5 py-1 text-xs rounded-md bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 group-hover:border-blue-500/20 transition-colors"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>

                    {/* Decorative Arrow on Hover */}
                    <div className={`absolute top-1/2 -translate-y-1/2 ${isLeft ? '-right-12' : '-left-12'} opacity-0 group-hover:opacity-100 transition-all duration-300 transform ${isLeft ? '-translate-x-4 group-hover:translate-x-0' : 'translate-x-4 group-hover:translate-x-0'} hidden md:block`}>
                        <ArrowRight className={`w-8 h-8 ${item.type === 'work' ? 'text-blue-500' : 'text-purple-500'} ${isLeft ? '' : 'rotate-180'}`} />
                    </div>
                </div>
            </div>
        </div>
    );
};
