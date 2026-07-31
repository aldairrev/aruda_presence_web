<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class LogIncomingIp
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Skip logging for Laravel's built-in /up health check route to keep logs clean
        if ($request->path() !== 'up') {
            try {
                \App\Models\VisitorLog::create([
                    'ip_address' => $request->ip(),
                    'method' => $request->method(),
                    'url' => $request->fullUrl(),
                    'user_agent' => $request->header('User-Agent'),
                ]);
            } catch (\Exception $e) {
                // Fail gracefully so that database issues don't crash the website
                Log::error('Failed to write visitor log to database: ' . $e->getMessage(), [
                    'ip' => $request->ip(),
                    'url' => $request->fullUrl(),
                ]);
            }
        }

        return $next($request);
    }
}
