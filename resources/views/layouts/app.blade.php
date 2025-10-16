<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ $siteName ?? config('app.name', 'Portal da Prefeitura') }}</title>

    <link rel="dns-prefetch" href="//fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=Nunito" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('fontawesome/css/all.min.css') }}" />

    {{-- CSS para a Tela de Carregamento --}}
    <style>
        .loader-wrapper {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background-color: #fff; display: flex; justify-content: center;
            align-items: center; z-index: 9999; transition: opacity 0.5s ease, visibility 0.5s ease;
            opacity: 1; visibility: visible;
        }
        .loader-wrapper.hidden { opacity: 0; visibility: hidden; }
        .loader {
            border: 8px solid #f3f3f3; border-top: 8px solid #3498db; border-radius: 50%;
            width: 60px; height: 60px; animation: spin 1s linear infinite;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    </style>

    @viteReactRefresh
    @vite(['resources/sass/app.scss', 'resources/js/app.js'])
</head>
<body>
{{-- Tela de Carregamento --}}
<div id="loader-wrapper" class="loader-wrapper">
    <div class="loader"></div>
</div>

<div id="app">
    <header>
        <div class="top-bar bg-white shadow-sm">
            <div class="container">
                <nav class="navbar navbar-expand-lg">
                    <a class="navbar-brand" href="{{ route('prefeitura.index') }}">
                        @if(isset($siteLogo) && $siteLogo)
                            <img src="{{ asset($siteLogo) }}" alt="{{ $siteName ?? 'Logo' }}" style="max-height: 40px;">
                        @else
                            <span class="ms-2 fw-bold">{{ $siteName ?? 'Portal da Prefeitura' }}</span>
                        @endif
                    </a>

                    <div id="react-sidebar-root" class="flex-grow-1"></div>
                </nav>
            </div>
        </div>
    </header>


    <main>
        @yield('content')
    </main>
</div>

<script>
    // Bridge de dados Blade -> React
    window.__APP__ = window.__APP__ || {};
    try {
        window.__APP__.siteName = @json($siteName ?? config('app.name', 'Portal da Prefeitura'));
        window.__APP__.menuItems = @json(isset($menuItems) ? $menuItems : []);
        window.__APP__.auth = {
            authenticated: @json(Auth::check()),
            userName: @json(Auth::check() ? Auth::user()->name : null),
            routes: {
                login: @json(Route::has('login') ? route('login', [], false) : null),
                home: @json(Route::has('home') ? route('home', [], false) : null),
                logout: @json(Route::has('logout') ? route('logout', [], false) : null)
            }
        };
    } catch (e) { console.warn('Falha ao preparar dados para React', e); }

    // Esconde o loader após o carregamento da página
    window.addEventListener('DOMContentLoaded', function() {
        var loader = document.getElementById('loader-wrapper');
        if (loader) loader.classList.add('hidden');
    });
</script>
</body>
</html>
