<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

// This creates an instance using the define method (similar to saying $factory =)
$factory->define(App\User::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->email,
        'password' => bcrypt(str_random(10)),
        'remember_token' => str_random(10),
    ];
});


/*
Below code is equivalent to saying
App\Subbreddit::create([
	$name->subbreddit()
	$descrption->subbreddit()
])
*/


$factory->define(App\Subbreddit::class, function(Faker\Generator $faker) {
	return [
		'name' => $faker->word,
		'description' => $faker->text,
	];
});


$factory->define(App\Comment::class, function(Faker\Generator $faker) {
	return [
		'content' => $faker->text,
	];
});

$factory->define(App\Post::class, function(Faker\Generator $faker) {
	return [
		'title' => $faker->sentence,
		'content' => $faker->text,
		'url' => $faker->url,
	];
});