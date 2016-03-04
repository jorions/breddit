'use strict';

// Put CSRF token in every page
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});



// This is an individual model that is based on the urlRoot you provide
// So when you instantiate a PostModel, the different methods you can use in the console such as fetch etc are tied to
// particular types of request (ex: fetch() = GET). Backbone is made to integrate well with RESTful APIs
// This model does not contain any of the properties of a post right now, it is just a shell. It gets the properties once we
// fetch data
var PostModel = Backbone.Model.extend({
    urlRoot: '/api/posts/',
    // Is almost always just 'id'
    idAttribute: 'id'
});


// This represents a group of models
// Collections are better for listing things (you would never use collect.save()). It is more just for fetching
var PostCollection = Backbone.Collection.extend({
    url: '/api/posts/',
    model: PostModel
});

// This is a powerful part of backbone - views
// Every view has either a collection or a model that goes with it (ex: list view is a collection, item view is a model)
var PostItemView = Backbone.View.extend({

    // Every view has at least 2 things:
    // Template
    // Render function

    // The \ below is how you use multi-line string
    // The = is needed for text to actually be rendered on the page. Otherwise the javascript runs without rendering
    template: _.template('\
        <h2><%= post.get("title") %></h2>\
    '),
    render: function() {
        // Every view comes with an el property that looks like el: <div></div> unless otherwise specified in the view
        // The $ before el gives it jQuery features
        // We can say this.model and have it show a post because in the code below we pass the view the {model: post} param
        this.$el.html(this.template({post: this.model}))
    }
});

// Could just say var post = new PostModel(); but we will instead create a shell with an id of 1. It doesn't have any of the
// properties of an actual post. Once you fetch it will get the properties specified from the model's rootURL
var post = new PostModel({id: 1});

// You can just use post.fetch(), followed by all of the code below, but that may lead to an error because the view
// could get rendered before the fetch is complete. Instead, we can make sure the post is ready before you render a view
// by saying "on a successful call back, do this"...
post.fetch({
    success: function() {
        var postItemView = new PostItemView({model: post});

        postItemView.render();

        $('#content').html(postItemView.el);
    }
});








//// $. is the same as saying "jQuery."
//// Gets the output from api/subbreddits
//$.ajax('/api/subbreddits', {
//    type: 'GET',
//
//    // Ajax always has a success function. Says that when there is a successful (200) response
//    success: function(subbreddits) {
//        var string = "";
//
//        // This returns 2 items - index (idx) and item from index ??? (subbreddit)
//         $.each(subbreddits, function (idx, subbreddit) {
//        // Alternate approach called underscore
//        //_.each(subbreddits, function(subbreddit) {
//            // Could also say string += subbreddit['name']
//            string += subbreddit.name;
//            string += " ";
//        });
//        $('#content').text(string);
//    }
//});
//
//$.ajax('/api/posts', {
//    type: 'GET',
//    success: function(posts) {
//
//        var string = "";
//        $.each(posts, function (idx, post) {
//
//            string += post.title;
//            string += "<br />";
//        });
//        // Note that we are using .html instead of .string, because we inserted a <br /> tag into the string above
//        $('#content').html(string);
//    }
//});