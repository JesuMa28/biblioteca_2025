<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Domain\Zones\Models\Zone;
use Domain\Categories\Models\Category;
use Domain\Shelves\Models\Shelf;
use Database\Factories\ZoneFactory;

class ZoneSeeder extends Seeder {

    public function run(){

        Zone::truncate();
        Zone::factory()->count(8)->create();

    }

}