<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ $siteName ?? config('app.name', 'Portal da Prefeitura') }}</title>

    <link rel="dns-prefetch" href="//fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=Nunito" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />

    @viteReactRefresh
    @vite(['resources/sass/app.scss', 'resources/js/app.js'])
</head>
<body>
<div id="app">
    <header>
        <div class="top-bar bg-white shadow-sm">
            <div class="container">
                <nav class="navbar navbar-expand-lg">
                    <a class="navbar-brand" href="{{ route('prefeitura.index') }}">
                        @if(isset($siteLogo) && $siteLogo)
                            {{-- Se a logo existir no banco, exibe a imagem --}}
                            <img src="{{ asset($siteLogo) }}" alt="{{ $siteName ?? 'Logo' }}" style="max-height: 40px;">
                        @else
                            {{-- Caso contrário, exibe o nome do site em texto --}}
                            <span class="ms-2 fw-bold">{{ $siteName ?? 'Portal da Prefeitura' }}</span>
                        @endif
                    </a>

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbarContent" aria-controls="mainNavbarContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="mainNavbarContent">
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

    <main class="py-4">
        @yield('content')
    </main>
</div>
</body>
</html>
