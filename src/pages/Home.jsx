
import { Hero } from '../components/Hero';
import { BentoGrid } from '../components/BentoGrid';
import { ProjectShowcase } from '../components/ProjectShowcase';
import { Skills } from '../components/Skills';
import { Experience } from '../components/Experience';
import { LessonsLearned } from '../components/LessonsLearned';
import { Certifications } from '../components/Certifications';
import { Connect } from '../components/Connect';


import { profile } from '../data/profile';

export const Home = () => {
    return (
        <>
            <Hero />
            <BentoGrid quote={profile.quotes.home_hero} />
            <ProjectShowcase quote={profile.quotes.home_projects} />
            <Skills quote={profile.quotes.home_skills} />
            <Experience quote={profile.quotes.home_experience} />
            <LessonsLearned />
            <Certifications />
            <Connect quote={profile.quotes.home_connect} />
            <div className="py-20 text-center px-6">
                <p className="font-handwriting text-4xl md:text-5xl text-gray-500 dark:text-gray-400 max-w-4xl mx-auto leading-normal">
                    &quot;The goal is to turn data into information, and information into insight.&quot;
                </p>
                <p className="mt-4 text-gray-400 dark:text-gray-500 text-sm tracking-widest uppercase">
                    — Carly Fiorina
                </p>
            </div>
        </>
    );
};
