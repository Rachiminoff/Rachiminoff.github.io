import React, { useState, useEffect } from "react";

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import Vault from './Vault';

import '../assets/styles/Main.scss';

function Main() {

    const [nameClicks, setNameClicks] = useState(0);
    const [titleClicks, setTitleClicks] = useState(0);

    const [showVaultPrompt, setShowVaultPrompt] = useState(false);

    const [vaultInput, setVaultInput] = useState('');
    const [vaultUnlocked, setVaultUnlocked] = useState(false);

    const [isMobile, setIsMobile] = useState(false);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    const handleNameClick = () => {

        if (!isMobile) return;

        const newCount = nameClicks + 1;

        setNameClicks(newCount);

        if (newCount < 20) {
            setTitleClicks(0);
        }
    };

    const handleTitleClick = () => {

        if (!isMobile) return;

        if (nameClicks >= 20) {

            const newCount = titleClicks + 1;

            setTitleClicks(newCount);

            if (newCount >= 10) {

                setShowVaultPrompt(true);

                setNameClicks(0);
                setTitleClicks(0);
            }
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

            } else {

                alert("Incorrect code!");

            }

        } catch (error) {

            console.error(error);

            alert("Something went wrong.");

        }

        setLoading(false);

        setVaultInput('');
        setShowVaultPrompt(false);
    };

    return (

        <div className="container">

            <div className="about-section">

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

                    </div>

                    {/* Name */}

                    <h1
                        onClick={handleNameClick}
                        style={{ cursor: "pointer" }}
                    >
                        Tanya Denise Yambao
                    </h1>

                    {/* Title */}

                    <p
                        onClick={handleTitleClick}
                        style={{ cursor: "pointer" }}
                    >
                        Computer Science Student
                    </p>

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

                    </div>

                </div>

            </div>

            {/* Vault */}

            {vaultUnlocked && <Vault />}

        </div>
    );
}

export default Main;