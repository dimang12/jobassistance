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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->string('proFirstName');
            $table->string('proLastName');
            $table->string('proPosition');
            $table->text('proAboutMe')->nullable();
            $table->string('proAvatar')->nullable();
            $table->string('proEmail')->unique();
            $table->string('proPhone')->nullable();
            $table->string('proLinkedIn')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
