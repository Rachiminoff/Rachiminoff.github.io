import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faGamepad,
  faMobileAlt,
} from "@fortawesome/free-solid-svg-icons";

import {
  faReact,
  faHtml5,
  faCss3Alt,
  faJs,
  faPython,

} from "@fortawesome/free-brands-svg-icons";

import Chip from "@mui/material/Chip";
import "../assets/styles/Expertise.scss";


const webDev = [
  { name: "React", icon: faReact },
  { name: "HTML", icon: faHtml5 },
  { name: "CSS", icon: faCss3Alt },
  { name: "JavaScript", icon: faJs },
];

const appDev = [
  { name: "React Native", icon: faReact },
  { name: "FlutterFlow", icon: faMobileAlt },
];

const scripting = [
  { name: "Python", icon: faPython },
  { name: "Web Scraping", icon: faCode },
  { name: "HTML Parsing", icon: faCode },
];

const gameDev = [
  { name: "Godot", icon: faGamepad },
  { name: "Ren'Py", icon: faGamepad },
];

function Expertise() {
  return (
    <div className="container" id="expertise">
      <div className="skills-container">
        <h1>Expertise</h1>

        <div className="skills-grid">

          {/* Web Dev */}
          <div className="skill">
            <FontAwesomeIcon icon={faCode} size="3x" />
            <h3>Web Development</h3>
            <p>
              Building responsive and component-driven web applications with a focus on
              clean UI structure, reusable architecture, and seamless API integration.
              Emphasis is placed on performance, scalability, and maintainable frontend design.
            </p>

            <div className="flex-chips">
              <span className="chip-title">Stack:</span>
              {webDev.map((item, index) => (
                <Chip
                  key={index}
                  className="chip"
                  label={item.name}
                  icon={<FontAwesomeIcon icon={item.icon} />}
                />
              ))}
            </div>
          </div>

          {/* App Dev */}
          <div className="skill">
            <FontAwesomeIcon icon={faMobileAlt} size="3x" />
            <h3>Mobile & App Development</h3>
            <p>
              Developing cross-platform mobile applications with attention to intuitive UI flows,
              responsive layouts, and rapid prototyping. Focused on building functional apps
              that translate ideas into usable product experiences.
            </p>

            <div className="flex-chips">
              <span className="chip-title">Stack:</span>
              {appDev.map((item, index) => (
                <Chip
                  key={index}
                  className="chip"
                  label={item.name}
                  icon={<FontAwesomeIcon icon={item.icon} />}
                />
              ))}
            </div>
          </div>

          {/* Scripting */}
          <div className="skill">
            <FontAwesomeIcon icon={faCode} size="3x" />
            <h3>Scripting & Automation</h3>
            <p>
              Writing Python-based automation tools for data extraction, web scraping,
              and content processing. These scripts streamline repetitive workflows
              and handle both structured and messy datasets efficiently.
            </p>

            <div className="flex-chips">
              <span className="chip-title">Stack:</span>
              {scripting.map((item, index) => (
                <Chip
                  key={index}
                  className="chip"
                  label={item.name}
                  icon={<FontAwesomeIcon icon={item.icon} />}
                />
              ))}
            </div>
          </div>

          {/* Game Dev */}
          <div className="skill">
            <FontAwesomeIcon icon={faGamepad} size="3x" />
            <h3>Game Development</h3>
            <p>
              Creating small-scale games and narrative-driven visual novels with an emphasis on
              gameplay logic, branching story structures, and interactive systems.
              Focused on blending storytelling with functional game mechanics.
            </p>

            <div className="flex-chips">
              <span className="chip-title">Tools:</span>
              {gameDev.map((item, index) => (
                <Chip
                  key={index}
                  className="chip"
                  label={item.name}
                  icon={<FontAwesomeIcon icon={item.icon} />}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Expertise;