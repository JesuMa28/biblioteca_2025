<?php

namespace Database\Seeders;

use Domain\Permissions\Models\Permission;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Cache;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Vaciar Tabla
        Permission::truncate();

        // Users Perms

        $user_permission = Permission::create(attributes: [
            'name' => 'users.view',
            'display_name' => 'Ver Usuarios',
            'description' => 'Ver lista de Usuarios de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);

        Permission::create(attributes: [
            'name' => 'users.create',
            'display_name' => 'Crear Usuarios',
            'description' => 'Crear Usuarios de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $user_permission->id,
        ]);

        Permission::create(attributes: [
            'name' => 'users.edit',
            'display_name' => 'Editar Usuarios',
            'description' => 'Editar Usuarios de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $user_permission->id,
        ]);

        Permission::create(attributes: [
            'name' => 'users.delete',
            'display_name' => 'Eliminar Usuarios',
            'description' => 'Eliminar Usuarios de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $user_permission->id,
        ]);

        // Products Perms

        $products_permission = Permission::create(attributes: [
            'name' => 'products.view',
            'display_name' => 'Ver Productos',
            'description' => 'Ver lista de Productos de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);

        Permission::create(attributes: [
            'name' => 'products.create',
            'display_name' => 'Crear Productos',
            'description' => 'Crear Productos de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $products_permission->id,
        ]);

        Permission::create(attributes: [
            'name' => 'products.edit',
            'display_name' => 'Editar Productos',
            'description' => 'Editar Productos de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $products_permission->id,
        ]);

        Permission::create(attributes: [
            'name' => 'products.delete',
            'display_name' => 'Eliminar Productos',
            'description' => 'Eliminar Productos de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $products_permission->id,
        ]);

        // Reports Perms

        $reports_permission = Permission::create(attributes: [
            'name' => 'reports.view',
            'display_name' => 'Ver Productos',
            'description' => 'Ver lista de Productos de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);

        Permission::create(attributes: [
            'name' => 'reports.export',
            'display_name' => 'Exportar Reports',
            'description' => 'Exportar Reports de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $reports_permission->id,
        ]);

        Permission::create(attributes: [
            'name' => 'reports.import',
            'display_name' => 'Importar Reports',
            'description' => 'Importar Reports de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $reports_permission->id,
        ]);

        // Settings Perms

        $settings_permission = Permission::create(attributes: [
            'name' => 'settings.access',
            'display_name' => 'Acceder a configuración',
            'description' => 'Acceder a la lista de configuración de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);

        Permission::create(attributes: [
            'name' => 'settings.modify',
            'display_name' => 'Modificar configuración',
            'description' => 'Modificar la configuración de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $settings_permission->id,
        ]);

        Cache::forever(key: 'permissions', value: Permission::whereNull('parent_id')->with('children')->get());
    }
}
