<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return User[]|\Illuminate\Database\Eloquent\Collection
     */
    public function index()
    {
        $users = User::all();
        return $users;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $formData = $request->all();
        $validator = Validator::make($formData, [
            'name' => ['required','max:100'],
            'username' => ['required','unique:users'],
            'email' => ['required','unique:users'],
//            'password'=>['required']
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
        $user->password ='$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uhzeWG/igi';
//        $user->email_verified_at = now();
//        $user->remember_token = Str::random(10);
        $user->save();
        return response()->json([
            'success'=> true,
            'message'=>'user saved',
            'data'=> $user,
        ]);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $user = User::find($id);
        return response()->json([
            'success'=> true,
            'message'=>'User details',
            'data'=>$user
        ]);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request,$id)
    {
        $formData = $request->all();
        $user = User::find($id);
        if(is_null($user)){
            return response()->json([
                'success'=> false,
                'message'=>'user not found',
                'data'=>null
            ]);
        }
        $validator = Validator::make($formData, [
            'name' => ['required','max:100'],
            'username' => ['required'],
            'email' => ['required'],
//            'password'=>['required']
        ]);
        if($validator->fails()){
            return response()->json([
                'success'=> false,
                'message'=>$validator->errors(),
            ]);
        }
        $user->name =$request->name;
        $user->username =$request->username;
        $user->email =$request->email;
        $user->password ='$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';
//        $user->email_verified_at = now();
//        $user->remember_token = Str::random(10);
        $user->save();
        return response()->json([
            'success'=> true,
            'message'=>'user saved',
            'data'=> $user,
        ]);

    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
    public function userPosts($id)
    {
        $posts = Post::where('user_id',$id) ->get();
        return response()->json([
            'success'=> true,
            'message'=>'post retrieved',
            'data'=> $posts,
        ]);
    }
}
