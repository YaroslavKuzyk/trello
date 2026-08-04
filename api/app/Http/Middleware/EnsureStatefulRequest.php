<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Session-based auth only works for requests Sanctum considers stateful, which
 * it decides from the Origin/Referer header. Without this guard, touching the
 * session on a stateless request throws "Session store not set on request" and
 * the client gets a 500 for what is really a misconfigured caller.
 */
class EnsureStatefulRequest
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->hasSession()) {
            return response()->json([
                'message' => 'This endpoint requires a stateful request. Call it from an origin listed in SANCTUM_STATEFUL_DOMAINS and send credentials with the request.',
            ], 400);
        }

        return $next($request);
    }
}
