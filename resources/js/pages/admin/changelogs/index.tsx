import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppLayout } from '@/components/app-layout';

interface Addon {
    id: number;
    name: string;
}

interface Changelog {
    id: number;
    version: string;
    summary: string | null;
    created_at: string;
    addon: Addon;
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
    [key: string]: unknown;
}

export default function ChangelogIndex({ changelogs }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AppLayout>
            <Head title="Manage Changelogs" />
            
            <div className="minecraft-bg min-h-screen p-6">
                <div className="minecraft-card p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="minecraft-text text-xl text-green-400">
                            🎮 Manage Changelogs
                        </h1>
                        <Link
                            href="/admin/changelogs/create"
                            className="minecraft-button bg-green-600 hover:bg-green-500"
                        >
                            📝 Add New Changelog
                        </Link>
                    </div>

                    {changelogs.data.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="minecraft-text text-gray-400 mb-4">
                                No changelogs created yet.
                            </p>
                            <Link
                                href="/admin/changelogs/create"
                                className="minecraft-button bg-green-600 hover:bg-green-500"
                            >
                                Create First Changelog
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {changelogs.data.map((changelog) => (
                                <div key={changelog.id} className="minecraft-card p-4 bg-gray-900">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="minecraft-text text-sm text-blue-400 mb-2">
                                                {changelog.addon.name} v{changelog.version}
                                            </h3>
                                            {changelog.summary && (
                                                <p className="minecraft-text text-xs text-gray-300 mb-2 line-clamp-2">
                                                    {changelog.summary}
                                                </p>
                                            )}
                                            <p className="minecraft-text text-xs text-gray-500">
                                                Created: {formatDate(changelog.created_at)}
                                            </p>
                                        </div>
                                        <div className="flex gap-2 ml-4">
                                            <Link
                                                href={`/admin/changelogs/${changelog.id}`}
                                                className="minecraft-button bg-blue-600 hover:bg-blue-500 text-xs"
                                            >
                                                👁️ View
                                            </Link>
                                            <Link
                                                href={`/admin/changelogs/${changelog.id}`}
                                                method="delete"
                                                as="button"
                                                className="minecraft-button bg-red-600 hover:bg-red-500 text-xs"
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
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {changelogs.links && changelogs.links.length > 3 && (
                        <div className="flex justify-center gap-2 mt-6">
                            {changelogs.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`minecraft-button text-xs ${
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
                    )}
                </div>
            </div>
        </AppLayout>
    );
}