<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use App\Models\User;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    // --- ADICIONE OS DOIS MÉTODOS ABAIXO ---

    /**
     * Define o campo do formulário que será usado para o login.
     * Pode ser qualquer nome, como 'login', 'username', etc.
     */
    public function username()
    {
        return 'login';
    }

    /**
     * Prepara as credenciais para a tentativa de login.
     * Verifica se o campo 'login' é um email ou um CPF e busca o usuário.
     */
    protected function attemptLogin(Request $request)
    {
        $login = $request->input($this->username());
        $password = $request->input('password');

        // Determina se o login é por email ou CPF
        $field = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'cpf';

        $user = null;

        if ($field === 'email') {
            // Busca o usuário diretamente pelo email
            $user = User::where('email', $login)->first();
        } else {
            // Busca na tabela de CPFs e, a partir dela, encontra o usuário
            $user = User::whereHas('cpf', function ($query) use ($login) {
                // Remove caracteres não numéricos do CPF para a busca
                $query->where('number', preg_replace('/[^0-9]/', '', $login));
            })->first();
        }

        // Se encontrou um usuário e a senha está correta, faz o login
        if ($user && \Hash::check($password, $user->password)) {
            $this->guard()->login($user, $request->boolean('remember'));
            return true;
        }

        return false;
    }
}
