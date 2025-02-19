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
        Schema::table('course_contents', function (Blueprint $table) {
            $table->string('content_title');
            $table->integer('content_type')->nullable();
            $table->text('content_description')->nullable();
            $table->unsignedBigInteger('image_id')->nullable();
            $table->integer('ordering')->default(1);
            $table->foreignId('course_id')->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('course_contents', function (Blueprint $table) {
            $table->dropColumn('content_title');
            $table->dropColumn('content_type');
            $table->dropColumn('content_description');
            $table->dropColumn('image_id');
            $table->dropColumn('ordering');
            $table->dropForeign(['course_id']);
        });
    }
};
