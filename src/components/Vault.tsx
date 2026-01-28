import React, { useState } from "react";
import '../assets/styles/Vault.scss';

interface VaultItem {
    name: string;
    type: string;
    description: string;
    link?: string;      // optional URL for text/web link
    pdf?: string;       // optional Google Drive PDF
    tech?: string[];
    image?: string;
}

const vaultItems: VaultItem[] = [
    {
        name: "少女妄想中。",
        type: "Translation",
        description: "A delusion, or fantasy?",
        pdf: "https://drive.google.com/file/d/1KZsFjCamOb-wWdVhMap1xNm9S9cT83Y_/view?usp=sharing",
        tech: ["Docs"],
        image: "https://m.media-amazon.com/images/I/71dkU5NMNgL._SL1500_.jpg"
    }
];

function Vault() {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    const openPdf = (url: string) => {
        const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (!match) {
            alert("Invalid PDF link");
            return;
        }
        const fileId = match[1];
        setPdfUrl(`https://drive.google.com/file/d/${fileId}/preview`);
        document.body.style.overflow = "hidden"; // prevent background scroll
    };

    const closeViewer = () => {
        setPdfUrl(null);
        document.body.style.overflow = "";
    };

    return (
        <div className="vault-container">
            <h1>Vault Library</h1>
            <div className="vault-grid">
                {vaultItems.map((item, idx) => (
                    <div key={idx} className="vault-card">
                        {item.image && <img src={item.image} alt={item.name} />}
                        <div className="vault-type">{item.type}</div>
                        <h2>
                            {item.pdf ? (
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        openPdf(item.pdf!);
                                    }}
                                >
                                    {item.name}
                                </a>
                            ) : item.link ? (
                                <a href={item.link} target="_blank" rel="noreferrer">
                                    {item.name}
                                </a>
                            ) : (
                                item.name
                            )}
                        </h2>
                        <p>{item.description}</p>
                        {item.tech && (
                            <div className="tech-tags">
                                {item.tech.map((tag, i) => <span key={i}>{tag}</span>)}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* PDF Viewer */}
            {pdfUrl && (
                <div className="pdf-viewer">
                    <button className="close-btn" onClick={closeViewer}>×</button>
                    <iframe src={pdfUrl} frameBorder="0" title="PDF Viewer"></iframe>
                </div>
            )}
        </div>
    );
}

export default Vault;