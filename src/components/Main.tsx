import React, { useState } from "react";

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DescriptionIcon from '@mui/icons-material/Description';

import profilePic from '../assets/images/profile.jpeg';

import Vault from './Vault';
import PDFViewer from './PDFViewer';

import '../assets/styles/Main.scss';

function Main() {

    const [clickCount, setClickCount] = useState(0);

    const [showVaultPrompt, setShowVaultPrompt] = useState(false);

    const [vaultInput, setVaultInput] = useState('');

    const [vaultUnlocked, setVaultUnlocked] = useState(false);

    const [loading, setLoading] = useState(false);

    const [viewerUrl, setViewerUrl] = useState<string | null>(null);

    const handleSecretClick = () => {

        const newCount = clickCount + 1;

        setClickCount(newCount);

        // unlock trigger at 5 clicks

        if (newCount >= 5) {

            setShowVaultPrompt(true);

            setClickCount(0);

        }

    };

    const handleVaultSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        setLoading(true);

        try {

            const response = await fetch('/api/unlock', {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    password: vaultInput,
                }),

            });

            const data = await response.json();

            if (data.success) {

                setVaultUnlocked(true);

            } else if (data.locked) {

                alert(
                    `Vault access temporarily locked.\n\nPlease try again after:\n${new Date(
                        data.lockedUntil
                    ).toLocaleString()}`
                );

            } else {

                alert(
                    `Incorrect code.\n${
                        data.remaining ?? 0
                    } attempt(s) remaining before lockout.`
                );

            }

        } catch (error) {

            console.error(error);

            alert("Something went wrong.");

        }

        setLoading(false);

        setVaultInput('');

        setShowVaultPrompt(false);

    };

    const openCVViewer = () => {

       setViewerUrl("/YambaoResume.pdf");;

    };

    const closeViewer = () => {

        setViewerUrl(null);

    };

    return (

        <div className="container">

            <div className="about-section">

                {/* Profile Picture */}

                <div className="image-wrapper">

                    <img
                        src={profilePic}
                        alt="Tanya Denise Yambao"
                    />

                </div>

                <div className="content">

                    {/* Desktop Socials */}

                    <div className="social_icons">

                        <a
                            href="https://github.com/Rachiminoff"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <GitHubIcon />
                        </a>

                        <a
                            href="https://www.linkedin.com/in/tanya-denise-yambao-9677223b9/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <LinkedInIcon />
                        </a>

                        <button
                            className="icon-btn"
                            onClick={openCVViewer}
                        >
                            <DescriptionIcon />
                        </button>

                    </div>

                    {/* CLICK TARGET */}

                    <h1
                        onClick={handleSecretClick}
                        style={{ cursor: "pointer" }}
                    >
                        Tanya Denise Yambao
                    </h1>

                    <p
                        onClick={handleSecretClick}
                        style={{ cursor: "pointer" }}
                    >
                        Full-Stack Developer (Product & Systems Focused)
                    </p>

                    {/* Mobile Socials */}

                    <div className="mobile_social_icons">

                        <a
                            href="https://github.com/Rachiminoff"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <GitHubIcon />
                        </a>

                        <a
                            href="https://www.linkedin.com/in/tanya-denise-yambao-9677223b9/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <LinkedInIcon />
                        </a>

                        <button
                            className="icon-btn"
                            onClick={openCVViewer}
                        >
                            <DescriptionIcon />
                        </button>

                    </div>

                    {/* Vault Prompt */}

                    {showVaultPrompt && (

                        <form
                            onSubmit={handleVaultSubmit}
                            className="vault-form"
                        >

                            <input
                                type="password"
                                placeholder="Enter code"
                                value={vaultInput}
                                onChange={(e) =>
                                    setVaultInput(e.target.value)
                                }
                                autoFocus
                                className="vault-input"
                            />

                            <button
                                type="submit"
                                className="vault-button"
                                disabled={loading}
                            >
                                {loading ? "Checking..." : "Unlock"}
                            </button>

                        </form>

                    )}

                </div>

            </div>

            {vaultUnlocked && <Vault />}

            {/* PDF VIEWER */}

            <PDFViewer
                url={viewerUrl}
                onClose={closeViewer}
            />

        </div>
    );
}

export default Main;