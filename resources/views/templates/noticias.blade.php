@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>{{ $page->title }}</h1>
        <hr>
        <div class="page-content">
            {!! $page->content !!}
        </div>
    </div>
@endsection
