<?php

namespace App\Http\Controllers;

use App\Contracts\AuthServiceInterface;
use App\DTO\LoginData;
use App\DTO\RegisterData;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\AuthResource;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    public function __construct(private AuthServiceInterface $authService)
    {
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $result = $this->authService->register(RegisterData::fromRequest($request));

        return AuthResource::make($result)->response()->setStatusCode(201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $result = $this->authService->login(LoginData::fromRequest($request));

        return AuthResource::make($result)->response()->setStatusCode(200);
    }
}
