'use strict';

// jQuery has very special needs. It attaches itself to the DOM. So while our other libraries are being linked to in each
// file using require(), we can just use this line in this file to make it globally available. You could use this approach
// for backbone and underscore, but you run the risk of interfering with other code in certain use cases.
var $ = window.$ = window.jQuery = require('jquery');
require('foundation');


var HomeView = require('./views/HomeView.js');

// Same as $(document).ready(function() {
$(function() {

    $(document).foundation();
    
    // Put CSRF token in every page
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    // ADD TOP NAV HERE
    
    var homeView = new HomeView();
    $('#content').html(homeView.el);
    homeView.render();
    
})






// This is a powerful part of backbone - views
// Every view has either a collection or a model that goes with it (ex: list view is a collection, item view is a model)
//var PostItemView = Backbone.View.extend({
//
//    // el dictates what your template goes inside of. it is your wrapper
//    el: '<li class="hello"></li>',
//
//    // Every view has at least 2 things that exist by default, and that we can overwrite:
//    // Template
//    // Render function
//
//    // The \ below is how you use multi-line string
//    // The = is needed for text to actually be rendered on the page. Otherwise the javascript runs without rendering
//    // The template is placed inside the el defined above
//    template: _.template('\
//        <h2><%= post.get("title") %></h2>\
//    '),
//
//    events: {
//        // Can't click li because li is the .el, which cannot be edited itself. So we target an individual h2
//        'click h2': function (e) {
//
//            // Destroy only once the backend has confirmed it is OK. AKA "wait" for a successful return
//            this.model.destroy({
//                wait: true
//            });
//        }
//    },
//
//    initialize: function() {
//
//        // Listen to 'all' events that a collection will send off, and when each event occurs, run a function that uses the
//        // given event, which we called 'event'. This is a very good debugging technique for during development
//        this.listenTo(this.model, 'all', function(event) {
//           console.log(event);
//        });
//
//        // Listen for 'sync' events that this.model sends off, and when that event happens, run this.render
//        bbers" listen for those events and run code based on them. AKA "PubSub"
//        this.listenTo(this.model, 'sync', this.render)
//    },
//
//    render: function() {
//        // Every view comes with an el property that looks like el: <div></div> unless otherwise specified in the view
//        // The $ before el gives it jQuery features
//        // We can say this.model and have it show a post because in the code below we pass the view the {model: post} param below
//        this.$el.html(this.template({post: this.model}))
//    }
//});



// Could just say var post = new PostModel(); but we will instead create a shell with an id of 1. It doesn't have any of the
// properties of an actual post. Once you fetch it will get the properties specified from the model's rootURL
//var post = new PostModel({id: 1});
//
//var posts = new PostsCollection();
//
//posts.fetch({
//    success: function () {
//        var postsListView = new PostsListView({ collection: posts })
//        postsListView.render();
//        $('#content').html(postsListView.el);
//    }
//});



// You can just use post.fetch(), followed by the code below in the 'success' statement, but that may lead to an error
// because the view could get rendered before the fetch is complete. Instead, we can make sure the post is ready before
// you render a view by saying "on a successful call back, do this"...
// We gave the post variable an id of 1, so when we run fetch() on it (which is a GET), it looks to post's model (PostModel),
// which points to /api/posts. This is basically a GET request to /api/posts/1, which returns a
//post.fetch({
//    success: function() {
//        var postItemView = new PostItemView({model: post});
//
//        postItemView.render();
//
//        // Stick postItemView inside the item on the page with the id=content
//        $('#content').html(postItemView.el);
//    }
//});








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
//});