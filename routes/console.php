<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

Artisan::command('logs:clean', function () {
    $deleted = DB::table('visitor_logs')->where('created_at', '<', Carbon::now()->subDays(7))->delete();
    $this->info("Cleared {$deleted} visitor logs older than 7 days.");
})->purpose('Clear visitor logs older than 7 days');
