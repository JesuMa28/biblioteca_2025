<?php


return [
    'navigation' => [
        'menu' => 'Menú de Navegación',
        'items' => [
            'dashboard' => 'Panel',
            'users' => 'Usuarios',
            'repository' => 'Repositorio',
            'documentation' => 'Documentación',
        ],
    ],
    'user_menu' => [
        'settings' => 'Configuración',
        'logout' => 'Cerrar sesión',
    ],
    'auth' => [
        'failed' => 'Estas credenciales no coinciden con nuestros registros.',
        'throttle' => 'Demasiados intentos de inicio de sesión. Por favor, inténtalo de nuevo en :seconds segundos.',
    ],
    'settings' => [
        'title' => 'Configuración',
        'description' => 'Gestiona tu perfil y configuración de cuenta',
        'navigation' => [
            'profile' => 'Perfil',
            'password' => 'Contraseña',
            'appearance' => 'Apariencia',
            'languages' => 'Idiomas',
        ],
        'profile' => [
            'title' => 'Configuración del perfil',
            'information_title' => 'Información del perfil',
            'information_description' => 'Actualiza tu nombre y dirección de correo electrónico',
            'name_label' => 'Nombre',
            'name_placeholder' => 'Nombre completo',
            'email_label' => 'Dirección de correo',
            'email_placeholder' => 'Dirección de correo',
            'unverified_email' => 'Tu dirección de correo no está verificada.',
            'resend_verification' => 'Haz clic aquí para reenviar el correo de verificación.',
            'verification_sent' => 'Se ha enviado un nuevo enlace de verificación a tu dirección de correo.',
            'save_button' => 'Guardar',
            'saved_message' => 'Guardado',
        ],
        'password' => [
            'title' => 'Configuración de contraseña',
            'update_title' => 'Actualizar contraseña',
            'update_description' => 'Asegúrate de que tu cuenta utilice una contraseña larga y aleatoria para mantenerse segura',
            'current_password_label' => 'Contraseña actual',
            'current_password_placeholder' => 'Contraseña actual',
            'new_password_label' => 'Nueva contraseña',
            'new_password_placeholder' => 'Nueva contraseña',
            'confirm_password_label' => 'Confirmar contraseña',
            'confirm_password_placeholder' => 'Confirmar contraseña',
            'save_button' => 'Guardar contraseña',
            'saved_message' => 'Guardado',
        ],
        'appearance' => [
            'title' => 'Configuración de apariencia',
            'description' => 'Actualiza la configuración de apariencia de tu cuenta',
            'modes' => [
                'light' => 'Claro',
                'dark' => 'Oscuro',
                'system' => 'Sistema'
            ]
        ],
        'languages' => [
            'title' => 'Configuración de idioma',
            'description' => 'Cambia tu idioma preferido',
        ],
    ],
    'validation' => [
            'required' => 'El campo ":attribute" es obligatorio.',
            'email' => 'El campo :attribute debe ser una dirección de correo válida.',
            'min' => [
                'string' => 'El campo :attribute debe tener al menos :min caracteres.',
            ],
            'max' => [
                'string' => 'El campo :attribute no debe tener más de :max caracteres.',
            ],
            'unique' => 'El campo :attribute ya ha sido tomado.',
            'confirmed' => 'El campo :attribute no coincide.',
            "used_floor" => "El :attribute ya está en uso.",
            "max_zones" => "Un piso no puede tener mas de 10 zonas.",
    ],
    'common' => [
        'buttons' => [
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'close' => 'Cerrar',
        ],
        'filters'=> [
            'title' => 'Filtros',
            'clear' => 'Limpiar',
        ],
        'delete_dialog' => [
            'success' => 'Usuario eliminado correctamente',
        ],
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
            'first' => 'Primero',
            'last' => 'Último',
        ],
        'per_page' => 'Por página',
        'no_results' => 'No hay resultados',
    ],
    'users' => [
        'title' => 'Usuarios',
        'create' => 'Crear Usuario',
        'edit' => 'Editar Usuario',
        'fields' => [
            'name' => 'Nombre',
            'email' => 'Email',
            'password' => 'Contraseña',
            'password_optional' => 'Contraseña (opcional)',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
            'rolPpal' => 'Rol Principal',
            'permisos' => 'Permisos Específicos'
        ],
        'columns' => [
            'name' => 'Nombre',
            'email' => 'Email',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
        ],
        'gridelements' => [
            'users' => 'Usuarios',
            'products' => 'Productos',
            'reports' => 'Reportes',
            'configurations' => 'Configuración',
        ],
        'permisos' => [
            'Users' => [
                'users' => [
                    'view' => 'Ver usuarios',
                    'create' => 'Crear usuarios',
                    'edit' => 'Editar usuarios',
                    'delete' => 'Eliminar usuarios'
                ],
            ],
            'Products' => [
                'products' => [
                    'view' => 'Ver productos',
                    'create' => 'Crear productos',
                    'edit' => 'Editar productos',
                    'delete' => 'Eliminar productos'
                ],

            ],
            'Reports' => [
                'reports' => [
                    'view' => 'Ver reportes',
                    'export' => 'Exportar reportes',
                    'print' => 'Imprimir reportes'
                ],

            ],
            'Config' => [
                'config' => [
                    'access' => 'Acceso a configuración',
                    'modify' => 'Modificar configuración'
                ],

            ],
        ],
        'roles' => [
            'default' => 'Selecciona un Rol',
            'admin' => 'Administrador',
            'advanced' => 'Usuario Avanzado',
            'usuario' => 'Usuario Básico'
        ],
        'filters' => [
            'search' => 'Buscar',
            'name' => 'Nombre del usuario',
            'email' => 'Email del usuario',
        ],
        'placeholders' => [
            'name' => 'Nombre completo del usuario',
            'email' => 'correo@ejemplo.com',
            'password' => 'Contraseña segura',
            'search' => 'Buscar usuarios...',
            'passRulings' => 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números'
        ],
        'tabs' => [
            'userForm' => 'Información Básica',
            'permissionsForm' => 'Roles y Permisos'
        ],
        'cards' => [
            'title' => 'Crear Nuevo Usuario',
            'description' => 'Ingresa la información para crear un nuevo usuario en el sistema'
        ],
        'buttons' => [
            'new' => 'Nuevo Usuario',
            'edit' => 'Editar',
            'save' => 'Guardar',
            'update' => 'Actualizar',
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'deleting' => 'Eliminando...',
            'saving' => 'Guardando...',
            'retry' => 'Reintentar',
        ],
        'delete' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el usuario del sistema.',
        ],
        'delete_dialog' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el usuario del sistema.',
            'success' => 'Eliminado correctamente ;)',
        ],
        'deleted_error' => 'Error al eliminar el usuario',
        'no_results' => 'No hay resultados.',
        'error_loading' => 'Error al cargar los usuarios. Por favor, inténtalo de nuevo.',
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
        ],
    ],
    'categories' => [
        'fiction' => 'Ficción',
        'non_fiction' => 'No Ficción',
        'science' => 'Ciencia',
        'history' => 'Historia',
        'fantasy' => 'Fantasía',
        'horror' => 'Terror',
        'mystery' => 'Misterio',
        'biography' => 'Biografía',
        'romantic' => 'Romántico',
        'adventure' => 'Aventura',
    ],
    'floors' => [
        'title' => 'Pisos',
        'create' => 'Crear Piso',
        'edit' => 'Editar Piso',
        'fields' => [
            'floor' => 'Número de Piso',
            'max-zones' => 'Máximo de Zonas',
            'number' => 'Número',
            'capacity' => 'Capacidad',
            'create_at' => 'Fecha de creación',
            'actions' => 'Acciones',
        ],
        'columns' => [
            'number' => 'Número',
            'capacity' => 'Capacidad',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
        ],
        'filters' => [
            'search' => 'Buscar',
            'number' => 'Número de piso',
            'capacity' => 'Capacidad del piso',
        ],
        'placeholders' => [
            'number' => 'Número Piso...',
            'max-zones' => 'Máximo Zones...',
            'capacity' => 'Capacidad',
            'search' => 'Buscar pisos...',
        ],
        'tabs' => [
            'floorForm' => 'Información Básica',
        ],
        'cards' => [
            'title_create' => 'Crear Nuevo Piso',
            'title_edit' => 'Editar Piso',
            'description_create' => 'Ingrese la información para crear un nuevo piso en el sistema.',
            'description_edit' => 'Ingrese la información para editar el piso seleccionado.',
        ],
        'buttons' => [
            'new' => 'Nuevo Piso',
            'edit' => 'Editar',
            'save' => 'Guardar',
            'update' => 'Actualizar',
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'deleting' => 'Eliminando...',
            'saving' => 'Guardando...',
            'retry' => 'Reintentar',
        ],
        'delete' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. El piso será eliminado permanentemente del sistema.',
        ],
        'delete_dialog' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. El piso será eliminado permanentemente del sistema.',
            'success' => 'Eliminado con éxito ;)',
        ],
        'deleted_error' => 'Error al eliminar el usuario',
        'no_results' => 'No hay resultados.',
        'error_loading' => 'Error al cargar los pisos. Por favor, inténtalo de nuevo.',
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
        ],
    ],
    'zones' => [
        'title' => 'Zonas',
        'create' => 'Crear Zona',
        'edit' => 'Editar Zona',
        'fields' => [
            'name' => 'Nombre de la Zona',
            'capacity' => 'Capacidad',
            'create_at' => 'Creado el',
            'actions' => 'Acciones',
        ],
        'columns' => [
            'name' => 'Nombre',
            'capacity' => 'Capacidad',
            'floor_id' => 'ID del Piso',
            'created_at' => 'Creado el',
            'actions' => 'Acciones',
            'current_shelves' => 'Estantes',
            'floor_number' => 'Número de Piso',
            'category' => 'Categoría',
        ],
        'filters' => [
            'search' => 'Buscar',
            'name' => 'Nombre de la Zona',
            'capacity' => 'Capacidad de la Zona',
            'category' => 'Categoría de la Zona',
        ],
        'placeholders' => [
            'name' => 'Nombre de la zona...',
            'capacity' => 'Capacidad de la zona...',
            'search' => 'Buscar zonas...',
            'category' => 'Selecciona una categoría...',
        ],
        'tabs' => [
            'zoneForm' => 'Información Básica',
        ],
        'cards' => [
            'title_create' => 'Crear Nueva Zona',
            'title_edit' => 'Editar Zona',
            'description_create' => 'Introduce la información para crear una nueva zona en el sistema.',
            'description_edit' => 'Introduce la información para actualizar la zona actual.',
        ],
        'buttons' => [
            'new' => 'Nueva Zona',
            'edit' => 'Editar',
            'save' => 'Guardar',
            'update' => 'Actualizar',
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'deleting' => 'Eliminando...',
            'saving' => 'Guardando...',
            'retry' => 'Reintentar',
        ],
        'delete' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. La zona será eliminada permanentemente del sistema.',
        ],
        'delete_dialog' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. La zona será eliminada permanentemente del sistema.',
            'success' => 'Eliminado correctamente ;)',
        ],
        'deleted_error' => 'Error al eliminar la zona',
        'no_results' => 'Sin resultados.',
        'error_loading' => 'Error al cargar las zonas. Por favor, inténtalo de nuevo.',
        'showing_results' => 'Mostrando de :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
        ],
    ],
    'shelves' => [
        'title' => 'Estanterías',
        'create' => 'Crear Estantería',
        'edit' => 'Editar Estantería',
        'fields' => [
            'name' => 'Nombre de la Estantería',
            'capacity' => 'Capacidad',
            'max-books' => 'Máximo de Libros',
            'shelf_zone' => 'Zona',
            'category' => 'Categoría',
            'create_at' => 'Creado el',
            'actions' => 'Acciones',
        ],
        'columns' => [
            'code' => 'Código',
            'zone_name' => 'Nombre de la Zona',
            'category' => 'Categoría',
            'categories' => 'Categorías',
            'current_shelves' => 'Libros Actuales',
            'capacity' => 'Capacidad de Libros',
            'created_at' => 'Creado el',
            'actions' => 'Acciones',
        ],
        'filters' => [
            'search' => 'Buscar',
            'code' => 'Código de Estantería',
            'capacity' => 'Capacidad de Estantería',
            'category' => 'Categoría de Estantería',
        ],
        'placeholders' => [
            'code' => 'Código de Estantería...',
            'capacity' => 'Capacidad de Estantería...',
            'max-books' => 'Máximo de Libros...',
            'shelf_zone' => 'Selecciona una Zona...',
            'category' => 'Selecciona una Categoría...',
            'search' => 'Buscar estanterías...',
        ],
        'tabs' => [
            'shelfForm' => 'Información Básica',
        ],
        'cards' => [
            'title_create' => 'Crear Nueva Estantería',
            'title_edit' => 'Editar Estantería',
            'description_create' => 'Introduce la información para crear una nueva estantería en el sistema.',
            'description_edit' => 'Introduce la información para actualizar la estantería actual.',
        ],
        'buttons' => [
            'new' => 'Nueva Estantería',
            'edit' => 'Editar',
            'save' => 'Guardar',
            'update' => 'Actualizar',
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'deleting' => 'Eliminando...',
            'saving' => 'Guardando...',
            'retry' => 'Reintentar',
        ],
        'delete' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. La estantería se eliminará permanentemente del sistema.',
        ],
        'delete_dialog' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. La estantería se eliminará permanentemente del sistema.',
            'success' => 'Eliminado correctamente ;)',
        ],
        'deleted_error' => 'Error al eliminar la estantería',
        'no_results' => 'Sin resultados.',
        'error_loading' => 'Error al cargar estanterías. Por favor, inténtalo de nuevo.',
        'showing_results' => 'Mostrando de :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
        ],
    ],

    'books' => [
        'title' => 'Libros',
        'create' => 'Crear Libro',
        'edit' => 'Editar Libro',
        'fields' => [
            'title' => 'Título',
            'author' => 'Autor',
            'editorial' => 'Editorial',
            'language' => 'Idioma',
            'published_year' => 'Año de Publicación',
            'isbn' => 'ISBN',
            'pages' => 'Páginas',
            'created_at' => 'Creado el',
            'actions' => 'Acciones',
        ],
        'columns' => [
            'title' => 'Título',
            'author' => 'Autor',
            'editorial' => 'Editorial',
            'language' => 'Idioma',
            'published_year' => 'Año de Publicación',
            'isbn' => 'ISBN',
            'pages' => 'Páginas',
            'created_at' => 'Creado el',
            'actions' => 'Acciones',
        ],
        'filters' => [
            'search' => 'Buscar',
            'title' => 'Título del Libro',
            'author' => 'Autor del Libro',
            'category' => 'Categoría de Estantería',
        ],
        'placeholders' => [
            'title' => 'Título del Libro...',
            'author' => 'Autor del Libro...',
            'capacity' => 'Capacidad de Estantería...',
            'search' => 'Buscar libros...',
        ],
        'tabs' => [
            'shelfForm' => 'Información Básica',
        ],
        'cards' => [
            'title_create' => 'Crear Nuevo Libro',
            'title_edit' => 'Editar Libro',
            'description_create' => 'Introduce la información para crear un nuevo libro en el sistema.',
            'description_edit' => 'Introduce la información para actualizar el libro actual.',
        ],
        'buttons' => [
            'new' => 'Nuevo Libro',
            'edit' => 'Editar',
            'save' => 'Guardar',
            'update' => 'Actualizar',
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'deleting' => 'Eliminando...',
            'saving' => 'Guardando...',
            'retry' => 'Reintentar',
        ],
        'delete' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. El libro se eliminará permanentemente del sistema.',
        ],
        'delete_dialog' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. El libro se eliminará permanentemente del sistema.',
            'success' => 'Eliminado correctamente ;)',
        ],
        'deleted_error' => 'Error al eliminar el libro',
        'no_results' => 'Sin resultados.',
        'error_loading' => 'Error al cargar libros. Por favor, inténtalo de nuevo.',
        'showing_results' => 'Mostrando de :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
        ],
    ],


];
