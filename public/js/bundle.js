(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var HomeView = require('./views/HomeView.js');

// Same as $(document).ready(function() {
$(function() {

    // Put CSRF token in every page
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    var homeView = new HomeView();
    $('#content').html(homeView.render().el);

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
},{"./views/HomeView.js":6}],2:[function(require,module,exports){
var PostModel = require('../models/PostModel.js');

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

module.exports = PostsCollection;
},{"../models/PostModel.js":4}],3:[function(require,module,exports){
var SubbredditModel = require('../models/SubbredditModel.js');

var SubbredditsCollection = Backbone.Collection.extend({
    url: '/api/subbreddits/',
    model: SubbredditModel
});

module.exports = SubbredditsCollection;
},{"../models/SubbredditModel.js":5}],4:[function(require,module,exports){
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
            // The "./" at the beginning of the file still means that the file is in the current folder - it just shows
            // that the given item is a file, not a package to check for a .json file
            var SubbredditModel = require('./SubbredditModel.js');
            response.subbreddit = new SubbredditModel(response.subbreddit);
        }
        return response;
    }
});

// This is what the require() in app.js will pull in from this file
module.exports = PostModel;
},{"./SubbredditModel.js":5}],5:[function(require,module,exports){
var SubbredditModel = Backbone.Model.extend({
    urlRoot: '/api/subbreddits/',
    idAttribute: 'id',

    parse: function(response) {
        if(response.posts) {
            var PostsCollection = require('../collections/PostsCollection.js');
            response.posts = new PostsCollection(response.posts);
        }
        return response;
    }
});

module.exports = SubbredditModel;
},{"../collections/PostsCollection.js":2}],6:[function(require,module,exports){
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
        var SubbredditsCollection = require('../collections/SubbredditsCollection.js');
        var subbreddits = new SubbredditsCollection();
        subbreddits.fetch();
        var SubbredditsListView = require('./SubbredditsListView.js');
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
        var PostsCollection = require('../collections/PostsCollection.js');
        var posts = new PostsCollection();
        posts.fetch();
        var PostsListView = require('./PostsListView.js');
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

module.exports = HomeView;
},{"../collections/PostsCollection.js":2,"../collections/SubbredditsCollection.js":3,"./PostsListView.js":7,"./SubbredditsListView.js":8}],7:[function(require,module,exports){
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

module.exports = PostsListView;
},{}],8:[function(require,module,exports){
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
            var SubbredditModel = require('../models/SubbredditModel.js');
            var subbreddit = new SubbredditModel({ id: subbredditId });
            subbreddit.fetch({
                success: function() {
                    var PostsListView = require('./PostsListView.js');
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

module.exports = SubbredditsListView;
},{"../models/SubbredditModel.js":5,"./PostsListView.js":7}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvanMvYXBwLmpzIiwicHVibGljL2pzL2NvbGxlY3Rpb25zL1Bvc3RzQ29sbGVjdGlvbi5qcyIsInB1YmxpYy9qcy9jb2xsZWN0aW9ucy9TdWJicmVkZGl0c0NvbGxlY3Rpb24uanMiLCJwdWJsaWMvanMvbW9kZWxzL1Bvc3RNb2RlbC5qcyIsInB1YmxpYy9qcy9tb2RlbHMvU3ViYnJlZGRpdE1vZGVsLmpzIiwicHVibGljL2pzL3ZpZXdzL0hvbWVWaWV3LmpzIiwicHVibGljL2pzL3ZpZXdzL1Bvc3RzTGlzdFZpZXcuanMiLCJwdWJsaWMvanMvdmlld3MvU3ViYnJlZGRpdHNMaXN0Vmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIEhvbWVWaWV3ID0gcmVxdWlyZSgnLi92aWV3cy9Ib21lVmlldy5qcycpO1xuXG4vLyBTYW1lIGFzICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuJChmdW5jdGlvbigpIHtcblxuICAgIC8vIFB1dCBDU1JGIHRva2VuIGluIGV2ZXJ5IHBhZ2VcbiAgICAkLmFqYXhTZXR1cCh7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdYLUNTUkYtVE9LRU4nOiAkKCdtZXRhW25hbWU9XCJjc3JmLXRva2VuXCJdJykuYXR0cignY29udGVudCcpXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBob21lVmlldyA9IG5ldyBIb21lVmlldygpO1xuICAgICQoJyNjb250ZW50JykuaHRtbChob21lVmlldy5yZW5kZXIoKS5lbCk7XG5cbn0pXG5cblxuXG5cblxuXG4vLyBUaGlzIGlzIGEgcG93ZXJmdWwgcGFydCBvZiBiYWNrYm9uZSAtIHZpZXdzXG4vLyBFdmVyeSB2aWV3IGhhcyBlaXRoZXIgYSBjb2xsZWN0aW9uIG9yIGEgbW9kZWwgdGhhdCBnb2VzIHdpdGggaXQgKGV4OiBsaXN0IHZpZXcgaXMgYSBjb2xsZWN0aW9uLCBpdGVtIHZpZXcgaXMgYSBtb2RlbClcbi8vdmFyIFBvc3RJdGVtVmlldyA9IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcbi8vXG4vLyAgICAvLyBlbCBkaWN0YXRlcyB3aGF0IHlvdXIgdGVtcGxhdGUgZ29lcyBpbnNpZGUgb2YuIGl0IGlzIHlvdXIgd3JhcHBlclxuLy8gICAgZWw6ICc8bGkgY2xhc3M9XCJoZWxsb1wiPjwvbGk+Jyxcbi8vXG4vLyAgICAvLyBFdmVyeSB2aWV3IGhhcyBhdCBsZWFzdCAyIHRoaW5ncyB0aGF0IGV4aXN0IGJ5IGRlZmF1bHQsIGFuZCB0aGF0IHdlIGNhbiBvdmVyd3JpdGU6XG4vLyAgICAvLyBUZW1wbGF0ZVxuLy8gICAgLy8gUmVuZGVyIGZ1bmN0aW9uXG4vL1xuLy8gICAgLy8gVGhlIFxcIGJlbG93IGlzIGhvdyB5b3UgdXNlIG11bHRpLWxpbmUgc3RyaW5nXG4vLyAgICAvLyBUaGUgPSBpcyBuZWVkZWQgZm9yIHRleHQgdG8gYWN0dWFsbHkgYmUgcmVuZGVyZWQgb24gdGhlIHBhZ2UuIE90aGVyd2lzZSB0aGUgamF2YXNjcmlwdCBydW5zIHdpdGhvdXQgcmVuZGVyaW5nXG4vLyAgICAvLyBUaGUgdGVtcGxhdGUgaXMgcGxhY2VkIGluc2lkZSB0aGUgZWwgZGVmaW5lZCBhYm92ZVxuLy8gICAgdGVtcGxhdGU6IF8udGVtcGxhdGUoJ1xcXG4vLyAgICAgICAgPGgyPjwlPSBwb3N0LmdldChcInRpdGxlXCIpICU+PC9oMj5cXFxuLy8gICAgJyksXG4vL1xuLy8gICAgZXZlbnRzOiB7XG4vLyAgICAgICAgLy8gQ2FuJ3QgY2xpY2sgbGkgYmVjYXVzZSBsaSBpcyB0aGUgLmVsLCB3aGljaCBjYW5ub3QgYmUgZWRpdGVkIGl0c2VsZi4gU28gd2UgdGFyZ2V0IGFuIGluZGl2aWR1YWwgaDJcbi8vICAgICAgICAnY2xpY2sgaDInOiBmdW5jdGlvbiAoZSkge1xuLy9cbi8vICAgICAgICAgICAgLy8gRGVzdHJveSBvbmx5IG9uY2UgdGhlIGJhY2tlbmQgaGFzIGNvbmZpcm1lZCBpdCBpcyBPSy4gQUtBIFwid2FpdFwiIGZvciBhIHN1Y2Nlc3NmdWwgcmV0dXJuXG4vLyAgICAgICAgICAgIHRoaXMubW9kZWwuZGVzdHJveSh7XG4vLyAgICAgICAgICAgICAgICB3YWl0OiB0cnVlXG4vLyAgICAgICAgICAgIH0pO1xuLy8gICAgICAgIH1cbi8vICAgIH0sXG4vL1xuLy8gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oKSB7XG4vL1xuLy8gICAgICAgIC8vIExpc3RlbiB0byAnYWxsJyBldmVudHMgdGhhdCBhIGNvbGxlY3Rpb24gd2lsbCBzZW5kIG9mZiwgYW5kIHdoZW4gZWFjaCBldmVudCBvY2N1cnMsIHJ1biBhIGZ1bmN0aW9uIHRoYXQgdXNlcyB0aGVcbi8vICAgICAgICAvLyBnaXZlbiBldmVudCwgd2hpY2ggd2UgY2FsbGVkICdldmVudCcuIFRoaXMgaXMgYSB2ZXJ5IGdvb2QgZGVidWdnaW5nIHRlY2huaXF1ZSBmb3IgZHVyaW5nIGRldmVsb3BtZW50XG4vLyAgICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLm1vZGVsLCAnYWxsJywgZnVuY3Rpb24oZXZlbnQpIHtcbi8vICAgICAgICAgICBjb25zb2xlLmxvZyhldmVudCk7XG4vLyAgICAgICAgfSk7XG4vL1xuLy8gICAgICAgIC8vIExpc3RlbiBmb3IgJ3N5bmMnIGV2ZW50cyB0aGF0IHRoaXMubW9kZWwgc2VuZHMgb2ZmLCBhbmQgd2hlbiB0aGF0IGV2ZW50IGhhcHBlbnMsIHJ1biB0aGlzLnJlbmRlclxuLy8gICAgICAgIGJiZXJzXCIgbGlzdGVuIGZvciB0aG9zZSBldmVudHMgYW5kIHJ1biBjb2RlIGJhc2VkIG9uIHRoZW0uIEFLQSBcIlB1YlN1YlwiXG4vLyAgICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLm1vZGVsLCAnc3luYycsIHRoaXMucmVuZGVyKVxuLy8gICAgfSxcbi8vXG4vLyAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuLy8gICAgICAgIC8vIEV2ZXJ5IHZpZXcgY29tZXMgd2l0aCBhbiBlbCBwcm9wZXJ0eSB0aGF0IGxvb2tzIGxpa2UgZWw6IDxkaXY+PC9kaXY+IHVubGVzcyBvdGhlcndpc2Ugc3BlY2lmaWVkIGluIHRoZSB2aWV3XG4vLyAgICAgICAgLy8gVGhlICQgYmVmb3JlIGVsIGdpdmVzIGl0IGpRdWVyeSBmZWF0dXJlc1xuLy8gICAgICAgIC8vIFdlIGNhbiBzYXkgdGhpcy5tb2RlbCBhbmQgaGF2ZSBpdCBzaG93IGEgcG9zdCBiZWNhdXNlIGluIHRoZSBjb2RlIGJlbG93IHdlIHBhc3MgdGhlIHZpZXcgdGhlIHttb2RlbDogcG9zdH0gcGFyYW0gYmVsb3dcbi8vICAgICAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoe3Bvc3Q6IHRoaXMubW9kZWx9KSlcbi8vICAgIH1cbi8vfSk7XG5cblxuXG4vLyBDb3VsZCBqdXN0IHNheSB2YXIgcG9zdCA9IG5ldyBQb3N0TW9kZWwoKTsgYnV0IHdlIHdpbGwgaW5zdGVhZCBjcmVhdGUgYSBzaGVsbCB3aXRoIGFuIGlkIG9mIDEuIEl0IGRvZXNuJ3QgaGF2ZSBhbnkgb2YgdGhlXG4vLyBwcm9wZXJ0aWVzIG9mIGFuIGFjdHVhbCBwb3N0LiBPbmNlIHlvdSBmZXRjaCBpdCB3aWxsIGdldCB0aGUgcHJvcGVydGllcyBzcGVjaWZpZWQgZnJvbSB0aGUgbW9kZWwncyByb290VVJMXG4vL3ZhciBwb3N0ID0gbmV3IFBvc3RNb2RlbCh7aWQ6IDF9KTtcbi8vXG4vL3ZhciBwb3N0cyA9IG5ldyBQb3N0c0NvbGxlY3Rpb24oKTtcbi8vXG4vL3Bvc3RzLmZldGNoKHtcbi8vICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICB2YXIgcG9zdHNMaXN0VmlldyA9IG5ldyBQb3N0c0xpc3RWaWV3KHsgY29sbGVjdGlvbjogcG9zdHMgfSlcbi8vICAgICAgICBwb3N0c0xpc3RWaWV3LnJlbmRlcigpO1xuLy8gICAgICAgICQoJyNjb250ZW50JykuaHRtbChwb3N0c0xpc3RWaWV3LmVsKTtcbi8vICAgIH1cbi8vfSk7XG5cblxuXG4vLyBZb3UgY2FuIGp1c3QgdXNlIHBvc3QuZmV0Y2goKSwgZm9sbG93ZWQgYnkgdGhlIGNvZGUgYmVsb3cgaW4gdGhlICdzdWNjZXNzJyBzdGF0ZW1lbnQsIGJ1dCB0aGF0IG1heSBsZWFkIHRvIGFuIGVycm9yXG4vLyBiZWNhdXNlIHRoZSB2aWV3IGNvdWxkIGdldCByZW5kZXJlZCBiZWZvcmUgdGhlIGZldGNoIGlzIGNvbXBsZXRlLiBJbnN0ZWFkLCB3ZSBjYW4gbWFrZSBzdXJlIHRoZSBwb3N0IGlzIHJlYWR5IGJlZm9yZVxuLy8geW91IHJlbmRlciBhIHZpZXcgYnkgc2F5aW5nIFwib24gYSBzdWNjZXNzZnVsIGNhbGwgYmFjaywgZG8gdGhpc1wiLi4uXG4vLyBXZSBnYXZlIHRoZSBwb3N0IHZhcmlhYmxlIGFuIGlkIG9mIDEsIHNvIHdoZW4gd2UgcnVuIGZldGNoKCkgb24gaXQgKHdoaWNoIGlzIGEgR0VUKSwgaXQgbG9va3MgdG8gcG9zdCdzIG1vZGVsIChQb3N0TW9kZWwpLFxuLy8gd2hpY2ggcG9pbnRzIHRvIC9hcGkvcG9zdHMuIFRoaXMgaXMgYmFzaWNhbGx5IGEgR0VUIHJlcXVlc3QgdG8gL2FwaS9wb3N0cy8xLCB3aGljaCByZXR1cm5zIGFcbi8vcG9zdC5mZXRjaCh7XG4vLyAgICBzdWNjZXNzOiBmdW5jdGlvbigpIHtcbi8vICAgICAgICB2YXIgcG9zdEl0ZW1WaWV3ID0gbmV3IFBvc3RJdGVtVmlldyh7bW9kZWw6IHBvc3R9KTtcbi8vXG4vLyAgICAgICAgcG9zdEl0ZW1WaWV3LnJlbmRlcigpO1xuLy9cbi8vICAgICAgICAvLyBTdGljayBwb3N0SXRlbVZpZXcgaW5zaWRlIHRoZSBpdGVtIG9uIHRoZSBwYWdlIHdpdGggdGhlIGlkPWNvbnRlbnRcbi8vICAgICAgICAkKCcjY29udGVudCcpLmh0bWwocG9zdEl0ZW1WaWV3LmVsKTtcbi8vICAgIH1cbi8vfSk7XG5cblxuXG5cblxuXG5cblxuLy8vLyAkLiBpcyB0aGUgc2FtZSBhcyBzYXlpbmcgXCJqUXVlcnkuXCJcbi8vLy8gR2V0cyB0aGUgb3V0cHV0IGZyb20gYXBpL3N1YmJyZWRkaXRzXG4vLyQuYWpheCgnL2FwaS9zdWJicmVkZGl0cycsIHtcbi8vICAgIHR5cGU6ICdHRVQnLFxuLy9cbi8vICAgIC8vIEFqYXggYWx3YXlzIGhhcyBhIHN1Y2Nlc3MgZnVuY3Rpb24uIFNheXMgdGhhdCB3aGVuIHRoZXJlIGlzIGEgc3VjY2Vzc2Z1bCAoMjAwKSByZXNwb25zZVxuLy8gICAgc3VjY2VzczogZnVuY3Rpb24oc3ViYnJlZGRpdHMpIHtcbi8vICAgICAgICB2YXIgc3RyaW5nID0gXCJcIjtcbi8vXG4vLyAgICAgICAgLy8gVGhpcyByZXR1cm5zIDIgaXRlbXMgLSBpbmRleCAoaWR4KSBhbmQgaXRlbSBmcm9tIGluZGV4ID8/PyAoc3ViYnJlZGRpdClcbi8vICAgICAgICAgJC5lYWNoKHN1YmJyZWRkaXRzLCBmdW5jdGlvbiAoaWR4LCBzdWJicmVkZGl0KSB7XG4vLyAgICAgICAgLy8gQWx0ZXJuYXRlIGFwcHJvYWNoIGNhbGxlZCB1bmRlcnNjb3JlXG4vLyAgICAgICAgLy9fLmVhY2goc3ViYnJlZGRpdHMsIGZ1bmN0aW9uKHN1YmJyZWRkaXQpIHtcbi8vICAgICAgICAgICAgLy8gQ291bGQgYWxzbyBzYXkgc3RyaW5nICs9IHN1YmJyZWRkaXRbJ25hbWUnXVxuLy8gICAgICAgICAgICBzdHJpbmcgKz0gc3ViYnJlZGRpdC5uYW1lO1xuLy8gICAgICAgICAgICBzdHJpbmcgKz0gXCIgXCI7XG4vLyAgICAgICAgfSk7XG4vLyAgICAgICAgJCgnI2NvbnRlbnQnKS50ZXh0KHN0cmluZyk7XG4vLyAgICB9XG4vL30pO1xuLy9cbi8vJC5hamF4KCcvYXBpL3Bvc3RzJywge1xuLy8gICAgdHlwZTogJ0dFVCcsXG4vLyAgICBzdWNjZXNzOiBmdW5jdGlvbihwb3N0cykge1xuLy9cbi8vICAgICAgICB2YXIgc3RyaW5nID0gXCJcIjtcbi8vICAgICAgICAkLmVhY2gocG9zdHMsIGZ1bmN0aW9uIChpZHgsIHBvc3QpIHtcbi8vXG4vLyAgICAgICAgICAgIHN0cmluZyArPSBwb3N0LnRpdGxlO1xuLy8gICAgICAgICAgICBzdHJpbmcgKz0gXCI8YnIgLz5cIjtcbi8vICAgICAgICB9KTtcbi8vICAgICAgICAvLyBOb3RlIHRoYXQgd2UgYXJlIHVzaW5nIC5odG1sIGluc3RlYWQgb2YgLnN0cmluZywgYmVjYXVzZSB3ZSBpbnNlcnRlZCBhIDxiciAvPiB0YWcgaW50byB0aGUgc3RyaW5nIGFib3ZlXG4vLyAgICAgICAgJCgnI2NvbnRlbnQnKS5odG1sKHN0cmluZyk7XG4vLyAgICB9XG4vL30pO1xuLy99KTsiLCJ2YXIgUG9zdE1vZGVsID0gcmVxdWlyZSgnLi4vbW9kZWxzL1Bvc3RNb2RlbC5qcycpO1xuXG4vLyBUaGlzIHJlcHJlc2VudHMgYSBncm91cCBvZiBtb2RlbHNcbi8vIENvbGxlY3Rpb25zIGFyZSBiZXR0ZXIgZm9yIGxpc3RpbmcgdGhpbmdzICh5b3Ugd291bGQgbmV2ZXIgdXNlIGNvbGxlY3Quc2F2ZSgpKS4gSXQgaXMgbW9yZSBqdXN0IGZvciBmZXRjaGluZy4gSW4gb3RoZXJcbi8vIHdvcmRzLCB0aGlzIGlzIGdvb2QgZm9yIHlvdXIgaW5kZXggKEdFVCkgY29udHJvbGxlciBtZXRob2Rcbi8vIFRoZSBvcHRpb25hbCBtb2RlbCBhdHRyaWJ1dGUgdGVsbHMgYmFja2JvbmUgdGhlIHR5cGUgb2Ygb2JqZWN0IHRoYXQgd2lsbCBiZSByZXR1cm5lZCBpbiBhIGdyb3VwLiBXaXRob3V0IGl0IGEgZ2VuZXJpY1xuLy8gYmFja2JvbmUgbW9kZWwgd291bGQgYmUgdXNlZC4gV2UgY291bGQgZG8gY2VydGFpbiB0aGluZ3Mgd2l0aCB0aGlzIGdlbmVyaWMgbW9kZWwsIGJ1dCBub3QgZmV0Y2ggYW5kIG90aGVyIGltcG9ydGFudCB0aGluZ3Ncbi8vIHRoYXQgYXJlIHJlbGlhbnQgb24gdGhlIHByb3BlcnRpZXMgb2YgdGhlIHBhcnRpY3VsYXIgbW9kZWwgd2Ugd2FudCB0byB1c2VcbnZhciBQb3N0c0NvbGxlY3Rpb24gPSBCYWNrYm9uZS5Db2xsZWN0aW9uLmV4dGVuZCh7XG4gICAgdXJsOiAnL2FwaS9wb3N0cy8nLFxuICAgIG1vZGVsOiBQb3N0TW9kZWwsXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBQb3N0c0NvbGxlY3Rpb247IiwidmFyIFN1YmJyZWRkaXRNb2RlbCA9IHJlcXVpcmUoJy4uL21vZGVscy9TdWJicmVkZGl0TW9kZWwuanMnKTtcblxudmFyIFN1YmJyZWRkaXRzQ29sbGVjdGlvbiA9IEJhY2tib25lLkNvbGxlY3Rpb24uZXh0ZW5kKHtcbiAgICB1cmw6ICcvYXBpL3N1YmJyZWRkaXRzLycsXG4gICAgbW9kZWw6IFN1YmJyZWRkaXRNb2RlbFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU3ViYnJlZGRpdHNDb2xsZWN0aW9uOyIsIi8vIFRoaXMgaXMgYW4gaW5kaXZpZHVhbCBtb2RlbCB0aGF0IGlzIGJhc2VkIG9uIHRoZSB1cmxSb290IHlvdSBwcm92aWRlXG4vLyBTbyB3aGVuIHlvdSBpbnN0YW50aWF0ZSBhIFBvc3RNb2RlbCwgdGhlIGRpZmZlcmVudCBtZXRob2RzIHlvdSBjYW4gdXNlIGluIHRoZSBjb25zb2xlIHN1Y2ggYXMgZmV0Y2ggZXRjIGFyZSB0aWVkIHRvXG4vLyBwYXJ0aWN1bGFyIHR5cGVzIG9mIHJlcXVlc3QgKGV4OiBmZXRjaCgpID0gR0VUKS4gQmFja2JvbmUgaXMgbWFkZSB0byBpbnRlZ3JhdGUgd2VsbCB3aXRoIFJFU1RmdWwgQVBJc1xuLy8gVGhpcyBtb2RlbCBkb2VzIG5vdCBjb250YWluIGFueSBvZiB0aGUgcHJvcGVydGllcyBvZiBhIHBvc3QgcmlnaHQgbm93LCBpdCBpcyBqdXN0IGEgc2hlbGwuIEl0IGdldHMgdGhlIHByb3BlcnRpZXMgb25jZSB3ZVxuLy8gZmV0Y2ggZGF0YVxudmFyIFBvc3RNb2RlbCA9IEJhY2tib25lLk1vZGVsLmV4dGVuZCh7XG4gICAgdXJsUm9vdDogJy9hcGkvcG9zdHMvJyxcbiAgICAvLyBJcyBhbG1vc3QgYWx3YXlzIGp1c3QgJ2lkJ1xuICAgIGlkQXR0cmlidXRlOiAnaWQnLFxuXG4gICAgLy8gL2FwaS9wb3N0cy8gcmV0dXJucyBib3RoIGEgcG9zdCwgYW5kIHRoZSBwb3N0cydzIHN1YmJyZWRkaXQgYXMgYW4gYXR0cmlidXRlIG9mIHRoZSBwb3N0LiBTbyB0aGlzIG1ldGhvZCBpcyBnb2luZ1xuICAgIC8vIHRvIGFzc2lnbiB0aGlzIHN1YmJyZWRkaXQgYXR0cmlidXRlIHRvIGEgbmV3IFN1YmJyZWRkaXRNb2RlbCBzbyB0aGF0IHdlIGNhbiB0aGVuIGNhbGwgb24gYW5kIHVzZSBpdCBhcyBkZXNpcmVkXG4gICAgcGFyc2U6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgYSBzdWJicmVkZGl0IGF0dHJpYnV0ZSBpbiB0aGUgcmVzcG9uc2UsIG1ha2UgaXQgYSBuZXcgU3ViYnJlZGRpdE1vZGVsXG4gICAgICAgIGlmKHJlc3BvbnNlLnN1YmJyZWRkaXQpIHtcbiAgICAgICAgICAgIC8vIFRoZSBcIi4vXCIgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgZmlsZSBzdGlsbCBtZWFucyB0aGF0IHRoZSBmaWxlIGlzIGluIHRoZSBjdXJyZW50IGZvbGRlciAtIGl0IGp1c3Qgc2hvd3NcbiAgICAgICAgICAgIC8vIHRoYXQgdGhlIGdpdmVuIGl0ZW0gaXMgYSBmaWxlLCBub3QgYSBwYWNrYWdlIHRvIGNoZWNrIGZvciBhIC5qc29uIGZpbGVcbiAgICAgICAgICAgIHZhciBTdWJicmVkZGl0TW9kZWwgPSByZXF1aXJlKCcuL1N1YmJyZWRkaXRNb2RlbC5qcycpO1xuICAgICAgICAgICAgcmVzcG9uc2Uuc3ViYnJlZGRpdCA9IG5ldyBTdWJicmVkZGl0TW9kZWwocmVzcG9uc2Uuc3ViYnJlZGRpdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cbn0pO1xuXG4vLyBUaGlzIGlzIHdoYXQgdGhlIHJlcXVpcmUoKSBpbiBhcHAuanMgd2lsbCBwdWxsIGluIGZyb20gdGhpcyBmaWxlXG5tb2R1bGUuZXhwb3J0cyA9IFBvc3RNb2RlbDsiLCJ2YXIgU3ViYnJlZGRpdE1vZGVsID0gQmFja2JvbmUuTW9kZWwuZXh0ZW5kKHtcbiAgICB1cmxSb290OiAnL2FwaS9zdWJicmVkZGl0cy8nLFxuICAgIGlkQXR0cmlidXRlOiAnaWQnLFxuXG4gICAgcGFyc2U6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmKHJlc3BvbnNlLnBvc3RzKSB7XG4gICAgICAgICAgICB2YXIgUG9zdHNDb2xsZWN0aW9uID0gcmVxdWlyZSgnLi4vY29sbGVjdGlvbnMvUG9zdHNDb2xsZWN0aW9uLmpzJyk7XG4gICAgICAgICAgICByZXNwb25zZS5wb3N0cyA9IG5ldyBQb3N0c0NvbGxlY3Rpb24ocmVzcG9uc2UucG9zdHMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdWJicmVkZGl0TW9kZWw7IiwidmFyIEhvbWVWaWV3ID0gQmFja2JvbmUuVmlldy5leHRlbmQoe1xuICAgIGVsOiAnXFxcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XFxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGhyZWUgY29sdW1uc1wiPjwvZGl2PlxcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNpeCBjb2x1bW5zXCI+XFxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHdlbHZlIGNvbHVtbnNcIiBpZD1cInBvc3RzXCI+PC9kaXY+XFxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHdlbHZlIGNvbHVtbnNcIj48L2Rpdj5cXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRocmVlIGNvbHVtbnNcIiBpZD1cImFsbC1zdWJicmVkZGl0c1wiPjwvZGl2PlxcXG4gICAgICAgICAgICA8L2Rpdj5cXFxuICAgICAgICA8L2Rpdj5cXFxuICAgICcsXG5cbiAgICAvLyBUaGlzIGlzIGEgaGVscGVyIGZ1bmN0aW9uIHRvIHN0b3AgdGhlIHJlbmRlcigpIGZyb20gZ2V0dGluZyB0b28gYmlnXG4gICAgaW5zZXJ0U3ViYnJlZGRpdHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgU3ViYnJlZGRpdHNDb2xsZWN0aW9uID0gcmVxdWlyZSgnLi4vY29sbGVjdGlvbnMvU3ViYnJlZGRpdHNDb2xsZWN0aW9uLmpzJyk7XG4gICAgICAgIHZhciBzdWJicmVkZGl0cyA9IG5ldyBTdWJicmVkZGl0c0NvbGxlY3Rpb24oKTtcbiAgICAgICAgc3ViYnJlZGRpdHMuZmV0Y2goKTtcbiAgICAgICAgdmFyIFN1YmJyZWRkaXRzTGlzdFZpZXcgPSByZXF1aXJlKCcuL1N1YmJyZWRkaXRzTGlzdFZpZXcuanMnKTtcbiAgICAgICAgdmFyIHN1YmJyZWRkaXRzTGlzdFZpZXcgPSBuZXcgU3ViYnJlZGRpdHNMaXN0Vmlldyh7IGNvbGxlY3Rpb246IHN1YmJyZWRkaXRzIH0pO1xuICAgICAgICAvLyBCZWNhdXNlIHRoZSBzdWJicmVkZGl0c0xpc3RWaWV3J3MgcmVuZGVyIGZ1bmN0aW9uIGhhcyAncmV0dXJuIHRoaXMnIGl0IHJldHVybnMgdGhlIGNvbnRleHQgb2YgdGhlIHJlbmRlciwgd2hpY2hcbiAgICAgICAgLy8gaXMgdGhlIHZpZXcsIHdoaWNoIGlzIHdoeSB3ZSBjYW4gc2F5ICdzdWJicmVkZGl0c0xpc3RWaWV3LnJlbmRlcigpLmVsJyBpbnN0ZWFkIG9mIHdoYXQgd2UgaGF2ZSBiZWxvdy4gV2UgY2FuXG4gICAgICAgIC8vIGFjY2VzcyB0aGUgcmV0dXJuZWQgdmFsdWUgb2YgJ3JlbmRlcigpJyAodGhlIHZpZXcpLCBhbmQgdGhlbiBnZXQgaXRzICdlbCdcbiAgICAgICAgLy8gQUxTTyBCZWNhdXNlIHRoZSBzdWJicmVkZGl0c0xpc3RWaWV3IGhhcyBhIGxpc3RlbmVyIGluIGl0cyBpbml0aWFsaXplIGZ1bmN0aW9uLCB3ZSBhcmUgZ3VhcmFudGVlaW5nIHRoYXQgZXZlbiBpZlxuICAgICAgICAvLyB0aGlzIHJlbmRlciBydW5zIGJlZm9yZSB0aGUgU3ViYnJlZGRpdHNMaXN0VmlldyBjbGFzcyBpcyBkZWZpbmVkLCB3aGVuIGl0IGlzIGRlZmluZWQgdGhpcyByZW5kZXIgd2lsbCByZS1ydW5cbiAgICAgICAgc3ViYnJlZGRpdHNMaXN0Vmlldy5yZW5kZXIoKTtcbiAgICAgICAgLy8gVGhpcyB1c2VzIHRoZSAnZmluZCcgZnVuY3Rpb24gdG8gc2VhcmNoIHRoaXMuZWwgZm9yICcjYWxsLXN1YmJyZWRkaXRzJyBhbmQgaW5zZXJ0cyB0aGUgJ3N1YmJyZWRkaXRzTGlzdFZpZXcuZWwnXG4gICAgICAgIHRoaXMuJGVsLmZpbmQoJyNhbGwtc3ViYnJlZGRpdHMnKS5odG1sKHN1YmJyZWRkaXRzTGlzdFZpZXcuZWwpO1xuICAgIH0sXG5cbiAgICAvLyBUaGlzIGlzIGEgaGVscGVyIGZ1bmN0aW9uIHRvIHN0b3AgdGhlIHJlbmRlcigpIGZyb20gZ2V0dGluZyB0b28gYmlnXG4gICAgaW5zZXJ0UG9zdHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgUG9zdHNDb2xsZWN0aW9uID0gcmVxdWlyZSgnLi4vY29sbGVjdGlvbnMvUG9zdHNDb2xsZWN0aW9uLmpzJyk7XG4gICAgICAgIHZhciBwb3N0cyA9IG5ldyBQb3N0c0NvbGxlY3Rpb24oKTtcbiAgICAgICAgcG9zdHMuZmV0Y2goKTtcbiAgICAgICAgdmFyIFBvc3RzTGlzdFZpZXcgPSByZXF1aXJlKCcuL1Bvc3RzTGlzdFZpZXcuanMnKTtcbiAgICAgICAgdmFyIHBvc3RzTGlzdFZpZXcgPSBuZXcgUG9zdHNMaXN0Vmlldyh7XG4gICAgICAgICAgICBjb2xsZWN0aW9uOiBwb3N0c1xuICAgICAgICB9KTtcbiAgICAgICAgcG9zdHNMaXN0Vmlldy5yZW5kZXIoKTtcbiAgICAgICAgdGhpcy4kZWwuZmluZCgnI3Bvc3RzJykuaHRtbChwb3N0c0xpc3RWaWV3LnJlbmRlcigpLmVsKTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5pbnNlcnRTdWJicmVkZGl0cygpO1xuICAgICAgICB0aGlzLmluc2VydFBvc3RzKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhvbWVWaWV3OyIsInZhciBQb3N0c0xpc3RWaWV3ID0gQmFja2JvbmUuVmlldy5leHRlbmQoe1xuICAgIGVsOiAnPHVsPjwvdWw+JyxcblxuICAgIC8vIEJlbG93LCB3ZSBjYW4gc2F5IHBvc3QuZ2V0KFwic3ViYnJlZGRpdFwiKS5nZXQoXCJuYW1lXCIpIGJlY2F1c2Ugb2YgdGhlIHBhcnNlKCkgbWV0aG9kIHdlIG1hZGUgaW4gdGhlIFBvc3RNb2RlbC5cbiAgICAvLyBBbHRlcm5hdGl2ZWx5LCBpZiB3ZSBoYWQgbm90IG1hZGUgdGhlIHN1YmJyZWRkaXQgYSBtb2RlbCwgd2UgY291bGQgaGF2ZSBzYWlkIHBvc3QuZ2V0KFwic3ViYnJlZGRpdC5uYW1lXCIpXG4gICAgdGVtcGxhdGU6IF8udGVtcGxhdGUoJ1xcXG4gICAgICAgIDwlIHBvc3RzLmVhY2goZnVuY3Rpb24ocG9zdCkgeyAlPlxcXG4gICAgICAgICAgICA8bGk+XFxcbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiPjwlPSBwb3N0LmdldChcInRpdGxlXCIpICU+PC9hPlxcXG4gICAgICAgICAgICAgICAgPCUgaWYocG9zdC5nZXQoXCJzdWJicmVkZGl0XCIpKSB7ICU+XFxcbiAgICAgICAgICAgICAgICAgICAgPCU9IHBvc3QuZ2V0KFwic3ViYnJlZGRpdFwiKS5nZXQoXCJuYW1lXCIpICU+XFxcbiAgICAgICAgICAgICAgICA8JSB9ICU+XFxcbiAgICAgICAgICAgIDwvbGk+XFxcbiAgICAgICAgPCUgfSkgJT5cXFxuICAgICcpLFxuXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbGxlY3Rpb24sICd1cGRhdGUnLCB0aGlzLnJlbmRlcik7XG5cbiAgICB9LFxuXG4gICAgLy8gV2UgYXJlIGdvaW5nIHRvIHVzZSBhIDx1bD48L3VsPiwgc28gd2UgYXJlIG5vdCBnb2luZyB0byB1c2UgYSB0ZW1wbGF0ZTogXy50ZW1wbGF0ZSgpXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcblxuICAgICAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoeyBwb3N0czogdGhpcy5jb2xsZWN0aW9uIH0pKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUG9zdHNMaXN0VmlldzsiLCJ2YXIgU3ViYnJlZGRpdHNMaXN0VmlldyA9IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcbiAgICAvLyBJZiBhbnl0aGluZyBhYm91dCBhIHZpZXcgaXMgZHluYW1pYyBpdCBtYXkgYmUgZWFzaWVzdCB0byBwdXQgdGhlIHBhcmVudCBlbGVtZW50IGFzIHRoZSBlbCwgYW5kIHRoZW4gcHV0IGFsbCBvdGhlclxuICAgIC8vIGluZm9ybWF0aW9uIGludG8gdGhlIHRlbXBsYXRlXG4gICAgZWw6ICc8dWw+PC91bD4nLFxuXG4gICAgLy8gVGhpcyBjb250YWlucyBhbiBlYWNoIGZ1bmN0aW9uIHRoYXQgaXRlcmF0ZXMgb3ZlciBhIGNvbGxlY3Rpb24gd2UgYXJlIGNhbGxpbmcgJ3N1YmJyZWRkaXRzLCcgYW5kIGVhY2ggaXRlbSBpdFxuICAgIC8vIGl0ZXJhdGVzIG92ZXIgaXMgY2FsbGVkICdzdWJicmVkZGl0J1xuICAgIC8vIEJlbG93LCB3ZSBjYW4gc2F5IHN1YmJyZWRkaXQuaWQgaW5zdGVhZCBvZiBzdWJicmVkZGl0LmdldChcImlkXCIpIGJlY2F1c2UgYWJvdmUgd2hlbiB3ZSBkZWZpbmVkIFN1YmJyZWRkaXRNb2RlbCB3ZVxuICAgIC8vIGdhdmUgaXQgJ2lkQXR0cmlidXRlOiBpZCcgLSB0aGF0IGdhdmUgdGhlIHN1YmJyZWRkaXQgXCJ0b3AgbGV2ZWxcIiBhY2Nlc3MgdG8gaXRzIGlkIHdpdGhvdXQgbmVlZGluZyB0byB1c2UgZ2V0KCkuXG4gICAgLy8gSWYgd2UgaGFkIHNhaWQgJ2lkQXR0cmlidXRlOiBuYW1lJyB3aGVuIGRlZmluaW5nIFN1YmJyZWRkaXRNb2RlbCwgdGhlIHN1YmJyZWRkaXQuaWQgYmVsb3cgd291bGQgaGF2ZSByZXR1cm5lZCB0aGVcbiAgICAvLyBzdWJicmVkZGl0J3MgbmFtZSBpbnN0ZWFkXG4gICAgdGVtcGxhdGU6IF8udGVtcGxhdGUoJ1xcXG4gICAgICAgIDwlIHN1YmJyZWRkaXRzLmVhY2goZnVuY3Rpb24oc3ViYnJlZGRpdCkgeyU+XFxcbiAgICAgICAgICAgIDxsaT48YSBkYXRhLWlkPVwiPCU9IHN1YmJyZWRkaXQuaWQgJT5cIiBocmVmPVwiI1wiPjwlPSBzdWJicmVkZGl0LmdldChcIm5hbWVcIikgJT48L2E+PC9saT5cXFxuICAgICAgICA8JSB9KSAlPlxcXG4gICAgJyksXG5cbiAgICBldmVudHM6IHtcbiAgICAgICAgLy8gVGhlICdlJyBpbiB0aGlzIFwiYW5vbmFteW91cyBmdW5jdGlvblwiIGlzIHRoZSBldmVudCBvYmplY3QgYmVpbmcgcGFzc2VkIGZyb20gdGhlIGNsaWNrXG4gICAgICAgICdjbGljayBhJzogZnVuY3Rpb24oZSkge1xuXG4gICAgICAgICAgICAvLyBUaGlzIG1ha2VzIHN1cmUgdGhhdCBpZiB0aGUgY2xpY2tlZCBsaW5rIGlzIGludmFsaWQgbm90aGluZyBoYXBwZW5zXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIC8vICQoZS50YXJnZXQpIHBvaW50cyB0byBldmVudCdzIHRhcmdldCAodGhlIGNsaWNrZWQgbGluaykuIFRoZSBkYXRhKCkgbWV0aG9kIGxvb2tzIGF0IGFueSBET00gZWxlbWVudCB3aXRoXG4gICAgICAgICAgICAvLyBhbiBhdHRyaWJ1dGUgdGhhdCBzdGFydHMgd2l0aCBcImRhdGEtXCIgYW5kIHRoZW4gcHVsbHMgb3V0IHRoZSB2YWx1ZSBvZiB0aGUgYXR0cmlidXRlIHdpdGggdGhlIG5hbWUgdGhhdCB3YXNcbiAgICAgICAgICAgIC8vIGdpdmVuIGFzIGEgcGFyYW1ldGVyLiBFeDogZGF0YSgnZnVuJykgd291bGQgbG9vayBmb3IgdGhlIGF0dHJpYnV0ZSB3aXRoIHRoZSBuYW1lICdkYXRhLWZ1bicgYW5kIHJldHVybiBpdHNcbiAgICAgICAgICAgIC8vIHZhbHVlXG4gICAgICAgICAgICB2YXIgc3ViYnJlZGRpdElkID0gJChlLnRhcmdldCkuZGF0YSgnaWQnKTtcbiAgICAgICAgICAgIHZhciBTdWJicmVkZGl0TW9kZWwgPSByZXF1aXJlKCcuLi9tb2RlbHMvU3ViYnJlZGRpdE1vZGVsLmpzJyk7XG4gICAgICAgICAgICB2YXIgc3ViYnJlZGRpdCA9IG5ldyBTdWJicmVkZGl0TW9kZWwoeyBpZDogc3ViYnJlZGRpdElkIH0pO1xuICAgICAgICAgICAgc3ViYnJlZGRpdC5mZXRjaCh7XG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBQb3N0c0xpc3RWaWV3ID0gcmVxdWlyZSgnLi9Qb3N0c0xpc3RWaWV3LmpzJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3N0c0xpc3RWaWV3ID0gbmV3IFBvc3RzTGlzdFZpZXcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGVjdGlvbjogc3ViYnJlZGRpdC5nZXQoJ3Bvc3RzJylcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICQoJyNwb3N0cycpLmh0bWwocG9zdHNMaXN0Vmlldy5yZW5kZXIoKS5lbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gaW5pdGlhbGl6ZSBpcyBhIHNwZWNpYWwgZnVuY3Rpb24gdGhhdCBydW5zIGF1dG9tYXRpY2FsbHlcbiAgICAvLyBMaXN0ZW4gZm9yICd1cGRhdGUnIG9uIHRoaXMuY29sbGVjdGlvbiwgYW5kIHRoZW4gd2hlbiB0aGF0IGhhcHBlbnMsIHJ1biB0aGlzLnJlbmRlclxuICAgIC8vIERvbid0IGRvICd0aGlzLnJlbmRlcigpJyBiZWNhdXNlIHVzaW5nICgpIG9uIGEgbWV0aG9kIGNhbGxzIHRoYXQgbWV0aG9kIGluc3RlYWQgb2YganVzdCByZWZlcnJpbmcgdG8gaXRcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbGxlY3Rpb24sICd1cGRhdGUnLCB0aGlzLnJlbmRlcilcbiAgICB9LFxuXG4gICAgLy8gVGhpcyBjYWxscyB0aGUgdGVtcGxhdGUgKHdoaWNoIHdlIGRlZmluZWQgYXMgYSBmdW5jdGlvbikgd2hpY2ggd2UgcGFzcyB0aGUgdmFyaWFibGUgJ3N1YmJyZWRkaXRzJyAod2hpY2ggd2UgcmVmZXJcbiAgICAvLyB0byBpbiB0aGUgdGVtcGxhdGUgZnVuY3Rpb24pIGFuZCBnaXZlcyB0aGUgdmFyaWFibGUgdGhlIHZhbHVlIG9mICd0aGlzLmNvbGxlY3Rpb24sJyB3aGljaCBpcyBnb2luZyB0byBiZSBwYXNzZWQgaW5cbiAgICAvLyBhcyBhIHBhcmFtZXRlciB3aGVuIHdlIGluc3RhbnRpYXRlIHRoZSBvYmplY3QgKHZhciBzdWJicmVkZGl0c0xpc3RWaWV3ID0gbmV3IFN1YmJyZWRkaXRzTGlzdFZpZXcoeyBjb2xsZWN0aW9uOiBzdWJicmVkZGl0cyB9KTtcbiAgICAvLyBhbmQgdGhlbiBmaW5hbGx5IHBhc3NlcyBhbGwgb2YgdGhhdCBpbmZvcm1hdGlvbiBpbnRvICd0aGlzLmVsJ1xuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIFNhbWUgYXMgc2F5aW5nICQodGhpcy5lbCkuaHRtbCguLi4uLi4uLik7XG4gICAgICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSh7IHN1YmJyZWRkaXRzOiB0aGlzLmNvbGxlY3Rpb24gfSkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdWJicmVkZGl0c0xpc3RWaWV3OyJdfQ==
