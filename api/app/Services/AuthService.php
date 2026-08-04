<?php
namespace App\Services;

use App\Contracts\AuthServiceInterface;
use App\DTO\AuthResult;
use App\DTO\RegisterData;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class AuthService implements AuthServiceInterface
{
    public function register(RegisterData $data): AuthResult
    {
        return DB::transaction(function () use ($data) {
            $user = User::create([
                'name' => $data->name,
                'email' => $data->email,
                'password' => $data->password,
            ]);

            return new AuthResult($user, $user->createToken('auth_token')->plainTextToken);
        });
    }
}