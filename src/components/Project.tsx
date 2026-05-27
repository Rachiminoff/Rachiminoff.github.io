import React, { useState } from "react";

import uniq01 from '../assets/images/uq1.jpg';
import uniq02 from '../assets/images/uq2.jpg';
import uniq03 from '../assets/images/uq3.jpg';

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

function Project() {

    return (
        <div className="projects-container" id="projects">

            <h1>Personal Projects</h1>

            <div className="projects-grid">

                {/* ================= UNIQUEST ================= */}
                <div className="project">

                    <ImageSlider
                        images={[uniq01, uniq02, uniq03]}
                        link="https://github.com/Skabeez/UniQuest"
                        title="UniQuest"
                    />

                    <a
                        href="https://github.com/Skabeez/UniQuest"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <h2>UniQuest</h2>
                    </a>

                    <div className="project-links">
                        <a
                            href="https://github.com/Skabeez/UniQuest"
                            target="_blank"
                            rel="noreferrer"
                            className="github-link"
                        >
                            <GitHubIcon />
                            <span>GitHub</span>
                        </a>
                    </div>

                    <div className="tech-tags">
                        <span>FlutterFlow</span>
                        <span>Dart</span>
                        <span>Supabase</span>
                    </div>

                    <p>
                        Mobile productivity platform for university students featuring task
                        tracking, gamified missions, and campus utilities. Built with
                        FlutterFlow, Dart, and Supabase for real-time sync and cross-platform use.
                    </p>

                </div>

                {/* ================= WEBNOVEL EXTRACTOR ================= */}
                <div className="project">

                    <div className="video-container">
                        <iframe
                            width="100%"
                            height="300"
                            src="https://www.youtube.com/embed/Zclw7GV7w7I"
                            title="Webnovel Extractor Demo"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <a
                        href="https://github.com/Rachiminoff/Webnovel-Extractor"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <h2>Webnovel Extractor</h2>
                    </a>

                    <div className="project-links">
                        <a
                            href="https://github.com/Rachiminoff/Webnovel-Extractor"
                            target="_blank"
                            rel="noreferrer"
                            className="github-link"
                        >
                            <GitHubIcon />
                            <span>GitHub</span>
                        </a>
                    </div>

                    <div className="tech-tags">
                        <span>Python</span>
                        <span>Playwright</span>
                        <span>BeautifulSoup</span>
                    </div>

                    <p>
                        Python tool that extracts and cleans structured web novel content,
                        handling messy HTML and turning it into readable formatted text.
                    </p>
                  </div>

                {/* ================= FREE FREE FREE ================= */}
                <div className="project">

                    <div className="video-container">
                        <iframe
                            width="100%"
                            height="300"
                            src="https://www.youtube.com/embed/CAeP5QStOrE?si=M8axOWtdfKER_7OF"
                            title="FREE FREE FREE Demo"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>

                        <h2>FREE FREE FREE</h2>

                    <div className="project-links">
                        <a
                            href="https://github.com/Rachiminoff/FREEFREEFREE"
                            target="_blank"
                            rel="noreferrer"
                            className="github-link"
                        >
                            <GitHubIcon />
                            <span>GitHub</span>
                        </a>
                    </div>

                    <div className="tech-tags">
                        <span>Godot</span>
                        <span>GDScript</span>
                        <span>Blender</span>
                    </div>

                    <p>
                        Story-driven desktop simulation game set inside a 2005 computer environment,
                        where a fake GTA IV leak installs a self-aware quarantine program that
                        manipulates the player through minigames, exploration, and narrative events.
                    </p>

                </div>
                {/* ================= WAIS WALLET ================= */}
                <div className="project">

                    <ImageSlider
                        images={[wais01, wais02, wais03]}
                        link="https://github.com/Rachiminoff/Wais_Wallet"
                        title="Wais Wallet"
                    />

                    <a
                        href="https://github.com/Rachiminoff/Wais_Wallet"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <h2>Wais Wallet</h2>
                    </a>

                    <div className="project-links">
                        <a
                            href="https://github.com/Rachiminoff/Wais_Wallet"
                            target="_blank"
                            rel="noreferrer"
                            className="github-link"
                        >
                            <GitHubIcon />
                            <span>GitHub</span>
                        </a>
                    </div>

                    <div className="tech-tags">
                        <span>TypeScript</span>
                        <span>React</span>
                        <span>Frontend</span>
                    </div>

                    <p>
                        Finance and wallet management app built with React and TypeScript,
                        focusing on clean UI, reusable components, and user-centered design.
                    </p>

                </div>
            </div>
        </div>
    );
}

export default Project;
