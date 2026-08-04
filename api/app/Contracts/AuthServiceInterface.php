<?php

namespace App\Contracts;

use App\DTO\AuthResult;
use App\DTO\LoginData;
use App\DTO\RegisterData;
use App\Models\User;

interface AuthServiceInterface
{
    public function register(RegisterData $data): AuthResult;

    public function login(LoginData $data): AuthResult;

    public function logout(User $user): void;
}
