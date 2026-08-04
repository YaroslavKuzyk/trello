<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Routing\Middleware\ThrottleRequests;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Sanctum decides a request is stateful from its Origin, and only
        // stateful requests get a session. Without this every auth call would
        // be rejected by the 'stateful' middleware.
        $this->withHeader('Origin', 'http://localhost:5173');

        // Auth routes are throttled at 5/min; without this, repeated requests
        // in a test would hit 429 instead of the behaviour under test.
        $this->withoutMiddleware(ThrottleRequests::class);
    }

    public function test_register_creates_the_user_and_starts_a_session(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Ada Lovelace',
            'email' => 'ada@example.com',
            'password' => 'Password123!',
        ]);

        $response->assertCreated()
            ->assertJsonStructure(['id', 'name', 'email', 'created_at'])
            ->assertJsonPath('email', 'ada@example.com');

        $this->assertDatabaseHas('users', ['email' => 'ada@example.com']);
        $this->assertTrue(Hash::check('Password123!', User::first()->password));
        $this->assertAuthenticated();
    }

    public function test_register_never_exposes_the_password(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Ada Lovelace',
            'email' => 'ada@example.com',
            'password' => 'Password123!',
        ]);

        $response->assertCreated();
        $this->assertArrayNotHasKey('password', $response->json());
    }

    public function test_register_rejects_a_duplicate_email(): void
    {
        User::factory()->create(['email' => 'ada@example.com']);

        $this->postJson('/api/auth/register', [
            'name' => 'Ada Lovelace',
            'email' => 'ada@example.com',
            'password' => 'Password123!',
        ])->assertStatus(422)->assertJsonValidationErrors('email');

        $this->assertGuest();
    }

    public function test_login_authenticates_with_valid_credentials(): void
    {
        $user = User::factory()->create([
            'email' => 'ada@example.com',
            'password' => 'Password123!',
        ]);

        $this->postJson('/api/auth/login', [
            'email' => 'ada@example.com',
            'password' => 'Password123!',
        ])->assertOk()->assertJsonPath('email', 'ada@example.com');

        $this->assertAuthenticatedAs($user);
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

        $this->assertGuest();
    }

    public function test_login_rejects_an_unknown_email_with_the_same_error(): void
    {
        $this->postJson('/api/auth/login', [
            'email' => 'nobody@example.com',
            'password' => 'Password123!',
        ])->assertStatus(422)
            ->assertJsonPath('errors.email.0', __('auth.failed'));

        $this->assertGuest();
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

    public function test_login_rotates_the_session_id(): void
    {
        User::factory()->create([
            'email' => 'ada@example.com',
            'password' => 'Password123!',
        ]);

        $this->get('/api/auth/me');
        $before = session()->getId();

        $this->postJson('/api/auth/login', [
            'email' => 'ada@example.com',
            'password' => 'Password123!',
        ])->assertOk();

        $this->assertNotSame($before, session()->getId());
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

        $this->actingAs($user)
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

    public function test_logout_ends_the_session(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->postJson('/api/auth/logout')
            ->assertNoContent();

        // actingAs() put the user straight into the guard instance, which
        // outlives the request inside a test method.
        $this->app['auth']->forgetGuards();

        $this->assertGuest();
    }

    public function test_a_logged_out_session_no_longer_authenticates(): void
    {
        $user = User::factory()->create([
            'email' => 'ada@example.com',
            'password' => 'Password123!',
        ]);

        $this->postJson('/api/auth/login', [
            'email' => 'ada@example.com',
            'password' => 'Password123!',
        ])->assertOk();

        $this->postJson('/api/auth/logout')->assertNoContent();

        // The guard instance caches the user it resolved; production gets a
        // fresh container per request, a test method does not.
        $this->app['auth']->forgetGuards();

        $this->getJson('/api/auth/me')->assertStatus(401);
    }

    public function test_a_stateless_request_is_refused_instead_of_erroring(): void
    {
        // No Origin header — Sanctum treats this as a token-style API call, so
        // there is no session. It must not blow up with a 500.
        $this->defaultHeaders = [];

        $this->postJson('/api/auth/register', [
            'name' => 'Ada Lovelace',
            'email' => 'ada@example.com',
            'password' => 'Password123!',
        ])->assertStatus(400);

        $this->assertDatabaseMissing('users', ['email' => 'ada@example.com']);
    }
}
