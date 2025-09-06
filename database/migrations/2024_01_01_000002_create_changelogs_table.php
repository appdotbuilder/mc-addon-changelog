<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('changelogs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('addon_id')->constrained()->onDelete('cascade');
            $table->string('version')->comment('Version for this changelog');
            $table->text('summary')->nullable()->comment('Brief summary of changes');
            $table->string('download_link')->comment('Download link for this version');
            $table->timestamps();
            
            $table->index(['addon_id', 'created_at']);
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('changelogs');
    }
};