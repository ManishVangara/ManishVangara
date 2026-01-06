import {
    Github,
    Linkedin,
    Mail,
    Camera,
    Plane,
    Dice5,
    CookingPot
} from 'lucide-react';

import heroBg from '../assets/hero-bg.png';
import profilePhoto from '../assets/Manish_Vangara.jpeg';

export const profile = {
    // Identity
    name: "Manish Vangara",
    firstName: "Manish",
    lastName: "Vangara",
    role: "Data Scientist & Data Engineer",
    location: "Seattle",
    email: "manish.vangara16@gmail.com",
    logoText: "MANISH",

    // Links
    socials: {
        github: "https://github.com/ManishVangara",
        linkedin: "https://linkedin.com/in/manishvangara"
    },

    // Resume
    resume: "/resume.pdf",

    // Hero Section
    hero: {
        background: heroBg,
        typewriter: [
            "Building Scalable Data Infrastructure",
            "Deriving Actionable Insights from Data",
            "Engineering Robust AI Solutions"
        ],
        tagline: "Crafting intelligent systems from chaos. Passionate about uncovering stories hidden within data and building scalable infrastructure to tell them."
    },

    // About Page config
    about: {
        // You can change this to a local import like the hero background if you have a file in assets
        photo: profilePhoto,

        quote: "I write code not just to solve problems, but to create experiences.",

        // Each string is a paragraph
        story: [
            "I started my journey with a curiosity for how things work, which quickly evolved into a passion for software engineering. Over the years, I've honed my skills in building scalable applications, exploring data engineering, and diving deep into artificial intelligence.",
            "From late-night debugging sessions to deploying production-grade systems, I thrive on the challenge of solving complex problems. My philosophy is simple: build things that matter, and never stop learning."
        ]
    },

    // Lists for About Page
    hobbies: [
        { icon: Camera, label: "Photography", desc: "Capturing moments", color: "bg-pink-500/10 text-pink-600" },
        { icon: Plane, label: "Traveling", desc: "Exploring cultures", color: "bg-blue-500/10 text-blue-600" },
        { icon: Dice5, label: "Board Games & Badminton", desc: "Keeping Mind & Body Active", color: "bg-purple-500/10 text-purple-600" },
        { icon: CookingPot, label: "Cooking", desc: "Crafting flavors", color: "bg-amber-500/10 text-amber-600" }
    ],

    bucketList: [
        { label: "Visit Japan", done: false },
        { label: "Go on a solo trip", done: true },
        { label: "Do something spontaneous every month through 2026", done: false },
        { label: "Contribute to a major Open Source project", done: true },
        { label: "Stay consistent with a fitness routine for a year", done: false },
        { label: "See the Northern Lights in person", done: false }
    ],

    hardware: [
        "MacBook Pro M3 Max",
        "NuPhy Air96 V2",
        "Logitech MX Master 3S",
        "Dell UltraSharp 27\" 4K"
    ],

    software: [
        "VS Code + Warp",
        "AWS",
        "Databricks",
        "Notion"
    ]
};
