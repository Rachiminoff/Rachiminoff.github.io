import React, { useEffect, useState } from "react";
import "../assets/styles/Vault.scss";
import { supabase } from "../lib/supabase";

interface VaultItem {
    id?: number;
    name: string;
    type: string;
    description: string;
    link?: string;
    image?: string;
}

function Vault() {
    const [vaultItems, setVaultItems] = useState<VaultItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    useEffect(() => {
        fetchVaultItems();
    }, []);

    const fetchVaultItems = async () => {
        setLoading(true);

        const { data, error } = await supabase
            .from("vault_items")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error(error);
        } else {
            setVaultItems(data || []);
        }

        setLoading(false);
    };

    const openViewer = (url: string) => {
        if (!url) return;

        // Google Drive PDF handling
        const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);

        if (match) {
            const fileId = match[1];
            setPdfUrl(`https://drive.google.com/file/d/${fileId}/preview`);
        } else {
            // fallback: open normal URL inside iframe
            setPdfUrl(url);
        }

        document.body.style.overflow = "hidden";
    };

    const closeViewer = () => {
        setPdfUrl(null);
        document.body.style.overflow = "";
    };

    return (
        <div className="vault-container">
            <h1>Vault Library</h1>

            {loading ? (
                <p>Loading vault...</p>
            ) : (
                <div className="vault-grid">
                    {vaultItems.map((item) => (
                        <div key={item.id} className="vault-card">
                            {item.image && (
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="vault-image"
                                />
                            )}

                            <div className="vault-type">{item.type}</div>

                            <h2>
                                {item.link ? (
                                    <button
                                        className="vault-link-button"
                                        onClick={() => openViewer(item.link!)}
                                    >
                                        {item.name}
                                    </button>
                                ) : (
                                    item.name
                                )}
                            </h2>

                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            )}

            {pdfUrl && (
                <div className="pdf-viewer">
                    <button className="close-btn" onClick={closeViewer}>
                        ×
                    </button>

                    <iframe
                        src={pdfUrl}
                        frameBorder="0"
                        title="Viewer"
                    />
                </div>
            )}
        </div>
    );
}

export default Vault;