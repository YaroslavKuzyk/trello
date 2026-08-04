<?php

namespace App\Http\Controllers;

use App\Contracts\AuthServiceInterface;
use App\DTO\LoginData;
use App\DTO\RegisterData;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(private AuthServiceInterface $authService)
    {
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $user = $this->authService->register(RegisterData::fromRequest($request));

        $request->session()->regenerate();

        return UserResource::make($user)->response()->setStatusCode(201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $user = $this->authService->login(LoginData::fromRequest($request));

        // Against session fixation: the id handed out before the login must not
        // be the one that ends up authenticated.
        $request->session()->regenerate();

        return UserResource::make($user)->response()->setStatusCode(200);
    }

    public function me(Request $request): JsonResponse
    {
        return UserResource::make($request->user())->response()->setStatusCode(200);
    }

    public function logout(Request $request): JsonResponse
    {
        $this->authService->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(status: 204);
    }
}
