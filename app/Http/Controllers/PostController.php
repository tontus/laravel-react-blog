<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $posts = Post::withCount('comments')->orderBy('id', 'DESC')->get();
        return response()->json([
            'success'=> true,
            'message'=>'post list',
            'data'=> $posts,
        ]);
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
            'title' => ['required'],
            'description' => ['required','max:5000'],
            'user_id' => ['required'],
        ]);
        if($validator->fails()){
            return response()->json([
                'success'=> false,
                'errors'=>$validator->errors(),
            ]);
        }
        $post = New Post();
        $post->title =$request->title;
        $post->description =$request->description;
        $post->user_id =$request->user_id;
        $post->save();
        return response()->json([
            'success'=> true,
            'message'=>'post saved',
            'data'=> $post,
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
        $post = Post::find($id);
        return response()->json([
            'success'=> true,
            'message'=>'PostView details',
            'data'=>$post
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        Post::where('id', '=', $id)->first()->delete();
        return response()->json([
            'success'=> true,
            'message'=>'Post deleted'
        ]);
    }


    public function postComments($id)
    {
        $comments = Post::find($id)->comments;
        return response()->json([
            'success'=> true,
            'message'=>'PostView comments',
            'data'=>$comments
        ]);
    }
}
