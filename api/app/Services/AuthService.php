<?php

namespace App\Services;

use App\Contracts\AuthServiceInterface;
use App\DTO\AuthResult;
use App\DTO\LoginData;
use App\DTO\RegisterData;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AuthService implements AuthServiceInterface
{
    /**
     * Hash compared against when no user matches, so that an unknown email
     * costs the same time as a wrong password.
     */
    private static ?string $dummyHash = null;

    public function register(RegisterData $data): AuthResult
    {
        $user = User::create([
            'name' => $data->name,
            'email' => $data->email,
            'password' => $data->password,
        ]);

        return new AuthResult($user, $user->createToken('auth_token')->plainTextToken);
    }

    public function login(LoginData $data): AuthResult
    {
        $user = User::where('email', $data->email)->first();

        if (! Hash::check($data->password, $user?->password ?? $this->dummyHash())) {
            throw ValidationException::withMessages([
                'email' => [__('auth.failed')],
            ]);
        }

        return new AuthResult($user, $user->createToken('auth_token')->plainTextToken);
    }

    public function logout(User $user): void
    {
        $user->currentAccessToken()->delete();
    }

    private function dummyHash(): string
    {
        return self::$dummyHash ??= Hash::make(Str::random(40));
    }
}
