<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App;

class SubbredditUserController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = \Auth::user();
        $subbreddit = App\Subbreddit::find($request->subbreddit_id);
        $user->subscribedSubbreddits()->attach($subbreddit);

        // Because we have defined the relationship, the attach assumes that the ID we are giving it is the subbreddit's
        // So instead of the above lines you could just say...
        // \Auth::user()->subscribedSubbreddts()->attach($request->subbreddit_id);

        return $request->subbreddit_id;
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
}
