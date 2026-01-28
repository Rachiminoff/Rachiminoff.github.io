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

  const rainbowKeyParts = ['l','e','t','m','e','i','n'];
  const rainbowKey = rainbowKeyParts.join('');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNameClick = () => {
    if (!isMobile) return;
    const newCount = nameClicks + 1;
    setNameClicks(newCount);
    if (newCount < 20) setTitleClicks(0);
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

  const handleVaultSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (vaultInput === rainbowKey) {
      setVaultUnlocked(true);
    } else {
      alert("Incorrect code!");
    }
    setVaultInput('');
    setShowVaultPrompt(false);
  };

  return (
    <div className="container">
      <div className="about-section">
        <div className="content">
          <div className="social_icons">
            <a href="https://github.com/Rachiminoff" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="placeholder" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          </div>

          <h1 onClick={handleNameClick} style={{ cursor: "pointer" }}>
            Tanya Denise Yambao
          </h1>
          <p onClick={handleTitleClick} style={{ cursor: "pointer" }}>
            Computer Science Student
          </p>

          {showVaultPrompt && (
            <form onSubmit={handleVaultSubmit} style={{ marginTop: '10px' }}>
              <input
                type="password"
                placeholder="Enter code"
                value={vaultInput}
                onChange={(e) => setVaultInput(e.target.value)}
                autoFocus
                style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <button type="submit" style={{ marginLeft: '5px', padding: '5px 10px' }}>Submit</button>
            </form>
          )}

          <div className="mobile_social_icons">
            <a href="https://github.com/Rachiminoff" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="placeholder" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          </div>
        </div>
      </div>
      {vaultUnlocked && <Vault />}
    </div>
  );
}

export default Main;
