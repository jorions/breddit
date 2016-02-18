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
        factory(App\User::class, 50)->create()->each(function($user) {

            // Each user will make 1 subbreddit
            $user->subbreddits()->save(factory(App\Subbreddit::class)->make());

            // Each user will make 1 post on a random subbreddit
            $user->posts()->save(factory(App\Post::class)->make([
                'subbreddit_id' => rand(1, App\Subbreddit::all()->count())
            ]));

            // Each user will leave a comment on a random post
            $user->comments()->save(factory(App\Comment::class)->make([
                'post_id' => rand(1, App\Post::all()->count())
            ]));

            // Each user will leave a comment on a random comment
            $user->comments()->save(factory(App\Comment::class)->make([
                'comment_id' => rand(1, App\Comment::all()->count())
            ]));

            // Each user will subscribe to 1 subbreddit
            $user->subscribedSubbreddits()->attach(rand(1, App\Subbreddit::all()->count()));
        });
    }
}
