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
        // Altere a linha abaixo
        Schema::create('role_hierarchies', function (Blueprint $table) { // Adicione o "s" aqui
            $table->uuid('id')->primary();
            $table->foreignUuid('role_id')->constrained()->onDelete('cascade');
            $table->integer('level');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // E também aqui
        Schema::dropIfExists('role_hierarchies');
    }
};
