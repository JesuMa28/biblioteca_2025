<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Domain\Reservations\Models\Reservation;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Reservation::factory()->count(10)->create();
    }
}
