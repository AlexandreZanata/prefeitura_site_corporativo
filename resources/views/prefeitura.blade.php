@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12 text-center">
            <div class="card">
                <div class="card-header">
                    <h1>Bem-vindo ao Portal da Prefeitura</h1>
                </div>

                <div class="card-body">
                    <p class="lead">Aqui você encontrará notícias, serviços e informações sobre a nossa cidade.</p>
                    {{-- Aqui você pode adicionar banners, notícias, links para serviços, etc. --}}

                    <div class="mt-4">
                        <a href="#" class="btn btn-primary btn-lg">Ver Notícias</a>
                        <a href="#" class="btn btn-secondary btn-lg">Acessar Serviços</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
