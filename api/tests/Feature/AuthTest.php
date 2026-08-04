<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Routing\Middleware\ThrottleRequests;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Auth routes are throttled at 5/min; without this, repeated requests
        // in a test would hit 429 instead of the behaviour under test.
        $this->withoutMiddleware(ThrottleRequests::class);
    }

    public function test_register_creates_user_and_returns_token(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Ada Lovelace',
            'email' => 'ada@example.com',
            'password' => 'Password123!',
        ]);

        $response->assertCreated()
            ->assertJsonStructure(['user' => ['id', 'name', 'email', 'created_at'], 'token'])
            ->assertJsonPath('user.email', 'ada@example.com');

        $this->assertDatabaseHas('users', ['email' => 'ada@example.com']);
        $this->assertTrue(Hash::check('Password123!', User::first()->password));
    }

    public function test_register_never_exposes_the_password(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Ada Lovelace',
            'email' => 'ada@example.com',
            'password' => 'Password123!',
        ]);

        $response->assertCreated();
        $this->assertArrayNotHasKey('password', $response->json('user'));
    }

    public function test_register_rejects_a_duplicate_email(): void
    {
        User::factory()->create(['email' => 'ada@example.com']);

        $this->postJson('/api/auth/register', [
            'name' => 'Ada Lovelace',
            'email' => 'ada@example.com',
            'password' => 'Password123!',
        ])->assertStatus(422)->assertJsonValidationErrors('email');
    }

    public function test_login_returns_a_token_for_valid_credentials(): void
    {
        User::factory()->create([
            'email' => 'ada@example.com',
            'password' => 'Password123!',
        ]);

        $this->postJson('/api/auth/login', [
            'email' => 'ada@example.com',
            'password' => 'Password123!',
        ])->assertOk()
            ->assertJsonStructure(['user' => ['id', 'name', 'email'], 'token'])
            ->assertJsonPath('user.email', 'ada@example.com');
    }

    public function test_login_rejects_a_wrong_password(): void
    {
        User::factory()->create([
            'email' => 'ada@example.com',
            'password' => 'Password123!',
        ]);

        $this->postJson('/api/auth/login', [
            'email' => 'ada@example.com',
            'password' => 'WrongPassword1!',
        ])->assertStatus(422)->assertJsonValidationErrors('email');
    }

    public function test_login_rejects_an_unknown_email_with_the_same_error(): void
    {
        $this->postJson('/api/auth/login', [
            'email' => 'nobody@example.com',
            'password' => 'Password123!',
        ])->assertStatus(422)
            ->assertJsonPath('errors.email.0', __('auth.failed'));
    }

    public function test_login_accepts_a_password_that_would_fail_the_registration_policy(): void
    {
        // Guards the regression where Password::defaults() on login would lock
        // out accounts created under a weaker policy.
        User::factory()->create([
            'email' => 'ada@example.com',
            'password' => 'short',
        ]);

        $this->postJson('/api/auth/login', [
            'email' => 'ada@example.com',
            'password' => 'short',
        ])->assertOk();
    }

    public function test_login_is_rate_limited(): void
    {
        // setUp() disabled it for every other test; withMiddleware() with no
        // argument only clears the global flag, not a specific class binding.
        $this->withMiddleware(ThrottleRequests::class);

        for ($i = 0; $i < 5; $i++) {
            $this->postJson('/api/auth/login', [
                'email' => 'ada@example.com',
                'password' => 'Password123!',
            ]);
        }

        $this->postJson('/api/auth/login', [
            'email' => 'ada@example.com',
            'password' => 'Password123!',
        ])->assertStatus(429);
    }

    public function test_me_returns_the_authenticated_user_without_an_envelope(): void
    {
        $user = User::factory()->create(['email' => 'ada@example.com']);

        $this->actingAs($user, 'sanctum')
            ->getJson('/api/auth/me')
            ->assertOk()
            ->assertExactJson([
                'id' => $user->id,
                'name' => $user->name,
                'email' => 'ada@example.com',
                'created_at' => $user->created_at->toISOString(),
            ]);
    }

    public function test_me_rejects_an_unauthenticated_request(): void
    {
        $this->getJson('/api/auth/me')->assertStatus(401);
    }

    public function test_logout_revokes_only_the_current_token(): void
    {
        $user = User::factory()->create();
        $current = $user->createToken('auth_token');
        $other = $user->createToken('auth_token');

        $this->withHeader('Authorization', 'Bearer ' . $current->plainTextToken)
            ->postJson('/api/auth/logout')
            ->assertNoContent();

        $this->assertNull(PersonalAccessToken::find($current->accessToken->id));
        $this->assertNotNull(PersonalAccessToken::find($other->accessToken->id));
    }

    public function test_a_revoked_token_no_longer_authenticates(): void
    {
        $user = User::factory()->create();
        $token = $user->createToken('auth_token')->plainTextToken;

        $this->withHeader('Authorization', 'Bearer ' . $token)
            ->postJson('/api/auth/logout')
            ->assertNoContent();

        // The guard instance caches the user it resolved; production gets a
        // fresh container per request, a test method does not.
        $this->app['auth']->forgetGuards();

        $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/auth/me')
            ->assertStatus(401);
    }
}
