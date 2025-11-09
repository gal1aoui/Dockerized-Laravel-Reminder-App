<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Inertia Root View
    |--------------------------------------------------------------------------
    |
    | The root template that's loaded on the first page visit.
    |
    */

    'root_view' => 'app',

    /*
    |--------------------------------------------------------------------------
    | Inertia Middleware
    |--------------------------------------------------------------------------
    |
    | The middleware that will be applied to all Inertia requests.
    |
    */

    'middleware' => \App\Http\Middleware\HandleInertiaRequests::class,

    /*
    |--------------------------------------------------------------------------
    | Server Side Rendering
    |--------------------------------------------------------------------------
    |
    | These options configures if and how Inertia uses Server Side Rendering
    | to pre-render the initial visits made to your application's pages.
    |
    */

    'ssr' => [
        'enabled' => false,
        'url' => 'http://127.0.0.1:13714',
    ],

    /*
    |--------------------------------------------------------------------------
    | Testing
    |--------------------------------------------------------------------------
    |
    | The values here configure how Inertia functions in a testing environment.
    |
    */

    'testing' => [
        'ensure_pages_exist' => true,
        'page_paths' => [
            resource_path('js/Pages'),
        ],
        'page_extensions' => [
            'js',
            'jsx',
            'tsx',
            'vue',
        ],
    ],

];