<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    /**
     * Handle a login request to the application using JWT.
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'credential' => 'required|string', // email or cpf
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Dados inválidos.',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Accept either email or cpf as credential
        $credential = $request->input('credential');
        $password = $request->input('password');

        $loginFields = filter_var($credential, FILTER_VALIDATE_EMAIL)
            ? ['email' => $credential, 'password' => $password]
            : ['cpf' => $credential, 'password' => $password];

        try {
            if (!$token = JWTAuth::attempt($loginFields)) {
                return response()->json(['message' => 'Credenciais inválidas.'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['message' => 'Não foi possível criar o token.'], 500);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User
     */
    public function me()
    {
        return response()->json(auth('api')->user());
    }

    /**
     * Log the user out (Invalidate the token)
     */
    public function logout()
    {
        try {
            auth('api')->logout();
        } catch (\Throwable $e) {
            // ignore if already invalidated
        }
        return response()->json(['message' => 'Logout realizado com sucesso.']);
    }

    /**
     * Refresh a token.
     */
    public function refresh()
    {
        try {
            $token = auth('api')->refresh();
        } catch (JWTException $e) {
            return response()->json(['message' => 'Não foi possível atualizar o token.'], 401);
        }
        return $this->respondWithToken($token);
    }

    protected function respondWithToken(string $token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
            'user' => auth('api')->user(),
        ]);
    }
}
