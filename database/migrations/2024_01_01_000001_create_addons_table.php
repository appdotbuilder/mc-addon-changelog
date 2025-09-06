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
        Schema::create('addons', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Name of the addon');
            $table->string('version')->comment('Version number');
            $table->string('download_link')->comment('URL to download the addon');
            $table->text('description')->nullable()->comment('Brief description of the addon');
            $table->string('image_url')->nullable()->comment('Screenshot or icon URL');
            $table->timestamps();
            
            $table->index('created_at');
            $table->index('name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addons');
    }
};