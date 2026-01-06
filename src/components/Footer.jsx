
import React from 'react';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';
import { profile } from '../data/profile';

export const Footer = () => {
    return (
        <footer className="bg-white dark:bg-black border-t border-gray-100 dark:border-white/5 py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Copyright */}
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-6">
                    <SocialLink href={profile.socials.github} icon={<Github size={18} />} label="GitHub" />
                    <SocialLink href={profile.socials.linkedin} icon={<Linkedin size={18} />} label="LinkedIn" />
                    <SocialLink href={profile.socials.twitter} icon={<Twitter size={18} />} label="Twitter" />
                </div>

                {/* Made with Love */}
                <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                    <span>Made with</span>
                    <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
                    <span>& Lots of Coffee</span>
                </div>
            </div>
        </footer>
    );
};

const SocialLink = ({ href, icon, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white transition-colors"
        aria-label={label}
    >
        {icon}
    </a>
);
