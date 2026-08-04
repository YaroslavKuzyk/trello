<?php

namespace App\DTO;

use App\Http\Requests\RegisterRequest;

final readonly class RegisterData
{
    public function __construct(
        public string $name,
        public string $email,
        public string $password,
    ) {
    }

    public static function fromRequest(RegisterRequest $request): self
    {
        return new self(...$request->validated());
    }
}
