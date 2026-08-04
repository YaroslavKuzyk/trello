<?php

namespace App\DTO;

use App\Http\Requests\LoginRequest;

final readonly class LoginData
{
    public function __construct(
        public string $email,
        public string $password,
    ) {
    }

    public static function fromRequest(LoginRequest $request): self
    {
        return new self(...$request->validated());
    }
}
