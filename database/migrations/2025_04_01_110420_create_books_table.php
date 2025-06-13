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
            $table->year('published_year');
            $table->string('isbn');
            $table->integer('pages')->unsigned();
            $table->uuid('shelf_id');
            $table->foreign('shelf_id')->references('id')->on('shelves')->onDelete('cascade');
            $table->enum('status', ['Available', 'Loaned', 'Reserved'])->default('Available');
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
