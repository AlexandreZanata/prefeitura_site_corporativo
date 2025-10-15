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

                    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu" aria-controls="mobileMenu">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse d-none d-lg-block" id="mainNavbarContent">
                        {{-- O conteúdo do menu de desktop é o mesmo de antes --}}
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            @foreach($menuItems as $item)
                                @if($item->children->isEmpty())
                                    <li class="nav-item">
                                        <a class="nav-link text-dark" href="{{ url($item->url) }}">{{ $item->name }}</a>
                                    </li>
                                @else
                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {{ $item->name }}
                                        </a>
                                        <ul class="dropdown-menu">
                                            @foreach($item->children->groupBy('category') as $category => $subItems)
                                                @if($category)
                                                    <li><h6 class="dropdown-header">{{ $category }}</h6></li>
                                                @endif
                                                @foreach($subItems as $child)
                                                    <li><a class="dropdown-item" href="{{ url($child->url) }}">{{ $child->name }}</a></li>
                                                @endforeach
                                                @if(!$loop->last)
                                                    <li><hr class="dropdown-divider"></li>
                                                @endif
                                            @endforeach
                                        </ul>
                                    </li>
                                @endif
                            @endforeach
                        </ul>
                        <ul class="navbar-nav ms-auto">
                            @guest
                                @if (Route::has('login'))
                                    <li class="nav-item">
                                        <a class="btn btn-outline-primary btn-sm" href="{{ route('login') }}">
                                            <i class="fa-solid fa-user-shield me-1"></i> {{ __('Área Restrita') }}
                                        </a>
                                    </li>
                                @endif
                            @else
                                <li class="nav-item dropdown">
                                    <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                        {{ Auth::user()->name }}
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                        <a class="dropdown-item" href="{{ route('home') }}"><i class="fa-solid fa-table-columns fa-fw me-1"></i> Dashboard</a>
                                        <a class="dropdown-item text-danger" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                            <i class="fa-solid fa-right-from-bracket fa-fw me-1"></i> {{ __('Logout') }}
                                        </a>
                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">@csrf</form>
                                    </div>
                                </li>
                            @endguest
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </header>

    <div class="offcanvas offcanvas-start" tabindex="-1" id="mobileMenu" aria-labelledby="mobileMenuLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="mobileMenuLabel">{{ $siteName ?? 'Menu' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            {{-- O conteúdo do menu é o mesmo, agora dentro da barra lateral --}}
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                @foreach($menuItems as $item)
                    @if($item->children->isEmpty())
                        <li class="nav-item">
                            <a class="nav-link text-dark" href="{{ url($item->url) }}">{{ $item->name }}</a>
                        </li>
                    @else
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {{ $item->name }}
                            </a>
                            <ul class="dropdown-menu">
                                @foreach($item->children->groupBy('category') as $category => $subItems)
                                    @if($category)
                                        <li><h6 class="dropdown-header">{{ $category }}</h6></li>
                                    @endif
                                    @foreach($subItems as $child)
                                        <li><a class="dropdown-item" href="{{ url($child->url) }}">{{ $child->name }}</a></li>
                                    @endforeach
                                    @if(!$loop->last)
                                        <li><hr class="dropdown-divider"></li>
                                    @endif
                                @endforeach
                            </ul>
                        </li>
                    @endif
                @endforeach
            </ul>
            <hr>
            <ul class="navbar-nav ms-auto">
                @guest
                    @if (Route::has('login'))
                        <li class="nav-item">
                            <a class="btn btn-outline-primary" href="{{ route('login') }}">
                                <i class="fa-solid fa-user-shield me-1"></i> {{ __('Área Restrita') }}
                            </a>
                        </li>
                    @endif
                @else
                    <li class="nav-item dropdown">
                        <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                            {{ Auth::user()->name }}
                        </a>
                        <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="{{ route('home') }}"><i class="fa-solid fa-table-columns fa-fw me-1"></i> Dashboard</a>
                            <a class="dropdown-item text-danger" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                <i class="fa-solid fa-right-from-bracket fa-fw me-1"></i> {{ __('Logout') }}
                            </a>
                            <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">@csrf</form>
                        </div>
                    </li>
                @endguest
            </ul>
        </div>
    </div>

    <main>
        @yield('content')
    </main>
</div>

<script>
    // Esconde o loader após o carregamento da página
    window.addEventListener('DOMContentLoaded', function() {
        var loader = document.getElementById('loader-wrapper');
        if (loader) loader.classList.add('hidden');
    });
</script>
</body>
</html>
