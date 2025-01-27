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
        Schema::table('courses', function (Blueprint $table) {
            $table->string('status')->nullable();
            $table->decimal('rating', 3, 2)->nullable();
            $table->integer('duration')->nullable();
            $table->string('instructor')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->dropColumn('status');
            $table->dropColumn('rating');
            $table->dropColumn('duration');
            $table->dropColumn('instructor');
        });
    }
};
