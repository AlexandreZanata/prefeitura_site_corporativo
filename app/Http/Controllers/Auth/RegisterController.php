<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Cpf;
use App\Models\Role;
use App\Models\Status;
use App\Models\User;
use App\Rules\ValidCpf;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    use RegistersUsers;

    protected $redirectTo = '/home';

    public function __construct()
    {
        $this->middleware('guest');
    }

    protected function validator(array $data)
    {
        // Limpa o CPF para a validação de unicidade
        $cpfOnlyNumbers = preg_replace('/[^0-9]/', '', $data['cpf'] ?? '');

        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'cpf' => ['required', 'string', 'unique:cpfs,number,' . $cpfOnlyNumbers, new ValidCpf],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }

    protected function create(array $data)
    {
        // Pega a role e o status padrão para novos usuários
        $userRole = Role::where('slug', 'user')->firstOrFail();
        $activeStatus = Status::where('slug', 'active')->firstOrFail();

        // Usa uma transação para garantir que ambos (User e Cpf) sejam criados com sucesso
        return DB::transaction(function () use ($data, $userRole, $activeStatus) {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'role_id' => $userRole->id,
                'status_id' => $activeStatus->id,
            ]);

            Cpf::create([
                'user_id' => $user->id,
                'number' => preg_replace('/[^0-9]/', '', $data['cpf']), // Salva somente os números
            ]);

            return $user;
        });
    }
}
