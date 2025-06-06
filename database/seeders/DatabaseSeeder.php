<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call([
            UserSeeder::class,
            PermissionSeeder::class,
            RoleSeeder::class,
            CategorySeeder::class,
            FloorSeeder::class,
            ZoneSeeder::class,
            ShelfSeeder::class,
            BookSeeder::class,
            BookCategoriesSeeder::class,
            LoanSeeder::class,
            ReservationSeeder::class,
        ]);

        //migrar pulse database

    }
}
