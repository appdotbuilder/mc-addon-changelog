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
        Schema::create('changelog_entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('changelog_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['feature', 'bug_fix', 'improvement', 'removal', 'environment'])->comment('Type of change');
            $table->string('title')->comment('Title of the change');
            $table->text('description')->nullable()->comment('Detailed description of the change');
            $table->integer('order')->default(0)->comment('Display order');
            $table->timestamps();
            
            $table->index(['changelog_id', 'order']);
            $table->index('type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('changelog_entries');
    }
};