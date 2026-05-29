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

    status?: string;

    created_at?: string;
}

function Vault() {

    const [vaultItems, setVaultItems] = useState<VaultItem[]>([]);

    const [loading, setLoading] = useState(true);

    const [viewerUrl, setViewerUrl] =
        useState<string | null>(null);

    const [activeCard, setActiveCard] =
        useState<number | null>(null);

    useEffect(() => {

        fetchVaultItems();

    }, []);

    const fetchVaultItems = async () => {

        setLoading(true);

        const { data, error } = await supabase
            .from("vault_items")
            .select("*")
            .order("created_at", {
                ascending: false
            });

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

        const match =
            url.match(/\/d\/([a-zA-Z0-9_-]+)/);

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

        <div
            className={`vault-container ${
                activeCard ? "vault-active" : ""
            }`}
        >

            {/* HEADER */}

            <div className="vault-header">

                <h1>Vault Library</h1>

                <div className="vault-intro">

                    <p>
                        Personal archive of preserved works,
                        unfinished fragments, and completed
                        creations.
                    </p>

                </div>

            </div>

            {/* LOADING */}

            {loading ? (

                <div className="vault-loading">

                    <div className="vault-loading-grid">

                        {[...Array(6)].map((_, index) => (

                            <div
                                key={index}
                                className="vault-skeleton-card"
                            >

                                <div className="vault-skeleton-image"></div>

                                <div className="vault-skeleton-line short"></div>

                                <div className="vault-skeleton-line"></div>

                                <div className="vault-skeleton-line"></div>

                            </div>

                        ))}

                    </div>

                    <p className="vault-loading-text">
                        Accessing archive...
                    </p>

                </div>

            ) : (

                <div className="vault-grid">

                    {vaultItems.map((item, index) => (

                        <div
                            key={item.id}
                            className={`
                                vault-book-card
                                ${index === 0 ? "new-entry" : ""}
                                ${item.status || ""}
                            `}
                            onMouseEnter={() =>
                                setActiveCard(item.id || null)
                            }
                            onMouseLeave={() =>
                                setActiveCard(null)
                            }
                        >

                            {/* GLOW */}

                            <div className="vault-card-glow"></div>

                            {/* NEW BADGE */}

                            {index === 0 && (

                                <div className="vault-new-badge">
                                    NEW ENTRY
                                </div>

                            )}

                            {/* IMAGE */}

                            <div className="vault-book-image-wrapper">

                                {item.image ? (

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="vault-book-image"
                                        loading="lazy"
                                    />

                                ) : (

                                    <div className="vault-image-placeholder">

                                        <span>
                                            ARCHIVE
                                        </span>

                                    </div>

                                )}

                            </div>

                            {/* CONTENT */}

                            <div className="vault-book-content">

                                {/* ENTRY ID */}

                                <span className="vault-id">

                                    ARCHIVE ENTRY #

                                    {String(item.id || 0)
                                        .padStart(3, "0")}

                                </span>

                                {/* TITLE */}

                                <h2>

                                    {item.link ? (

                                        <button
                                            className="vault-book-title"
                                            onClick={() =>
                                                openViewer(item.link)
                                            }
                                        >

                                            {item.name}

                                        </button>

                                    ) : (

                                        item.name

                                    )}

                                </h2>

                                {/* META */}

                                <div className="vault-meta-row">

                                    <span>
                                        {item.type}
                                    </span>

                                    <span>•</span>

                                    <span>
                                        Private Archive
                                    </span>

                                    {item.created_at && (

                                        <>

                                            <span>•</span>

                                            <span>

                                                {new Date(
                                                    item.created_at
                                                ).getFullYear()}

                                            </span>

                                        </>

                                    )}

                                </div>

                                {/* DESCRIPTION */}

                                <p className="vault-book-description">

                                    {item.description}

                                </p>

                                {/* TAG */}

                                <div className="vault-book-tags">

                                    <span>

                                        {item.type}

                                    </span>

                                </div>

                                {/* ACTION */}

                                {item.link && (

                                    <button
                                        className="vault-read-btn"
                                        onClick={() =>
                                            openViewer(item.link)
                                        }
                                    >

                                        Open Entry

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