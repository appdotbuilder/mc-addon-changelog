import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppLayout } from '@/components/app-layout';

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

interface Props {
    changelog: Changelog;
    [key: string]: unknown;
}

export default function ShowChangelog({ changelog }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getTypeIcon = (type: string) => {
        const icons = {
            feature: '⚡',
            bug_fix: '🔧',
            improvement: '📈',
            removal: '🗑️',
            environment: '🌍'
        };
        return icons[type as keyof typeof icons] || '📝';
    };

    const getTypeColor = (type: string) => {
        const colors = {
            feature: 'change-type-feature',
            bug_fix: 'change-type-bug_fix',
            improvement: 'change-type-improvement',
            removal: 'change-type-removal',
            environment: 'change-type-environment'
        };
        return colors[type as keyof typeof colors] || 'text-white';
    };

    return (
        <AppLayout>
            <Head title={`${changelog.addon.name} v${changelog.version}`} />
            
            <div className="minecraft-bg min-h-screen p-6">
                <div className="minecraft-card p-6 max-w-4xl mx-auto">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="minecraft-text text-xl text-green-400 mb-2">
                                🎮 {changelog.addon.name}
                            </h1>
                            <p className="minecraft-text text-sm text-blue-400 mb-1">
                                Version: {changelog.version}
                            </p>
                            <p className="minecraft-text text-xs text-gray-500">
                                Created: {formatDate(changelog.created_at)}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Link
                                href="/admin/changelogs"
                                className="minecraft-button bg-gray-600 hover:bg-gray-500"
                            >
                                ← Back to List
                            </Link>
                            <Link
                                href={`/admin/changelogs/${changelog.id}`}
                                method="delete"
                                as="button"
                                className="minecraft-button bg-red-600 hover:bg-red-500"
                                onClick={(e) => {
                                    if (!confirm('Are you sure you want to delete this changelog?')) {
                                        e.preventDefault();
                                    }
                                }}
                            >
                                🗑️ Delete
                            </Link>
                        </div>
                    </div>

                    {/* Addon Info */}
                    {changelog.addon.description && (
                        <div className="minecraft-card p-4 bg-gray-900 mb-6">
                            <h3 className="minecraft-text text-sm text-yellow-400 mb-2">
                                📋 Addon Description
                            </h3>
                            <p className="minecraft-text text-xs text-gray-300">
                                {changelog.addon.description}
                            </p>
                        </div>
                    )}

                    {/* Summary */}
                    {changelog.summary && (
                        <div className="minecraft-card p-4 bg-gray-900 mb-6">
                            <h3 className="minecraft-text text-sm text-yellow-400 mb-2">
                                📝 Update Summary
                            </h3>
                            <p className="minecraft-text text-xs text-gray-300">
                                {changelog.summary}
                            </p>
                        </div>
                    )}

                    {/* Changes */}
                    <div className="minecraft-card p-4 bg-gray-900 mb-6">
                        <h3 className="minecraft-text text-sm text-yellow-400 mb-4">
                            🔄 Changes ({changelog.entries.length})
                        </h3>
                        <div className="space-y-3">
                            {changelog.entries.map((entry, index) => (
                                <div key={entry.id} className="minecraft-card p-4 bg-gray-800">
                                    <div className="flex items-start gap-3">
                                        <div className="flex items-center gap-2">
                                            <span className="minecraft-text text-xs text-gray-500">
                                                #{index + 1}
                                            </span>
                                            <span>{getTypeIcon(entry.type)}</span>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className={`minecraft-text text-xs mb-2 ${getTypeColor(entry.type)}`}>
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

                    {/* Download */}
                    <div className="minecraft-card p-4 bg-gray-900">
                        <h3 className="minecraft-text text-sm text-yellow-400 mb-3">
                            📥 Download
                        </h3>
                        <a
                            href={changelog.download_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="minecraft-button bg-green-600 hover:bg-green-500 block text-center"
                        >
                            Download {changelog.addon.name} v{changelog.version}
                        </a>
                        <p className="minecraft-text text-xs text-gray-500 mt-2 text-center">
                            {changelog.download_link}
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}