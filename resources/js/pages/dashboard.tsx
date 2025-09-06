import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppLayout } from '@/components/app-layout';

export default function Dashboard() {
    return (
        <AppLayout>
            <Head title="Admin Dashboard" />
            
            <div className="p-6">
                <div className="minecraft-card p-6 max-w-4xl mx-auto">
                    <h1 className="minecraft-text text-xl text-green-400 mb-6">
                        🎮 Admin Dashboard
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Changelog Management */}
                        <div className="minecraft-card p-6 bg-gray-900">
                            <h2 className="minecraft-text text-lg text-blue-400 mb-4">
                                📝 Changelog Management
                            </h2>
                            <p className="minecraft-text text-xs text-gray-300 mb-4">
                                Create and manage changelog entries for your Minecraft addons.
                            </p>
                            <div className="space-y-2">
                                <Link
                                    href="/admin/changelogs"
                                    className="minecraft-button bg-purple-600 hover:bg-purple-500 block text-center"
                                >
                                    View All Changelogs
                                </Link>
                                <Link
                                    href="/admin/changelogs/create"
                                    className="minecraft-button bg-green-600 hover:bg-green-500 block text-center"
                                >
                                    Create New Changelog
                                </Link>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="minecraft-card p-6 bg-gray-900">
                            <h2 className="minecraft-text text-lg text-yellow-400 mb-4">
                                📊 Quick Info
                            </h2>
                            <div className="space-y-3">
                                <div className="minecraft-card p-3 bg-gray-800">
                                    <p className="minecraft-text text-xs text-green-400">
                                        🎯 Welcome to the admin panel!
                                    </p>
                                </div>
                                <div className="minecraft-card p-3 bg-gray-800">
                                    <p className="minecraft-text text-xs text-blue-400">
                                        📋 Manage your addon changelogs here
                                    </p>
                                </div>
                                <div className="minecraft-card p-3 bg-gray-800">
                                    <p className="minecraft-text text-xs text-purple-400">
                                        🌐 Multi-language support available
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Public Site Link */}
                        <div className="minecraft-card p-6 bg-gray-900">
                            <h2 className="minecraft-text text-lg text-green-400 mb-4">
                                🌐 Public Site
                            </h2>
                            <p className="minecraft-text text-xs text-gray-300 mb-4">
                                View the public changelog page that visitors see.
                            </p>
                            <Link
                                href="/"
                                className="minecraft-button bg-blue-600 hover:bg-blue-500 block text-center"
                            >
                                Visit Public Site
                            </Link>
                        </div>

                        {/* Help */}
                        <div className="minecraft-card p-6 bg-gray-900">
                            <h2 className="minecraft-text text-lg text-red-400 mb-4">
                                ❓ Help
                            </h2>
                            <div className="space-y-2">
                                <p className="minecraft-text text-xs text-gray-300">
                                    • Create changelogs for your addons
                                </p>
                                <p className="minecraft-text text-xs text-gray-300">
                                    • Add multiple change entries per version
                                </p>
                                <p className="minecraft-text text-xs text-gray-300">
                                    • Organize changes by type (features, bugs, etc.)
                                </p>
                                <p className="minecraft-text text-xs text-gray-300">
                                    • Users can view details in modal popups
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}