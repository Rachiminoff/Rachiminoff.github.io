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

          {/* Product Engineering */}
          <div className="skill">
            <FontAwesomeIcon icon={faCode} size="3x" />
            <h3>Product Engineering</h3>
              <p>
                Building responsive web, mobile, and interactive applications with a focus on clean design, maintainable systems, and smooth user experience across devices. I enjoy turning ideas into functional interfaces, integrating APIs, and creating scalable frontend structures that remain consistent and adaptable as projects grow.
              </p>

              <p>
                I especially enjoy the iterative side of development—testing, debugging, refining, and gradually seeing features come together into something polished and reliable. The most rewarding part for me is reaching the point where a project feels complete and ready to be shared with others.
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
              {appDev.map((item, index) => (
                <Chip
                  key={`app-${index}`}
                  className="chip"
                  label={item.name}
                  icon={<FontAwesomeIcon icon={item.icon} />}
                />
              ))}
              {gameDev.map((item, index) => (
                <Chip
                  key={`game-${index}`}
                  className="chip"
                  label={item.name}
                  icon={<FontAwesomeIcon icon={item.icon} />}
                />
              ))}
            </div>
          </div>

          {/* Automation & Systems */}
          <div className="skill">
            <FontAwesomeIcon icon={faCode} size="3x" />
            <h3>Automation & Systems</h3>
                <p>
                Developing scripts and internal tools that automate repetitive workflows, streamline data processing, and improve overall efficiency. I enjoy building practical automation systems using Python and modern tooling for tasks such as web scraping, data extraction, content processing, and workflow management.
              </p>

              <p>
                My focus is on creating lightweight and reliable solutions that reduce manual effort while keeping systems organized, consistent, and easy to maintain across different types of workflows and environments.
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

        </div>
      </div>
    </div>
  );
}

export default Expertise;