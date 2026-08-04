<?php

namespace App\Contracts;

use App\DTO\LoginData;
use App\DTO\RegisterData;
use App\Models\User;

interface AuthServiceInterface
{
    public function register(RegisterData $data): User;

    public function login(LoginData $data): User;

    public function logout(): void;
}
