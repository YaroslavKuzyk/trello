<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('boards', function (Blueprint $table) {
            $table->foreignId('background_file_id')->nullable()->constrained('files')->restrictOnDelete();
            $table->index('background_file_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table(
            'boards',
            function (Blueprint $table) {
                $table->dropForeign(['background_file_id']);
                $table->dropColumn('background_file_id');
            }
        );
    }
};
