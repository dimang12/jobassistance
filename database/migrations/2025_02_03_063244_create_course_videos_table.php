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
        Schema::create('course_videos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('course_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('created_by');
            $table->string('title');
            $table->string('path');
            $table->integer('video_length');
            $table->text('brief_description')->nullable();
            $table->text('full_description')->nullable();
            $table->text('references')->nullable();
            $table->text('bio')->nullable();
            $table->integer('watched')->default(0);
            $table->boolean('is_feature')->default(false);
            $table->boolean('is_publish')->default(false);
            $table->timestamp('modified_date')->nullable();

            $table->foreign('course_id')->references('id')->on('courses')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_videos');
    }
};
