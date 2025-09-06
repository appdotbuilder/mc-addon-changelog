<?php

use App\Http\Controllers\Admin;
use App\Http\Controllers\ChangelogController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Public changelog routes
Route::get('/', [ChangelogController::class, 'index'])->name('home');
Route::get('/changelog/{changelog}', [ChangelogController::class, 'show'])->name('changelog.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Admin changelog routes
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('changelogs', Admin\ChangelogController::class)->except(['edit', 'update']);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
