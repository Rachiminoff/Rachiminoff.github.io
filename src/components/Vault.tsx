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

    const [viewerUrl, setViewerUrl] = useState<string | null>(null);
    const [viewerLoading, setViewerLoading] = useState(false);

    useEffect(() => {
        fetchVaultItems();
    }, []);

    // ESC key closes viewer
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeViewer();
        };

        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    const fetchVaultItems = async () => {
        setLoading(true);

        const { data, error } = await supabase
            .from("vault_items")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Supabase error:", error);
        } else {
            setVaultItems(data || []);
        }

        setLoading(false);
    };

    const openViewer = (url?: string) => {
        if (!url) return;

        setViewerLoading(true);

        let finalUrl = url;

        // Convert Google Drive link → embeddable viewer
        const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);

        if (match) {
            const fileId = match[1];
            finalUrl = `https://drive.google.com/file/d/${fileId}/preview`;
        }

        setViewerUrl(finalUrl);
        document.body.style.overflow = "hidden";
    };

    const closeViewer = () => {
        setViewerUrl(null);
        setViewerLoading(false);
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

                            <div className="vault-type">
                                {item.type}
                            </div>

                            <h2>
                                {item.link ? (
                                    <button
                                        className="vault-link-button"
                                        onClick={() => openViewer(item.link)}
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

            {/* ---------------- PDF / Document Viewer ---------------- */}

            {viewerUrl && (
                <div
                    className="pdf-viewer"
                    onClick={closeViewer}
                >
                    <button
                        className="close-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            closeViewer();
                        }}
                    >
                        ×
                    </button>

                    {viewerLoading && (
                        <div className="viewer-loading">
                            Loading document...
                        </div>
                    )}

                    <iframe
                        src={viewerUrl}
                        title="Vault Viewer"
                        onLoad={() => setViewerLoading(false)}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
}

export default Vault;