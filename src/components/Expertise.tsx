import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import Chip from '@mui/material/Chip';
import '../assets/styles/Expertise.scss';

const labels = [
    "Python",
    "C++",
    "Java",
    "JavaScript",
    "HTML",
    "CSS",
    "React",
    "Dart",
    "Flutterflow",
];

function Expertise() {
    return (
        <div className="container" id="expertise">
            <div className="skills-container">
                <h1>Expertise</h1>
                <div className="skills-grid">
                    <div className="skill">
                        <FontAwesomeIcon icon={faReact} size="3x"/>
                        <h3>Software Development & Logic</h3>
                        <p>
                            I am a versatile developer focusing on the logical and technical aspects of projects. 
                            I have experience building and contributing to major projects, handling backend, frontend, and algorithmic logic across multiple languages and frameworks.
                        </p>
                        <div className="flex-chips">
                            <span className="chip-title">Languages & Frameworks:</span>
                            {labels.map((label, index) => (
                                <Chip key={index} className='chip' label={label} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Expertise;