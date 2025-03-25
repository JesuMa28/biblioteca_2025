<?php

namespace Database\Seeders;

use Domain\Roles\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // Cleaning Table
        Role::truncate();

        // Admin Perms
        Role::create([
            'name' => 'admin',
            'display_name' => 'Administrador',
            'description' => 'Administrador de la aplicación',
            'guard_name' => 'web',
            'system' => true,

        ])->givePermissionTo([
            'users.view',
            'users.create',
            'users.edit',
            'users.delete',
            'products.view',
            'products.create',
            'products.edit',
            'products.delete',
            'reports.view',
            'reports.export',
            'reports.import',
            'settings.access',
            'settings.modify',
        ]);

        // Users Perms
        Role::create([
            'name' => 'user',
            'display_name' => 'Usuario',
            'description' => 'Usuario predeterminado de la Aplicación',
            'guard_name' => 'web',
            'system' => true,
        ])->givePermissionTo([
            'users.view',
            'products.view',
            'settings.access',
            'settings.modify',
        ]);
    }
}
