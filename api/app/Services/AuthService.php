<?php
namespace App\Services;

use App\Contracts\AuthServiceInterface;
use App\DTO\AuthResult;
use App\DTO\LoginData;
use App\DTO\RegisterData;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService implements AuthServiceInterface
{
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

        if (!$user || !Hash::check($data->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => [__('auth.failed')],
            ]);
        }

        return new AuthResult($user, $user->createToken('auth_token')->plainTextToken);
    }
}