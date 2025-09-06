import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';

interface ChangelogEntry {
    id: number;
    type: string;
    title: string;
    description: string | null;
    order: number;
}

interface Addon {
    id: number;
    name: string;
    version: string;
    download_link: string;
    description: string | null;
    image_url: string | null;
}

interface Changelog {
    id: number;
    version: string;
    summary: string | null;
    download_link: string;
    created_at: string;
    addon: Addon;
    entries: ChangelogEntry[];
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    changelogs: {
        data: Changelog[];
        links: PaginationLink[];
        meta: Record<string, unknown>;
    };
    sort: string;
    [key: string]: unknown;
}

const ChangeTypeIcon: React.FC<{ type: string }> = ({ type }) => {
    const icons = {
        feature: '⚡',
        bug_fix: '🔧',
        improvement: '📈',
        removal: '🗑️',
        environment: '🌍'
    };
    return <span>{icons[type as keyof typeof icons] || '📝'}</span>;
};

const ChangelogModal: React.FC<{ changelog: Changelog; isOpen: boolean; onClose: () => void }> = ({ changelog, isOpen, onClose }) => {
    if (!isOpen) return null;

    const typeColors = {
        feature: 'change-type-feature',
        bug_fix: 'change-type-bug_fix',
        improvement: 'change-type-improvement',
        removal: 'change-type-removal',
        environment: 'change-type-environment'
    };

    return (
        <div className="fixed inset-0 z-50 minecraft-modal flex items-center justify-center p-4" onClick={onClose}>
            <div className="minecraft-card w-full max-w-4xl max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="minecraft-text text-lg text-green-400 mb-2">
                                🎮 {changelog.addon.name}
                            </h2>
                            <p className="minecraft-text text-sm text-blue-400">
                                Version: {changelog.version}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="minecraft-button bg-red-600 hover:bg-red-500"
                        >
                            ✖
                        </button>
                    </div>

                    {changelog.summary && (
                        <div className="mb-6 p-4 minecraft-card bg-gray-800">
                            <p className="minecraft-text text-xs text-gray-300">{changelog.summary}</p>
                        </div>
                    )}

                    <div className="max-h-96 overflow-y-auto mb-4">
                        <h3 className="minecraft-text text-md mb-4 text-yellow-400">📋 Changes:</h3>
                        <div className="space-y-3">
                            {changelog.entries.map((entry) => (
                                <div key={entry.id} className="minecraft-card p-4 bg-gray-900">
                                    <div className="flex items-start gap-3">
                                        <ChangeTypeIcon type={entry.type} />
                                        <div className="flex-1">
                                            <h4 className={`minecraft-text text-xs mb-2 ${typeColors[entry.type as keyof typeof typeColors] || 'text-white'}`}>
                                                {entry.title}
                                            </h4>
                                            {entry.description && (
                                                <p className="minecraft-text text-xs text-gray-400 leading-relaxed">
                                                    {entry.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-gray-600">
                        <a
                            href={changelog.download_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="minecraft-button bg-green-600 hover:bg-green-500 flex-1 text-center"
                        >
                            📥 Download
                        </a>
                        <button
                            onClick={onClose}
                            className="minecraft-button bg-gray-600 hover:bg-gray-500"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Welcome({ changelogs, sort }: Props) {
    const [selectedChangelog, setSelectedChangelog] = useState<Changelog | null>(null);
    const [language, setLanguage] = useState<'en' | 'id'>('en');

    const text = {
        en: {
            title: '🎮 Minecraft Addon Changelog',
            subtitle: 'Latest updates and changes for your favorite Minecraft addons',
            sort: 'Sort by:',
            newest: 'Newest',
            oldest: 'Oldest',
            noChangelogs: 'No changelogs available yet.',
            login: 'Admin Login',
            version: 'Version',
            released: 'Released',
            clickToView: 'Click to view details'
        },
        id: {
            title: '🎮 Changelog Addon Minecraft',
            subtitle: 'Update dan perubahan terbaru untuk addon Minecraft favorit Anda',
            sort: 'Urutkan:',
            newest: 'Terbaru',
            oldest: 'Terlama',
            noChangelogs: 'Belum ada changelog tersedia.',
            login: 'Login Admin',
            version: 'Versi',
            released: 'Dirilis',
            clickToView: 'Klik untuk melihat detail'
        }
    };

    const t = text[language];

    const handleSort = (newSort: string) => {
        router.get('/', { sort: newSort }, { preserveState: true });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <>
            <Head title={t.title} />
            
            <div className="min-h-screen minecraft-bg">
                {/* Header */}
                <div className="minecraft-card m-4 p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h1 className="minecraft-text text-2xl text-green-400 mb-2">
                                {t.title}
                            </h1>
                            <p className="minecraft-text text-sm text-gray-400">
                                {t.subtitle}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
                                className="minecraft-button bg-blue-600 hover:bg-blue-500"
                            >
                                {language === 'en' ? '🇮🇩 ID' : '🇺🇸 EN'}
                            </button>
                            <Link
                                href="/login"
                                className="minecraft-button bg-purple-600 hover:bg-purple-500"
                            >
                                🔐 {t.login}
                            </Link>
                        </div>
                    </div>

                    {/* Sort Controls */}
                    <div className="flex items-center gap-4">
                        <span className="minecraft-text text-xs text-gray-400">{t.sort}</span>
                        <button
                            onClick={() => handleSort('newest')}
                            className={`minecraft-button ${sort === 'newest' ? 'bg-green-600' : 'bg-gray-600 hover:bg-gray-500'}`}
                        >
                            {t.newest}
                        </button>
                        <button
                            onClick={() => handleSort('oldest')}
                            className={`minecraft-button ${sort === 'oldest' ? 'bg-green-600' : 'bg-gray-600 hover:bg-gray-500'}`}
                        >
                            {t.oldest}
                        </button>
                    </div>
                </div>

                {/* Changelog Grid */}
                <div className="p-4">
                    {changelogs.data.length === 0 ? (
                        <div className="minecraft-card p-8 text-center">
                            <p className="minecraft-text text-lg text-gray-400">
                                {t.noChangelogs}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {changelogs.data.map((changelog) => (
                                <div
                                    key={changelog.id}
                                    className="minecraft-card p-4 cursor-pointer"
                                    onClick={() => setSelectedChangelog(changelog)}
                                >
                                    {changelog.addon.image_url && (
                                        <div className="w-full h-32 mb-3 overflow-hidden minecraft-card">
                                            <img
                                                src={changelog.addon.image_url}
                                                alt={changelog.addon.name}
                                                className="w-full h-full object-cover"
                                                style={{ imageRendering: 'pixelated' }}
                                            />
                                        </div>
                                    )}
                                    
                                    <h3 className="minecraft-text text-sm text-green-400 mb-2">
                                        {changelog.addon.name}
                                    </h3>
                                    
                                    <div className="space-y-1 mb-3">
                                        <p className="minecraft-text text-xs text-blue-400">
                                            {t.version}: {changelog.version}
                                        </p>
                                        <p className="minecraft-text text-xs text-gray-400">
                                            {t.released}: {formatDate(changelog.created_at)}
                                        </p>
                                    </div>

                                    {changelog.summary && (
                                        <p className="minecraft-text text-xs text-gray-300 mb-3 line-clamp-2">
                                            {changelog.summary}
                                        </p>
                                    )}

                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {changelog.entries.slice(0, 3).map((entry) => (
                                            <span
                                                key={entry.id}
                                                className="text-xs px-2 py-1 minecraft-card bg-gray-800"
                                            >
                                                <ChangeTypeIcon type={entry.type} />
                                            </span>
                                        ))}
                                        {changelog.entries.length > 3 && (
                                            <span className="text-xs px-2 py-1 minecraft-card bg-gray-800">
                                                +{changelog.entries.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    <p className="minecraft-text text-xs text-yellow-400 text-center">
                                        {t.clickToView}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {changelogs.links && changelogs.links.length > 3 && (
                    <div className="p-4">
                        <div className="flex justify-center gap-2">
                            {changelogs.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`minecraft-button ${
                                        link.active 
                                            ? 'bg-green-600' 
                                            : link.url 
                                                ? 'bg-gray-600 hover:bg-gray-500' 
                                                : 'bg-gray-800 cursor-not-allowed'
                                    }`}
                                    preserveState
                                >
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Modal */}
                {selectedChangelog && (
                    <ChangelogModal
                        changelog={selectedChangelog}
                        isOpen={!!selectedChangelog}
                        onClose={() => setSelectedChangelog(null)}
                    />
                )}
            </div>
        </>
    );
}