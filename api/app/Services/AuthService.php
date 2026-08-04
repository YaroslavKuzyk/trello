<?php

namespace App\Services;

use App\Contracts\AuthServiceInterface;
use App\DTO\LoginData;
use App\DTO\RegisterData;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthService implements AuthServiceInterface
{
    public function register(RegisterData $data): User
    {
        $user = User::create([
            'name' => $data->name,
            'email' => $data->email,
            'password' => $data->password,
        ]);

        Auth::guard('web')->login($user);

        return $user;
    }

    public function login(LoginData $data): User
    {
        $credentials = ['email' => $data->email, 'password' => $data->password];

        if (!Auth::guard('web')->attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => [__('auth.failed')],
            ]);
        }

        $user = Auth::guard('web')->user();

        return $user;
    }

    public function logout(): void
    {
        Auth::guard('web')->logout();
    }
}
