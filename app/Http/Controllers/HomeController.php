<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // This means that even though in our routes we don't have the home route in the 'auth' middleware, the home
        // page will automatically have the 'auth' middleware added to it
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
        // Will insert into the home.blade the user's id with the name userId (can be referenced in the blade with {{ $userId }})
        return view('home', ['userId' => \Auth::user()->id]);
    }
}
