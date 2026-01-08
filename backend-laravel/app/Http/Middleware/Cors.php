<?php

namespace App\Http\Middleware;

use Closure;

class Cors
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        $response->headers->set("Access-Control-Allow-Origin", "http://localhost:5173");
        $response->headers->set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        $response->headers->set("Access-Control-Allow-Headers", "Content-Type, Authorization");
        $response->headers->set("Access-Control-Allow-Credentials", "true");

        if ($request->getMethod() === "OPTIONS") {
            return response('', 200)
                ->header("Access-Control-Allow-Origin", "http://localhost:5173")
                ->header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
                ->header("Access-Control-Allow-Headers", "Content-Type, Authorization")
                ->header("Access-Control-Allow-Credentials", "true");
        }

        return $response;
    }
}
