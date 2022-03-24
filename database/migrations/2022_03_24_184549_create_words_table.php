<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('words', function (Blueprint $table) {
            $table->id();

            $table->string('word');
            $table->tinyInteger('variety')->nullable();
            $table->string('letter1')->nullable();
            $table->string('letter2')->nullable();
            $table->string('letter3')->nullable();
            $table->string('letter4')->nullable();
            $table->string('letter5')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('words');
    }
};
