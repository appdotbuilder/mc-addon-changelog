<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreChangelogRequest;
use App\Models\Addon;
use App\Models\Changelog;
use App\Models\ChangelogEntry;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChangelogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $changelogs = Changelog::with('addon')
            ->latest()
            ->paginate(15);

        return Inertia::render('admin/changelogs/index', [
            'changelogs' => $changelogs,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $addons = Addon::select('id', 'name')->get();

        return Inertia::render('admin/changelogs/create', [
            'addons' => $addons,
            'changeTypes' => ChangelogEntry::TYPES,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreChangelogRequest $request)
    {
        $data = $request->validated();
        
        // Create or find addon
        if (isset($data['new_addon_name'])) {
            $addon = Addon::create([
                'name' => $data['new_addon_name'],
                'version' => $data['version'],
                'download_link' => $data['download_link'],
                'description' => $data['addon_description'] ?? null,
            ]);
        } else {
            $addon = Addon::findOrFail($data['addon_id']);
        }

        // Create changelog
        $changelog = Changelog::create([
            'addon_id' => $addon->id,
            'version' => $data['version'],
            'summary' => $data['summary'] ?? null,
            'download_link' => $data['download_link'],
        ]);

        // Create changelog entries
        if (isset($data['entries']) && is_array($data['entries'])) {
            foreach ($data['entries'] as $index => $entry) {
                ChangelogEntry::create([
                    'changelog_id' => $changelog->id,
                    'type' => $entry['type'],
                    'title' => $entry['title'],
                    'description' => $entry['description'] ?? null,
                    'order' => $index,
                ]);
            }
        }

        return redirect()->route('admin.changelogs.index')
            ->with('success', 'Changelog created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Changelog $changelog)
    {
        $changelog->load(['addon', 'entries' => function ($query) {
            $query->orderBy('order');
        }]);

        return Inertia::render('admin/changelogs/show', [
            'changelog' => $changelog,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Changelog $changelog)
    {
        $changelog->delete();

        return redirect()->route('admin.changelogs.index')
            ->with('success', 'Changelog deleted successfully.');
    }
}