(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// Same as $(document).ready(function() {
//$(function() {

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
    idAttribute: 'id',

    // /api/posts/ returns both a post, and the posts's subbreddit as an attribute of the post. So this method is going
    // to assign this subbreddit attribute to a new SubbredditModel so that we can then call on and use it as desired
    parse: function(response) {

        // If there is a subbreddit attribute in the response, make it a new SubbredditModel
        if(response.subbreddit) {
            response.subbreddit = new SubbredditModel(response.subbreddit);
        }
        return response;
    }
});
//var PostModel = require('./models/PostModel.js');


var SubbredditModel = Backbone.Model.extend({
    urlRoot: '/api/subbreddits/',
    idAttribute: 'id',

    parse: function(response) {
        if(response.posts) {
            response.posts = new PostsCollection(response.posts);
        }
        return response;
    }
});

var CommentModel = Backbone.Model.extend({
    urlRoot: '/api/comments/',
    idAttribute: 'id'
});




// This represents a group of models
// Collections are better for listing things (you would never use collect.save()). It is more just for fetching. In other
// words, this is good for your index (GET) controller method
// The optional model attribute tells backbone the type of object that will be returned in a group. Without it a generic
// backbone model would be used. We could do certain things with this generic model, but not fetch and other important things
// that are reliant on the properties of the particular model we want to use
var PostsCollection = Backbone.Collection.extend({
    url: '/api/posts/',
    model: PostModel,
});

var SubbredditsCollection = Backbone.Collection.extend({
    url: '/api/subbreddits/',
    model: SubbredditModel
});

var CommentsCollection = Backbone.Collection.extend({
    url: '/api/comments/',
    model: CommentModel
});




var HomeView = Backbone.View.extend({
   el: '\
        <div class="container">\
            <div class="row">\
                <div class="three columns"></div>\
                <div class="six columns">\
                    <div class="row">\
                        <div class="twelve columns" id="posts"></div>\
                    </div>\
                    <div class="row">\
                        <div class="twelve columns"></div>\
                    </div>\
                </div>\
                <div class="three columns" id="all-subbreddits"></div>\
            </div>\
        </div>\
    ',

    // This is a helper function to stop the render() from getting too big
    insertSubbreddits: function() {
        var subbreddits = new SubbredditsCollection();
        subbreddits.fetch();
        var subbredditsListView = new SubbredditsListView({ collection: subbreddits });
        // Because the subbredditsListView's render function has 'return this' it returns the context of the render, which
        // is the view, which is why we can say 'subbredditsListView.render().el' instead of what we have below. We can
        // access the returned value of 'render()' (the view), and then get its 'el'
        // ALSO Because the subbredditsListView has a listener in its initialize function, we are guaranteeing that even if
        // this render runs before the SubbredditsListView class is defined, when it is defined this render will re-run
        subbredditsListView.render();
        // This uses the 'find' function to search this.el for '#all-subbreddits' and inserts the 'subbredditsListView.el'
        this.$el.find('#all-subbreddits').html(subbredditsListView.el);
    },

    // This is a helper function to stop the render() from getting too big
    insertPosts: function() {
        var posts = new PostsCollection();
        posts.fetch();
        var postsListView = new PostsListView({
            collection: posts
        });
        postsListView.render();
        this.$el.find('#posts').html(postsListView.render().el);
    },

    render: function() {
        this.insertSubbreddits();
        this.insertPosts();
        return this;
    }
});





var SubbredditsListView = Backbone.View.extend({
    // If anything about a view is dynamic it may be easiest to put the parent element as the el, and then put all other
    // information into the template
    el: '<ul></ul>',

    // This contains an each function that iterates over a collection we are calling 'subbreddits,' and each item it
    // iterates over is called 'subbreddit'
    // Below, we can say subbreddit.id instead of subbreddit.get("id") because above when we defined SubbredditModel we
    // gave it 'idAttribute: id' - that gave the subbreddit "top level" access to its id without needing to use get().
    // If we had said 'idAttribute: name' when defining SubbredditModel, the subbreddit.id below would have returned the
    // subbreddit's name instead
    template: _.template('\
        <% subbreddits.each(function(subbreddit) {%>\
            <li><a data-id="<%= subbreddit.id %>" href="#"><%= subbreddit.get("name") %></a></li>\
        <% }) %>\
    '),

    events: {
        // The 'e' in this "anonamyous function" is the event object being passed from the click
        'click a': function(e) {

            // This makes sure that if the clicked link is invalid nothing happens
            e.preventDefault();

            // $(e.target) points to event's target (the clicked link). The data() method looks at any DOM element with
            // an attribute that starts with "data-" and then pulls out the value of the attribute with the name that was
            // given as a parameter. Ex: data('fun') would look for the attribute with the name 'data-fun' and return its
            // value
            var subbredditId = $(e.target).data('id');
            var subbreddit = new SubbredditModel({ id: subbredditId });
            subbreddit.fetch({
                success: function() {
                    var postsListView = new PostsListView({
                        collection: subbreddit.get('posts')
                    });
                    $('#posts').html(postsListView.render().el);
                }
            });
        }
    },

    // initialize is a special function that runs automatically
    // Listen for 'update' on this.collection, and then when that happens, run this.render
    // Don't do 'this.render()' because using () on a method calls that method instead of just referring to it
    initialize: function() {
        this.listenTo(this.collection, 'update', this.render)
    },

    // This calls the template (which we defined as a function) which we pass the variable 'subbreddits' (which we refer
    // to in the template function) and gives the variable the value of 'this.collection,' which is going to be passed in
    // as a parameter when we instantiate the object (var subbredditsListView = new SubbredditsListView({ collection: subbreddits });
    // and then finally passes all of that information into 'this.el'
    render: function() {
        // Same as saying $(this.el).html(........);
        this.$el.html(this.template({ subbreddits: this.collection }));
        return this;
    }
});

var PostsListView = Backbone.View.extend({
    el: '<ul></ul>',

    // Below, we can say post.get("subbreddit").get("name") because of the parse() method we made in the PostModel.
    // Alternatively, if we had not made the subbreddit a model, we could have said post.get("subbreddit.name")
    template: _.template('\
        <% posts.each(function(post) { %>\
            <li>\
                <a href="#"><%= post.get("title") %></a>\
                <% if(post.get("subbreddit")) { %>\
                    <%= post.get("subbreddit").get("name") %>\
                <% } %>\
            </li>\
        <% }) %>\
    '),

    initialize: function() {

        this.listenTo(this.collection, 'update', this.render);

    },

    // We are going to use a <ul></ul>, so we are not going to use a template: _.template()
    render: function() {

        this.$el.html(this.template({ posts: this.collection }));
        return this;
    }
});




var homeView = new HomeView();
$('#content').html(homeView.render().el);








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
},{}]},{},[1]);
