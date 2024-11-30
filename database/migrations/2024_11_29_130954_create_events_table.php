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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            // user_id is a foreign key that references the id column on the users table
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            // event status
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            // event color
            $table->string('color')->nullable();
            $table->string('text_color')->nullable();
            // attach files to the event
            $table->json('files')->nullable();
            $table->string('time_zone')->default('UTC');
            $table->timestamp('start_date');
            $table->timestamp('end_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
