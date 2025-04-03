<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // editorial e idioma
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->string('title');
            $table->string('author');
            $table->string('editorial');
            $table->string('language');
            $table->string('category_name');
            $table->year('published_year');
            $table->string('isbn')->unique();
            $table->integer('pages')->unsigned();
            $table->foreignId('shelf_id')->constrained('shelves')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
