<?php

namespace App\Contracts;

use App\DTO\AuthResult;
use App\DTO\RegisterData;

interface AuthServiceInterface
{
    public function register(RegisterData $data): AuthResult;
}