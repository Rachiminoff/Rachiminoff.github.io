import React, { useState } from "react";

import uniq00 from '../assets/images/uq0.jpg';
import uniq01 from '../assets/images/uq1.jpg';
import uniq02 from '../assets/images/uq2.jpg';
import uniq03 from '../assets/images/uq3.jpg';

import wais00 from '../assets/images/ww0.jpg';
import wais01 from '../assets/images/ww1.jpg';
import wais02 from '../assets/images/ww2.jpg';
import wais03 from '../assets/images/ww3.jpg';

import '../assets/styles/Project.scss';

function GitHubIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M12 .5C5.7.5.8 5.6.8 12c0 5.1 3.3 9.5 7.9 11 .6.1.8-.3.8-.6v-2.2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.8 2.1 2.8 2.1.6 0 1.1-.2 1.4-.4.1-.8.4-1.4.8-1.7-2.5-.3-5.1-1.3-5.1-5.8 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.3.9-.2 1.9-.3 2.9-.3s2 .1 2.9.3c2.3-1.6 3.3-1.3 3.3-1.3.6 1.6.2 2.8.1 3.1.8.9 1.2 2 1.2 3.3 0 4.5-2.6 5.5-5.1 5.8.4.4.9 1.2.9 2.4v3.6c0 .3.2.7.8.6 4.6-1.5 7.9-5.9 7.9-11C23.2 5.6 18.3.5 12 .5z"/>
        </svg>
    );
}

/* =========================
   IMAGE SLIDER
========================= */

type ImageSliderProps = {
    images: string[];
    link: string;
    title: string;
};

function ImageSlider({ images, link, title }: ImageSliderProps) {

    const [current, setCurrent] = useState(0);

    const nextSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setCurrent((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const prevSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setCurrent((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    return (
        <div className="slider-container">

            <a href={link} target="_blank" rel="noreferrer">
                <img
                    src={images[current]}
                    className="slider-image"
                    alt={title}
                />
            </a>

            {images.length > 1 && (
                <>
                    <button className="nav-btn left" onClick={prevSlide}>
                        ‹
                    </button>

                    <button className="nav-btn right" onClick={nextSlide}>
                        ›
                    </button>
                </>
            )}

        </div>
    );
}

/* =========================
   PROJECT DATA
========================= */

const projects = [
    {
        title: "UniQuest",
        role: "Lead Developer",
        roleClass: "lead",
        featured: true,
        link: "https://github.com/Skabeez/UniQuest",
        images: [uniq00, uniq01, uniq02, uniq03],

        oneliner:
            "Gamified productivity platform for university students.",

        description:
            "Designed to make university life feel less overwhelming through progression systems, missions, and campus-focused utilities with real-time synchronization across devices.",

        features: [
            "Task & mission system",
            "Real-time synchronization",
            "Cross-platform mobile support",
            "Campus-focused utilities"
        ],

        tech: [
            "FlutterFlow",
            "Dart",
            "Supabase"
        ]
    },

    {
        title: "Webnovel Extractor",
        role: "Sole Developer",
        roleClass: "lead",
        featured: false,
        link: "https://github.com/Rachiminoff/Webnovel-Extractor",

        video:
            "https://www.youtube.com/embed/Zclw7GV7w7I",

        oneliner:
            "Automated pipeline for extracting and cleaning web novel content.",

        description:
            "Built to parse inconsistent site structures, clean malformed HTML, and generate readable chapter outputs at scale using Python automation tools.",

        features: [
            "Dynamic content scraping",
            "Malformed HTML cleanup",
            "Automated extraction workflow",
            "Readable text formatting"
        ],

        tech: [
            "Python",
            "Playwright",
            "BeautifulSoup"
        ]
    },

    {
        title: "FREE FREE FREE",
        role: "Co-Developer",
        roleClass: "co",
        featured: true,
        link: "https://github.com/Rachiminoff/FREEFREEFREE",

        video:
            "https://www.youtube.com/embed/CAeP5QStOrE?si=M8axOWtdfKER_7OF",

        oneliner:
            "Psychological desktop simulation game set inside a fictional 2005 OS.",

        description:
            "Players investigate a fake GTA IV leak that installs a self-aware quarantine program, gradually turning the computer itself into part of the narrative experience.",

        features: [
            "Narrative-driven gameplay",
            "Interactive desktop simulation",
            "2D and 3D gameplay",
            "Atmospheric systems",
            "AI-driven enemy behavior"
        ],

        tech: [
            "Godot",
            "GDScript",
            "Blender"
        ]
    },

    {
        title: "Wais Wallet",
        role: "Co-Developer",
        roleClass: "co",
        featured: false,
        link: "https://github.com/Rachiminoff/Wais_Wallet",

        liveDemo: "https://wais-wallet.vercel.app",

        images: [wais00, wais01, wais02, wais03],

        oneliner:
            "Collaborative finance and wallet management platform.",

        description:
            "Focused on responsive UI, reusable frontend architecture, and intuitive financial workflows with a clean and accessible user experience.",

        features: [
            "Responsive UI system",
            "Reusable React components",
            "Frontend architecture",
            "User-centered workflows"
        ],

        tech: [
            "TypeScript",
            "React",
            "Frontend"
        ]
    }
];

function Project() {

    return (
        <div className="projects-container" id="projects">

            <h1>Featured Projects</h1>

            <div className="projects-grid">

                {projects.map((project, index) => (

                    <div
                        key={index}
                        className={`project ${project.featured ? "featured" : ""}`}
                    >

                        {/* ================= MEDIA ================= */}

                        <div className="project-media">

                            {project.images ? (

                                <ImageSlider
                                    images={project.images}
                                    link={project.link}
                                    title={project.title}
                                />

                            ) : (

                                <div className="video-container">

                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={project.video}
                                        title={project.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>

                                </div>

                            )}

                        </div>

                        {/* ================= CONTENT ================= */}

                        <div className="project-content">

                            <div className="project-header">

                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <h2>{project.title}</h2>
                                </a>

                                <span className={`role-badge ${project.roleClass}`}>
                                    {project.role}
                                </span>

                            </div>

                            {/* ONE LINER */}

                            <p className="project-oneliner">
                                {project.oneliner}
                            </p>

                            {/* DESCRIPTION */}

                            <p className="project-description">
                                {project.description}
                            </p>

                            {/* FEATURES */}

                            <div className="project-section">

                                <h3>Key Features</h3>

                                <ul className="feature-list">

                                    {project.features.map((feature, i) => (
                                        <li key={i}>
                                            {feature}
                                        </li>
                                    ))}

                                </ul>

                            </div>

                            {/* TECH STACK */}

                            <div className="project-section">

                                <h3>Tech Stack</h3>

                                <div className="tech-tags">

                                    {project.tech.map((tech, i) => (
                                        <span key={i}>
                                            {tech}
                                        </span>
                                    ))}

                                </div>

                            </div>

                            {/* LINKS */}

                            <div className="project-links">

                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="github-link"
                                >
                                    <GitHubIcon />
                                    <span>View Project</span>
                                </a>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Project;