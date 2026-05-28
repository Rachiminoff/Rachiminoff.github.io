import React, { useState } from "react";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LockIcon from "@mui/icons-material/Lock";
import CloseIcon from "@mui/icons-material/Close";

import { supabase } from "../lib/supabase";

import logo from "../assets/images/logo.jpg";
import "../assets/styles/Footer.scss";

type Art = {
  id: string;
  image_url: string;
  title: string;
};

function Footer() {
  const [showModal, setShowModal] = useState(false);
  const [passcode, setPasscode] = useState("");

  const [arts, setArts] = useState<Art[]>([]);
  const [index, setIndex] = useState(0);
  const [unlocked, setUnlocked] = useState(false);

  // FETCH ARTS FROM SUPABASE
  const fetchArts = async () => {
    const { data, error } = await supabase
      .from("arts")
      .select("*")
      .order("created_at", { ascending: true });

    if (!error && data) {
      setArts(data);
      setIndex(0);
    }
  };

  const handleSubmit = async () => {
    if (passcode === "sining") {
      setUnlocked(true);
      await fetchArts();
    } else {
      alert("Incorrect Passcode");
    }
  };

  const nextArt = () => {
    setIndex((prev) => (prev + 1) % arts.length);
  };

  const prevArt = () => {
    setIndex((prev) => (prev - 1 + arts.length) % arts.length);
  };

  const closeModal = () => {
    setShowModal(false);
    setUnlocked(false);
    setPasscode("");
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-container">

          <div className="footer-logo">
            <img src={logo} alt="Logo" />
          </div>

          <div className="footer-content">
            <h2>Social Links</h2>

            <div className="footer-grid">

              <a href="https://github.com/Rachiminoff" target="_blank" rel="noreferrer" className="footer-card">
                <GitHubIcon />
                <span>Github</span>
              </a>

              <a href="https://www.linkedin.com/in/tanya-denise-yambao-9677223b9/" target="_blank" rel="noreferrer" className="footer-card">
                <LinkedInIcon />
                <span>LinkedIn</span>
              </a>

              <a href="https://youtube.com/@blacksheep-1g?si=-X2nDtK2kucyskWx" target="_blank" rel="noreferrer" className="footer-card">
                <YouTubeIcon />
                <span>YouTube</span>
              </a>

              <button
                className="footer-card admin-card"
                onClick={() => setShowModal(true)}
              >
                <LockIcon />
                <span>LOCK: ADMIN ACCESS ONLY</span>
              </button>

            </div>

            <div className="footer-bottom">
              <div className="copyright-icon">©</div>
              <div>
                <h3>Tanya Denise Yambao</h3>
                <p>2026. All Rights Reserved.</p>
              </div>
            </div>

          </div>
        </div>
      </footer>

      {/* MODAL */}
      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">

            <button className="close-btn" onClick={closeModal}>
              <CloseIcon />
            </button>

            {!unlocked ? (
              <>
                <LockIcon className="modal-lock" />
                <h2>Admin Access</h2>
                <p>Enter passcode to continue.</p>

                <input
                  type="password"
                  placeholder="Enter Passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                />

                <button className="submit-btn" onClick={handleSubmit}>
                  Unlock
                </button>
              </>
            ) : (
              <>
                {arts.length > 0 && (
                  <div className="art-viewer">

                    <img
                      src={arts[index].image_url}
                      alt={arts[index].title}
                    />

                    <p className="art-title">
                      {arts[index].title}
                    </p>

                    <div className="nav-buttons">
                      <button onClick={prevArt}>Previous</button>
                      <button onClick={nextArt}>Next</button>
                    </div>

                  </div>
                )}
              </>
            )}

          </div>
        </div>
      )}
    </>
  );
  
}

export default Footer;