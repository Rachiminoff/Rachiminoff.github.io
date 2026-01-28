import React from "react";
import '../assets/styles/Project.scss';

function Project() {
    return(
    <div className="projects-container" id="projects">
        <h1>Personal Projects</h1>
        <div className="projects-grid">

            <div className="project">
                <a href="https://github.com/Skabeez/UniQuest" target="_blank" rel="noreferrer">
                    <h2>UniQuest</h2>
                </a>
                <div className="tech-tags">
                    <span>FlutterFlow</span>
                    <span>Dart</span>
                </div>
                <p>
                    University companion app featuring task tracking, missions, and utility features.
                    Built with FlutterFlow and Dart, demonstrating cross-platform app logic and development.
                </p>
            </div>

            <div className="project">
                <a href="https://github.com/Rachiminoff/Webnovel-Extractor" target="_blank" rel="noreferrer">
                    <h2>Webnovel Extractor</h2>
                </a>
                    <div className="tech-tags">
                        <span>Python</span>
                        <span>Playwright</span>
                        <span>BeautifulSoup</span>
                    </div>
                <p>
                    Python tool that extracts and cleans structured text from web novel sites,
                    designed to streamline parsing messy HTML content.
                </p>
            </div>

            <div className="project">
                <a href="https://github.com/Rachiminoff/Wais_Wallet" target="_blank" rel="noreferrer">
                    <h2>Wais Wallet</h2>
                </a>
                <div className="tech-tags">
                    <span>TypeScript</span>
                    <span>React</span>
                    <span>Frontend</span>
                </div>
                <p>
                    Wallet/finance application built with TypeScript. Excellent example of
                    frontend logic and user‑focused features.
                </p>
            </div>

            <div className="project">
                <a href="https://github.com/Rachiminoff/CPU_Scheduling_Algorithms" target="_blank" rel="noreferrer">
                    <h2>CPU Scheduling Algorithms</h2>
                </a>
                <div className="tech-tags">
                    <span>C++</span>
                    <span>Turbo C++</span>
                    <span>Algorithms</span>
                </div>
                <p>
                    Interactive calculator of classic CPU scheduling methods implemented in C++,
                    demonstrating foundational computer science concepts.
                </p>
            </div>

        </div>
    </div>
    );
}

export default Project;