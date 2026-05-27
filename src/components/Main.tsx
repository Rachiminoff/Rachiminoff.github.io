import React, { useState } from "react";

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import Vault from './Vault';
import '../assets/styles/Main.scss';

function Main() {

    const [clickCount, setClickCount] = useState(0);

    const [showVaultPrompt, setShowVaultPrompt] = useState(false);

    const [vaultInput, setVaultInput] = useState('');
    const [vaultUnlocked, setVaultUnlocked] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleSecretClick = () => {
        const newCount = clickCount + 1;
        setClickCount(newCount);

        // unlock trigger at 5 clicks
        if (newCount >= 5) {
            setShowVaultPrompt(true);
            setClickCount(0);
        }
    };

    const handleVaultSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

                    {/* Socials */}
                    <div className="social_icons">
                        <a href="https://github.com/Rachiminoff" target="_blank" rel="noreferrer">
                            <GitHubIcon />
                        </a>

                        <a href="https://www.linkedin.com/in/tanya-denise-yambao-9677223b9/" target="_blank" rel="noreferrer">
                            <LinkedInIcon />
                        </a>
                    </div>

                    {/* CLICK TARGET (now works on PC + mobile) */}
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
                                onChange={(e) => setVaultInput(e.target.value)}
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

        </div>
    );
}

export default Main;