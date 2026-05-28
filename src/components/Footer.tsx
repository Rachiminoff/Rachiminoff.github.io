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

  const [zoom, setZoom] = useState(1);

  // ================= FETCH =================

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

  // ================= LOGIN =================

  const handleSubmit = async () => {
    if (passcode === "sining") {
      setUnlocked(true);
      await fetchArts();
    } else {
      alert("Incorrect Passcode");
    }
  };

  // ================= NAVIGATION =================

  const nextArt = () => {
    setIndex((prev) => (prev + 1) % arts.length);
    setZoom(1);
  };

  const prevArt = () => {
    setIndex((prev) => (prev - 1 + arts.length) % arts.length);
    setZoom(1);
  };

  // ================= ZOOM =================

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 5));
  };

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.5));
  };

  const resetZoom = () => {
    setZoom(1);
  };

  // ================= CLOSE =================

  const closeModal = () => {
    setShowModal(false);
    setUnlocked(false);
    setPasscode("");
    setZoom(1);
  };

  return (
    <>
      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="footer-container">

          {/* LOGO */}

          <div className="footer-logo">
            <img src={logo} alt="Logo" />
          </div>

          {/* CONTENT */}

          <div className="footer-content">

            <h2>Social Links</h2>

            <div className="footer-grid">

              <a
                href="https://github.com/Rachiminoff"
                target="_blank"
                rel="noreferrer"
                className="footer-card"
              >
                <GitHubIcon />
                <span>Github</span>
              </a>

              <a
                href="https://www.linkedin.com/in/tanya-denise-yambao-9677223b9/"
                target="_blank"
                rel="noreferrer"
                className="footer-card"
              >
                <LinkedInIcon />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://youtube.com/@blacksheep-1g?si=-X2nDtK2kucyskWx"
                target="_blank"
                rel="noreferrer"
                className="footer-card"
              >
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

            {/* COPYRIGHT */}

            <div className="footer-bottom">

              <div className="copyright-icon">
                ©
              </div>

              <div>
                <h3>Tanya Denise Yambao</h3>
                <p>2026. All Rights Reserved.</p>
              </div>

            </div>

          </div>

        </div>

      </footer>

      {/* ================= MODAL ================= */}

      {showModal && (
        <div className="admin-modal-overlay">

          <div className={`admin-modal ${unlocked ? "viewer-open" : "locked"}`}>

            {/* CLOSE */}

            <button
              className="close-btn"
              onClick={closeModal}
            >
              <CloseIcon />
            </button>

            {/* ================= LOGIN ================= */}

            {!unlocked ? (
              <>

                <LockIcon className="modal-lock" />

                <h2>Admin Access</h2>

                <p>
                  Enter passcode to continue.
                </p>

                <input
                  type="password"
                  placeholder="Enter Passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                />

                <button
                  className="submit-btn"
                  onClick={handleSubmit}
                >
                  Unlock
                </button>

              </>
            ) : (
              <>
                {/* ================= ART VIEWER ================= */}

                {arts.length > 0 ? (

                  <div className="art-viewer">

                    {/* ================= SIDEBAR ================= */}

                    <div className="art-sidebar">

                      <div className="art-list">

                        {arts.map((art, i) => (
                          <button
                            key={art.id}
                            className={`art-item ${i === index ? "active" : ""}`}
                            onClick={() => {
                              setIndex(i);
                              setZoom(1);
                            }}
                          >

                            <img
                              src={art.image_url}
                              alt={art.title}
                            />

                            <div className="art-meta">
                              <h4>{art.title}</h4>
                              <p>Artwork #{i + 1}</p>
                            </div>

                          </button>
                        ))}

                      </div>

                    </div>

                    {/* ================= MAIN VIEWER ================= */}

                    <div className="art-main">

                      {/* TOOLBAR */}

                      <div className="viewer-toolbar">

                        <div className="viewer-title">
                          <h3>{arts[index].title}</h3>

                          <p>
                            {index + 1} / {arts.length}
                          </p>
                        </div>

                        <div className="viewer-controls">

                          <button onClick={prevArt}>
                            ←
                          </button>

                          <button onClick={nextArt}>
                            →
                          </button>

                          <button onClick={zoomOut}>
                            −
                          </button>

                          <div className="zoom-label">
                            {Math.round(zoom * 100)}%
                          </div>

                          <button onClick={zoomIn}>
                            +
                          </button>

                          <button onClick={resetZoom}>
                            Reset
                          </button>

                        </div>

                      </div>

                      {/* IMAGE VIEWER */}

                      <div className="viewer-canvas">

                        <div className="viewer-inner">

                          <img
                            src={arts[index].image_url}
                            alt={arts[index].title}
                            style={{
                              transform: `scale(${zoom})`
                            }}
                          />

                        </div>

                      </div>

                    </div>

                  </div>

                ) : (
                  <div className="empty-gallery">
                    No artworks found.
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