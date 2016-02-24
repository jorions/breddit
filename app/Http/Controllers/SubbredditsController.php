<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App;

class SubbredditsController extends Controller
{

    // index is routed to from a GET request
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return App\Subbreddit::all();
    }


    // store is routed to from a POST request
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Create a new subbreddit
        $subbreddit = new App\Subbreddit;

        // ?? SHOULD THIS USER_ID BE AUTHENTICATED LIKE OUR EXAMPLE BELOW? IF NOT HOW DOES THE $request KNOW WHAT THE
        // USER_ID SHOULD BE?
        $subbreddit->user_id =  \Auth::user()->id;
        $subbreddit->name = $request->name;
        $subbreddit->description = $request->description;

        $subbreddit->save();

        // Return the new thing we have created
        return $subbreddit;
    }


    // show is routed to from a GET request
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // Show all the comments of all of the posts that belong to the subbreddit with the id of $id
        // Eloquent sees 'posts.comments' as the relationships of posts() and comments() within Subbreddits and Posts, respectively
        return App\Subbreddit::with('posts.comments.childComments')->find($id);
    }


    // update is routed to from a PUT request
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // Get a current subbreddit based on its ID
        $subbreddit = App\Subbreddit::find($id);
        $subbreddit->name = $request->name;
        $subbreddit->description = $request->description;

        $subbreddit->save();

        return $subbreddit;
    }


    // destroy is routed to from a DELETE request
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // If we instead said $subbreddit = App\Subbreddit::destroy($id); it would remove the entry from the
        // database then return TRUE or FALSE, which would be assigned to $subbreddit. So instead we used delete() to
        // keep the entry available in memory in case we want to undo the delete
        $subbreddit = App\Subbreddit::find($id);
        $subbreddit->delete();

        // Return the now-deleted subbreddit in case the delete needs to be undone
        return $subbreddit;
    }
}
