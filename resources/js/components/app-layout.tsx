import React from 'react';
import { Link, usePage } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface SharedData {
    auth: {
        user: User | null;
    };
    flash: {
        success?: string;
        error?: string;
    };
    [key: string]: unknown;
}

interface Props {
    children: React.ReactNode;
}

export function AppLayout({ children }: Props) {
    const { auth, flash } = usePage<SharedData>().props;

    return (
        <div className="min-h-screen minecraft-bg">
            {/* Navigation */}
            <nav className="minecraft-card m-4 p-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="minecraft-text text-lg text-green-400 hover:text-green-300"
                        >
                            🎮 Minecraft Changelog
                        </Link>
                        {auth.user && (
                            <div className="flex gap-2">
                                <Link
                                    href="/dashboard"
                                    className="minecraft-button bg-blue-600 hover:bg-blue-500 text-xs"
                                >
                                    📊 Dashboard
                                </Link>
                                <Link
                                    href="/admin/changelogs"
                                    className="minecraft-button bg-purple-600 hover:bg-purple-500 text-xs"
                                >
                                    📝 Changelogs
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <div className="flex items-center gap-2">
                                <span className="minecraft-text text-xs text-yellow-400">
                                    👤 {auth.user.name}
                                </span>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="minecraft-button bg-red-600 hover:bg-red-500 text-xs"
                                >
                                    🚪 Logout
                                </Link>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="minecraft-button bg-green-600 hover:bg-green-500 text-xs"
                            >
                                🔐 Login
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Flash Messages */}
            {flash.success && (
                <div className="m-4 minecraft-card p-4 bg-green-900 border-green-500">
                    <p className="minecraft-text text-xs text-green-300">
                        ✅ {flash.success}
                    </p>
                </div>
            )}

            {flash.error && (
                <div className="m-4 minecraft-card p-4 bg-red-900 border-red-500">
                    <p className="minecraft-text text-xs text-red-300">
                        ❌ {flash.error}
                    </p>
                </div>
            )}

            {/* Main Content */}
            <main>
                {children}
            </main>
        </div>
    );
}