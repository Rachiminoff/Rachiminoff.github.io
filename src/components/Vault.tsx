import React, { useEffect, useState } from "react";

import "../assets/styles/Vault.scss";

import { supabase } from "../lib/supabase";

import PDFViewer from "./PDFViewer";

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

    const openViewer = (url?: string) => {

        if (!url) return;

        let finalUrl = url;

        // GOOGLE DRIVE EMBED SUPPORT

        const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);

        if (match) {

            const fileId = match[1];

            finalUrl =
                `https://drive.google.com/file/d/${fileId}/preview`;

        }

        setViewerUrl(finalUrl);

    };

    const closeViewer = () => {

        setViewerUrl(null);

    };

    return (

        <div className="vault-container">

            <h1>Vault Library</h1>

            {loading ? (

                <p>Loading vault...</p>

            ) : (

                <div className="vault-grid">

                    {vaultItems.map((item) => (

                        <div
                            key={item.id}
                            className="vault-book-card"
                        >

                            {/* IMAGE */}

                            <div className="vault-book-image-wrapper">

                                {item.image && (

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="vault-book-image"
                                    />

                                )}

                            </div>

                            {/* CONTENT */}

                            <div className="vault-book-content">

                                <h2>

                                    {item.link ? (

                                        <button
                                            className="vault-book-title"
                                            onClick={() => openViewer(item.link)}
                                        >
                                            {item.name}
                                        </button>

                                    ) : (
                                        item.name
                                    )}

                                </h2>

                                <p className="vault-book-description">
                                    {item.description}
                                </p>

                                <div className="vault-book-tags">
                                    <span>{item.type}</span>
                                </div>

                                {item.link && (

                                    <button
                                        className="vault-read-btn"
                                        onClick={() => openViewer(item.link)}
                                    >
                                        Read Now
                                    </button>

                                )}

                            </div>

                        </div>

                    ))}

                </div>

            )}

            {/* PDF VIEWER */}

            <PDFViewer
                url={viewerUrl}
                onClose={closeViewer}
            />

        </div>
    );
}

export default Vault;