<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PresenceController;

Route::get('/', function () {
    return view('presence');
});

Route::get('/api/presence', [PresenceController::class, 'getPresence']);

