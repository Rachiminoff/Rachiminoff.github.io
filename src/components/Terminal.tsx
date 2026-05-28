import React from "react";
import "../assets/styles/Terminal.scss";

function Terminal() {
  return (
    <div className="terminal-section">

      {/* LEFT SIDE — TERMINAL */}
      <div className="terminal-container">
        <div className="terminal-window">

          <div className="terminal-topbar">
            <div className="terminal-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>

            <div className="terminal-title">
              td.yambao — python shell
            </div>
          </div>

          <div className="terminal-content">

            <div className="line blue">
              (td@yambao)-[~/about_me]
            </div>

            <div className="line">
              <span className="cyan">└─$ </span>
              <span className="white">python about.py</span>
            </div>

            <br />

            <div className="line gray">
              # loading personal profile...
            </div>

            <div className="line">
              <span className="blue">import</span>{" "}
              <span className="white">creativity</span>,{" "}
              <span className="white">engineering</span>,{" "}
              <span className="white">growth</span>
            </div>

            <br />
            <br />

            <div className="line">
              <span className="purple">class</span>{" "}
              <span className="yellow-text">AboutMe</span>:
            </div>

            <div className="indent">
              <span className="purple">def</span>{" "}
              <span className="yellow-text">__init__</span>(self):
            </div>

            <div className="indent2">
              <span className="white">self.identity = </span>
              <span className="green-text">
                "developer focused on building meaningful systems"
              </span>
            </div>

            <div className="indent2">
              <span className="white">self.interests = </span>
              <span className="green-text">
                "web apps, automation, UI/UX, scalable products"
              </span>
            </div>

            <div className="indent2">
              <span className="white">self.mindset = </span>
              <span className="green-text">
                "continuous learning through practical creation"
              </span>
            </div>

            <br />

            <div className="indent">
              <span className="purple">def</span>{" "}
              <span className="yellow-text">philosophy</span>(self):
            </div>

            <div className="indent2">
              <span className="purple">return</span>{" "}
              <span className="green-text">
                "build with purpose, improve with consistency"
              </span>
            </div>

            <br />

            <div className="line">
              <span className="white">
                result = AboutMe().philosophy()
              </span>
            </div>

            <div className="green-text">
              &gt;&gt; {`{`}result{`}`}<span className="cursor">█</span>
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT SIDE — ABOUT ME */}
      <div className="about-container">

        <h1 className="about-title">About Me</h1>

        <div className="about-line"></div>

        <p className="about-text">
        I enjoy the process of testing and debugging, even when it gets frustrating. There is something satisfying about going through broken logic, tracing issues, and gradually seeing a feature finally work the way it was intended. Ironically, that struggle is often the part I find most engaging in development.
        </p>

        <p className="about-text">
        I feel the most proud when a project is completed and I get to demo it to others. Seeing everything come together into a working system gives a strong sense of closure, especially after all the iterations and fixes along the way.
        </p>

      </div>
    </div>
  );
}

export default Terminal;