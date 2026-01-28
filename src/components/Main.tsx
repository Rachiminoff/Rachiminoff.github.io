import React, { useState } from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Vault from './Vault'; 
import '../assets/styles/Main.scss';

function Main() {
  const [clickCount, setClickCount] = useState(0);
  const [showVaultPrompt, setShowVaultPrompt] = useState(false);
  const [vaultCode, setVaultCode] = useState('');
  const [vaultUnlocked, setVaultUnlocked] = useState(false); 
  const secretCode = "letmein"; 

  const handleNameClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= 8) {
      setShowVaultPrompt(true);
      setClickCount(0); 
    }
  };

  const handleVaultSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (vaultCode === secretCode) {
      setVaultUnlocked(true);  
    } else {
      alert("Incorrect code!");
    }
    setVaultCode('');
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
          <p>Computer Science Student</p>

          {showVaultPrompt && (
            <form onSubmit={handleVaultSubmit} style={{ marginTop: '10px' }}>
              <input
                type="password"
                placeholder="Enter the secret code"
                value={vaultCode}
                onChange={(e) => setVaultCode(e.target.value)}
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
