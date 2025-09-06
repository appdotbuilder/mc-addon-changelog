import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { AppLayout } from '@/components/app-layout';

interface Addon {
    id: number;
    name: string;
}

interface ChangelogEntry {
    type: string;
    title: string;
    description: string;
}



interface Props {
    addons: Addon[];
    changeTypes: Record<string, string>;
    [key: string]: unknown;
}

export default function CreateChangelog({ addons, changeTypes }: Props) {
    const [useExistingAddon, setUseExistingAddon] = useState(true);

    const { data, setData, post, processing, errors } = useForm({
        addon_id: '',
        new_addon_name: '',
        addon_description: '',
        version: '',
        summary: '',
        download_link: '',
        entries: [{ type: 'feature', title: '', description: '' }]
    });

    const addEntry = () => {
        setData('entries', [...data.entries, { type: 'feature', title: '', description: '' }]);
    };

    const removeEntry = (index: number) => {
        const newEntries = data.entries.filter((_, i) => i !== index);
        setData('entries', newEntries);
    };

    const updateEntry = (index: number, field: keyof ChangelogEntry, value: string) => {
        const newEntries = [...data.entries];
        newEntries[index] = { ...newEntries[index], [field]: value };
        setData('entries', newEntries);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/changelogs');
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

    return (
        <AppLayout>
            <Head title="Create Changelog" />
            
            <div className="minecraft-bg min-h-screen p-6">
                <div className="minecraft-card p-6 max-w-4xl mx-auto">
                    <h1 className="minecraft-text text-xl text-green-400 mb-6">
                        📝 Create New Changelog
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Addon Selection */}
                        <div>
                            <label className="minecraft-text text-sm text-yellow-400 block mb-3">
                                Addon Selection
                            </label>
                            <div className="space-y-3">
                                <div>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={useExistingAddon}
                                            onChange={() => setUseExistingAddon(true)}
                                            className="minecraft-input w-4 h-4"
                                        />
                                        <span className="minecraft-text text-xs">Use Existing Addon</span>
                                    </label>
                                    {useExistingAddon && (
                                        <select
                                            value={data.addon_id || ''}
                                            onChange={(e) => setData('addon_id', e.target.value)}
                                            className="minecraft-input w-full mt-2"
                                        >
                                            <option value="">Select an addon...</option>
                                            {addons.map((addon) => (
                                                <option key={addon.id} value={addon.id}>
                                                    {addon.name}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>

                                <div>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={!useExistingAddon}
                                            onChange={() => setUseExistingAddon(false)}
                                            className="minecraft-input w-4 h-4"
                                        />
                                        <span className="minecraft-text text-xs">Create New Addon</span>
                                    </label>
                                    {!useExistingAddon && (
                                        <div className="mt-2 space-y-2">
                                            <input
                                                type="text"
                                                placeholder="New addon name..."
                                                value={data.new_addon_name}
                                                onChange={(e) => setData('new_addon_name', e.target.value)}
                                                className="minecraft-input w-full"
                                            />
                                            <textarea
                                                placeholder="Addon description (optional)..."
                                                value={data.addon_description}
                                                onChange={(e) => setData('addon_description', e.target.value)}
                                                className="minecraft-input w-full h-20 resize-none"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            {'addon_selection' in errors && (
                                <div className="minecraft-text text-xs text-red-400 mt-1">
                                    {(errors as Record<string, string>).addon_selection}
                                </div>
                            )}
                        </div>

                        {/* Version */}
                        <div>
                            <label className="minecraft-text text-sm text-yellow-400 block mb-2">
                                Version *
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., 1.0.0, v2.1.3"
                                value={data.version}
                                onChange={(e) => setData('version', e.target.value)}
                                className="minecraft-input w-full"
                                required
                            />
                            {errors.version && (
                                <div className="minecraft-text text-xs text-red-400 mt-1">
                                    {errors.version}
                                </div>
                            )}
                        </div>

                        {/* Download Link */}
                        <div>
                            <label className="minecraft-text text-sm text-yellow-400 block mb-2">
                                Download Link *
                            </label>
                            <input
                                type="url"
                                placeholder="https://example.com/download"
                                value={data.download_link}
                                onChange={(e) => setData('download_link', e.target.value)}
                                className="minecraft-input w-full"
                                required
                            />
                            {errors.download_link && (
                                <div className="minecraft-text text-xs text-red-400 mt-1">
                                    {errors.download_link}
                                </div>
                            )}
                        </div>

                        {/* Summary */}
                        <div>
                            <label className="minecraft-text text-sm text-yellow-400 block mb-2">
                                Summary (Optional)
                            </label>
                            <textarea
                                placeholder="Brief description of this update..."
                                value={data.summary}
                                onChange={(e) => setData('summary', e.target.value)}
                                className="minecraft-input w-full h-20 resize-none"
                            />
                        </div>

                        {/* Changelog Entries */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="minecraft-text text-sm text-yellow-400">
                                    Changes *
                                </label>
                                <button
                                    type="button"
                                    onClick={addEntry}
                                    className="minecraft-button bg-green-600 hover:bg-green-500 text-xs"
                                >
                                    ➕ Add Change
                                </button>
                            </div>

                            <div className="space-y-4">
                                {data.entries.map((entry, index) => (
                                    <div key={index} className="minecraft-card p-4 bg-gray-900">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="minecraft-text text-xs text-blue-400">
                                                Change #{index + 1}
                                            </span>
                                            {data.entries.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeEntry(index)}
                                                    className="minecraft-button bg-red-600 hover:bg-red-500 text-xs"
                                                >
                                                    🗑️
                                                </button>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <div>
                                                <label className="minecraft-text text-xs text-gray-400 block mb-1">
                                                    Type
                                                </label>
                                                <select
                                                    value={entry.type}
                                                    onChange={(e) => updateEntry(index, 'type', e.target.value)}
                                                    className="minecraft-input w-full"
                                                >
                                                    {Object.entries(changeTypes).map(([key, label]) => (
                                                        <option key={key} value={key}>
                                                            {getTypeIcon(key)} {label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="minecraft-text text-xs text-gray-400 block mb-1">
                                                    Title *
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Brief description of the change..."
                                                    value={entry.title}
                                                    onChange={(e) => updateEntry(index, 'title', e.target.value)}
                                                    className="minecraft-input w-full"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="minecraft-text text-xs text-gray-400 block mb-1">
                                                    Description (Optional)
                                                </label>
                                                <textarea
                                                    placeholder="Detailed description..."
                                                    value={entry.description}
                                                    onChange={(e) => updateEntry(index, 'description', e.target.value)}
                                                    className="minecraft-input w-full h-16 resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {errors.entries && (
                                <div className="minecraft-text text-xs text-red-400 mt-2">
                                    {errors.entries}
                                </div>
                            )}
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex gap-4 pt-6 border-t border-gray-600">
                            <button
                                type="submit"
                                disabled={processing}
                                className="minecraft-button bg-green-600 hover:bg-green-500 flex-1"
                            >
                                {processing ? '⏳ Creating...' : '✅ Create Changelog'}
                            </button>
                            <button
                                type="button"
                                onClick={() => router.get('/admin/changelogs')}
                                className="minecraft-button bg-gray-600 hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}