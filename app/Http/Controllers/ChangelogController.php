<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Changelog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChangelogController extends Controller
{
    /**
     * Display the changelog homepage.
     */
    public function index(Request $request)
    {
        $sort = $request->get('sort', 'newest');
        
        $query = Changelog::with(['addon', 'entries'])
            ->orderBy('created_at', $sort === 'oldest' ? 'asc' : 'desc');
        
        $changelogs = $query->paginate(12);

        return Inertia::render('welcome', [
            'changelogs' => $changelogs,
            'sort' => $sort,
        ]);
    }

    /**
     * Display the specified changelog.
     */
    public function show(Changelog $changelog)
    {
        $changelog->load(['addon', 'entries' => function ($query) {
            $query->orderBy('order');
        }]);

        return response()->json([
            'changelog' => $changelog,
        ]);
    }
}