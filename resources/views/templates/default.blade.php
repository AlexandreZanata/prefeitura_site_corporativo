@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h2>{{ $page->title }}</h2>
            </div>
            <div class="card-body">
                {!! $page->content !!}
            </div>
        </div>
    </div>
@endsection
