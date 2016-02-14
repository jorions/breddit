<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\User::class, 1000)->create()->each(function($user) {
        	$subbreddit = new App\Subbreddit;
        	$subbreddit->name = 




        	)
        }
    }
}
