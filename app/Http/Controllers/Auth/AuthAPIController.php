<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class AuthAPIController extends Controller
{
    public function login(Request $request){
        $login = $request->validate(
            [
                'username' => 'required|string',
                'password' => 'required|string'
            ],
            [
                'username' => 'enter username',
                'password' => 'enter password'
            ]
        );
        if(!Auth::attempt($login)){
            return 'false';
        }else{
            $user = User::where('username',$request->username)->first();
            $accessToken = $user->createToken('authToken')->accessToken;

            return response()->json([
                'success'=> true,
                'message'=>'User logged in ',
                'user'=>$user,
                'access_token'=> $accessToken
            ]);
        }
    }


    public function register(Request $request){
        $formData = $request->all();
        $validator = Validator::make($formData, [
            'name' => ['required','max:100'],
            'username' => ['required','unique:users'],
            'email' => ['required','unique:users'],
            'password'=>['required','confirmed']
        ]);
        if($validator->fails()){
            return response()->json([
                'success'=> false,
                'message'=>$validator->errors(),
            ]);
        }
        $user = New User();
        $user->name =$request->name;
        $user->username =$request->username;
        $user->email =$request->email;
        $user->password =$request->password;
//        $user->email_verified_at = now();
//        $user->remember_token = Str::random(10);
        $user->save();
        if (!is_null($user)) {
            $user = User::where('username',$request->username)->first();
            $accessToken = $user->createToken('authToken')->accessToken;
            return response()->json([
                'success' => true,
                'message' => 'Registered successully !!',
                'user' => $user,
                'access_token' => $accessToken,
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Registration was not successful !',
                'errors' => null,
            ]);
        }
//        return response()->json([
//            'success'=> true,
//            'message'=>'user saved',
//            'data'=> $user,
//        ]);
    }
    public function logout(Request $request){
        Auth::logout();
        return response()->json([
            'success' => true,
            'message' => 'logged out',
        ]);
    }


}
