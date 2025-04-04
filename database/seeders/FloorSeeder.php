<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Domain\Floors\Models\Floor;
use Domain\Zones\Models\Zone;

class FloorSeeder extends Seeder {

    public function run(){

        Floor::truncate();
        Floor::factory()->count(5)->create();

    }

}