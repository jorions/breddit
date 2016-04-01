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
},{"./views/HomeView.js":2}],2:[function(require,module,exports){
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

module.exports = HomeView;
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvanMvYXBwLmpzIiwicHVibGljL2pzL3ZpZXdzL0hvbWVWaWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIEhvbWVWaWV3ID0gcmVxdWlyZSgnLi92aWV3cy9Ib21lVmlldy5qcycpO1xuXG4vLyBTYW1lIGFzICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuJChmdW5jdGlvbigpIHtcblxuICAgIC8vIFB1dCBDU1JGIHRva2VuIGluIGV2ZXJ5IHBhZ2VcbiAgICAkLmFqYXhTZXR1cCh7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdYLUNTUkYtVE9LRU4nOiAkKCdtZXRhW25hbWU9XCJjc3JmLXRva2VuXCJdJykuYXR0cignY29udGVudCcpXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBob21lVmlldyA9IG5ldyBIb21lVmlldygpO1xuICAgICQoJyNjb250ZW50JykuaHRtbChob21lVmlldy5yZW5kZXIoKS5lbCk7XG5cbn0pXG5cblxuXG5cblxuXG4vLyBUaGlzIGlzIGEgcG93ZXJmdWwgcGFydCBvZiBiYWNrYm9uZSAtIHZpZXdzXG4vLyBFdmVyeSB2aWV3IGhhcyBlaXRoZXIgYSBjb2xsZWN0aW9uIG9yIGEgbW9kZWwgdGhhdCBnb2VzIHdpdGggaXQgKGV4OiBsaXN0IHZpZXcgaXMgYSBjb2xsZWN0aW9uLCBpdGVtIHZpZXcgaXMgYSBtb2RlbClcbi8vdmFyIFBvc3RJdGVtVmlldyA9IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcbi8vXG4vLyAgICAvLyBlbCBkaWN0YXRlcyB3aGF0IHlvdXIgdGVtcGxhdGUgZ29lcyBpbnNpZGUgb2YuIGl0IGlzIHlvdXIgd3JhcHBlclxuLy8gICAgZWw6ICc8bGkgY2xhc3M9XCJoZWxsb1wiPjwvbGk+Jyxcbi8vXG4vLyAgICAvLyBFdmVyeSB2aWV3IGhhcyBhdCBsZWFzdCAyIHRoaW5ncyB0aGF0IGV4aXN0IGJ5IGRlZmF1bHQsIGFuZCB0aGF0IHdlIGNhbiBvdmVyd3JpdGU6XG4vLyAgICAvLyBUZW1wbGF0ZVxuLy8gICAgLy8gUmVuZGVyIGZ1bmN0aW9uXG4vL1xuLy8gICAgLy8gVGhlIFxcIGJlbG93IGlzIGhvdyB5b3UgdXNlIG11bHRpLWxpbmUgc3RyaW5nXG4vLyAgICAvLyBUaGUgPSBpcyBuZWVkZWQgZm9yIHRleHQgdG8gYWN0dWFsbHkgYmUgcmVuZGVyZWQgb24gdGhlIHBhZ2UuIE90aGVyd2lzZSB0aGUgamF2YXNjcmlwdCBydW5zIHdpdGhvdXQgcmVuZGVyaW5nXG4vLyAgICAvLyBUaGUgdGVtcGxhdGUgaXMgcGxhY2VkIGluc2lkZSB0aGUgZWwgZGVmaW5lZCBhYm92ZVxuLy8gICAgdGVtcGxhdGU6IF8udGVtcGxhdGUoJ1xcXG4vLyAgICAgICAgPGgyPjwlPSBwb3N0LmdldChcInRpdGxlXCIpICU+PC9oMj5cXFxuLy8gICAgJyksXG4vL1xuLy8gICAgZXZlbnRzOiB7XG4vLyAgICAgICAgLy8gQ2FuJ3QgY2xpY2sgbGkgYmVjYXVzZSBsaSBpcyB0aGUgLmVsLCB3aGljaCBjYW5ub3QgYmUgZWRpdGVkIGl0c2VsZi4gU28gd2UgdGFyZ2V0IGFuIGluZGl2aWR1YWwgaDJcbi8vICAgICAgICAnY2xpY2sgaDInOiBmdW5jdGlvbiAoZSkge1xuLy9cbi8vICAgICAgICAgICAgLy8gRGVzdHJveSBvbmx5IG9uY2UgdGhlIGJhY2tlbmQgaGFzIGNvbmZpcm1lZCBpdCBpcyBPSy4gQUtBIFwid2FpdFwiIGZvciBhIHN1Y2Nlc3NmdWwgcmV0dXJuXG4vLyAgICAgICAgICAgIHRoaXMubW9kZWwuZGVzdHJveSh7XG4vLyAgICAgICAgICAgICAgICB3YWl0OiB0cnVlXG4vLyAgICAgICAgICAgIH0pO1xuLy8gICAgICAgIH1cbi8vICAgIH0sXG4vL1xuLy8gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oKSB7XG4vL1xuLy8gICAgICAgIC8vIExpc3RlbiB0byAnYWxsJyBldmVudHMgdGhhdCBhIGNvbGxlY3Rpb24gd2lsbCBzZW5kIG9mZiwgYW5kIHdoZW4gZWFjaCBldmVudCBvY2N1cnMsIHJ1biBhIGZ1bmN0aW9uIHRoYXQgdXNlcyB0aGVcbi8vICAgICAgICAvLyBnaXZlbiBldmVudCwgd2hpY2ggd2UgY2FsbGVkICdldmVudCcuIFRoaXMgaXMgYSB2ZXJ5IGdvb2QgZGVidWdnaW5nIHRlY2huaXF1ZSBmb3IgZHVyaW5nIGRldmVsb3BtZW50XG4vLyAgICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLm1vZGVsLCAnYWxsJywgZnVuY3Rpb24oZXZlbnQpIHtcbi8vICAgICAgICAgICBjb25zb2xlLmxvZyhldmVudCk7XG4vLyAgICAgICAgfSk7XG4vL1xuLy8gICAgICAgIC8vIExpc3RlbiBmb3IgJ3N5bmMnIGV2ZW50cyB0aGF0IHRoaXMubW9kZWwgc2VuZHMgb2ZmLCBhbmQgd2hlbiB0aGF0IGV2ZW50IGhhcHBlbnMsIHJ1biB0aGlzLnJlbmRlclxuLy8gICAgICAgIGJiZXJzXCIgbGlzdGVuIGZvciB0aG9zZSBldmVudHMgYW5kIHJ1biBjb2RlIGJhc2VkIG9uIHRoZW0uIEFLQSBcIlB1YlN1YlwiXG4vLyAgICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLm1vZGVsLCAnc3luYycsIHRoaXMucmVuZGVyKVxuLy8gICAgfSxcbi8vXG4vLyAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuLy8gICAgICAgIC8vIEV2ZXJ5IHZpZXcgY29tZXMgd2l0aCBhbiBlbCBwcm9wZXJ0eSB0aGF0IGxvb2tzIGxpa2UgZWw6IDxkaXY+PC9kaXY+IHVubGVzcyBvdGhlcndpc2Ugc3BlY2lmaWVkIGluIHRoZSB2aWV3XG4vLyAgICAgICAgLy8gVGhlICQgYmVmb3JlIGVsIGdpdmVzIGl0IGpRdWVyeSBmZWF0dXJlc1xuLy8gICAgICAgIC8vIFdlIGNhbiBzYXkgdGhpcy5tb2RlbCBhbmQgaGF2ZSBpdCBzaG93IGEgcG9zdCBiZWNhdXNlIGluIHRoZSBjb2RlIGJlbG93IHdlIHBhc3MgdGhlIHZpZXcgdGhlIHttb2RlbDogcG9zdH0gcGFyYW0gYmVsb3dcbi8vICAgICAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoe3Bvc3Q6IHRoaXMubW9kZWx9KSlcbi8vICAgIH1cbi8vfSk7XG5cblxuXG4vLyBDb3VsZCBqdXN0IHNheSB2YXIgcG9zdCA9IG5ldyBQb3N0TW9kZWwoKTsgYnV0IHdlIHdpbGwgaW5zdGVhZCBjcmVhdGUgYSBzaGVsbCB3aXRoIGFuIGlkIG9mIDEuIEl0IGRvZXNuJ3QgaGF2ZSBhbnkgb2YgdGhlXG4vLyBwcm9wZXJ0aWVzIG9mIGFuIGFjdHVhbCBwb3N0LiBPbmNlIHlvdSBmZXRjaCBpdCB3aWxsIGdldCB0aGUgcHJvcGVydGllcyBzcGVjaWZpZWQgZnJvbSB0aGUgbW9kZWwncyByb290VVJMXG4vL3ZhciBwb3N0ID0gbmV3IFBvc3RNb2RlbCh7aWQ6IDF9KTtcbi8vXG4vL3ZhciBwb3N0cyA9IG5ldyBQb3N0c0NvbGxlY3Rpb24oKTtcbi8vXG4vL3Bvc3RzLmZldGNoKHtcbi8vICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICB2YXIgcG9zdHNMaXN0VmlldyA9IG5ldyBQb3N0c0xpc3RWaWV3KHsgY29sbGVjdGlvbjogcG9zdHMgfSlcbi8vICAgICAgICBwb3N0c0xpc3RWaWV3LnJlbmRlcigpO1xuLy8gICAgICAgICQoJyNjb250ZW50JykuaHRtbChwb3N0c0xpc3RWaWV3LmVsKTtcbi8vICAgIH1cbi8vfSk7XG5cblxuXG4vLyBZb3UgY2FuIGp1c3QgdXNlIHBvc3QuZmV0Y2goKSwgZm9sbG93ZWQgYnkgdGhlIGNvZGUgYmVsb3cgaW4gdGhlICdzdWNjZXNzJyBzdGF0ZW1lbnQsIGJ1dCB0aGF0IG1heSBsZWFkIHRvIGFuIGVycm9yXG4vLyBiZWNhdXNlIHRoZSB2aWV3IGNvdWxkIGdldCByZW5kZXJlZCBiZWZvcmUgdGhlIGZldGNoIGlzIGNvbXBsZXRlLiBJbnN0ZWFkLCB3ZSBjYW4gbWFrZSBzdXJlIHRoZSBwb3N0IGlzIHJlYWR5IGJlZm9yZVxuLy8geW91IHJlbmRlciBhIHZpZXcgYnkgc2F5aW5nIFwib24gYSBzdWNjZXNzZnVsIGNhbGwgYmFjaywgZG8gdGhpc1wiLi4uXG4vLyBXZSBnYXZlIHRoZSBwb3N0IHZhcmlhYmxlIGFuIGlkIG9mIDEsIHNvIHdoZW4gd2UgcnVuIGZldGNoKCkgb24gaXQgKHdoaWNoIGlzIGEgR0VUKSwgaXQgbG9va3MgdG8gcG9zdCdzIG1vZGVsIChQb3N0TW9kZWwpLFxuLy8gd2hpY2ggcG9pbnRzIHRvIC9hcGkvcG9zdHMuIFRoaXMgaXMgYmFzaWNhbGx5IGEgR0VUIHJlcXVlc3QgdG8gL2FwaS9wb3N0cy8xLCB3aGljaCByZXR1cm5zIGFcbi8vcG9zdC5mZXRjaCh7XG4vLyAgICBzdWNjZXNzOiBmdW5jdGlvbigpIHtcbi8vICAgICAgICB2YXIgcG9zdEl0ZW1WaWV3ID0gbmV3IFBvc3RJdGVtVmlldyh7bW9kZWw6IHBvc3R9KTtcbi8vXG4vLyAgICAgICAgcG9zdEl0ZW1WaWV3LnJlbmRlcigpO1xuLy9cbi8vICAgICAgICAvLyBTdGljayBwb3N0SXRlbVZpZXcgaW5zaWRlIHRoZSBpdGVtIG9uIHRoZSBwYWdlIHdpdGggdGhlIGlkPWNvbnRlbnRcbi8vICAgICAgICAkKCcjY29udGVudCcpLmh0bWwocG9zdEl0ZW1WaWV3LmVsKTtcbi8vICAgIH1cbi8vfSk7XG5cblxuXG5cblxuXG5cblxuLy8vLyAkLiBpcyB0aGUgc2FtZSBhcyBzYXlpbmcgXCJqUXVlcnkuXCJcbi8vLy8gR2V0cyB0aGUgb3V0cHV0IGZyb20gYXBpL3N1YmJyZWRkaXRzXG4vLyQuYWpheCgnL2FwaS9zdWJicmVkZGl0cycsIHtcbi8vICAgIHR5cGU6ICdHRVQnLFxuLy9cbi8vICAgIC8vIEFqYXggYWx3YXlzIGhhcyBhIHN1Y2Nlc3MgZnVuY3Rpb24uIFNheXMgdGhhdCB3aGVuIHRoZXJlIGlzIGEgc3VjY2Vzc2Z1bCAoMjAwKSByZXNwb25zZVxuLy8gICAgc3VjY2VzczogZnVuY3Rpb24oc3ViYnJlZGRpdHMpIHtcbi8vICAgICAgICB2YXIgc3RyaW5nID0gXCJcIjtcbi8vXG4vLyAgICAgICAgLy8gVGhpcyByZXR1cm5zIDIgaXRlbXMgLSBpbmRleCAoaWR4KSBhbmQgaXRlbSBmcm9tIGluZGV4ID8/PyAoc3ViYnJlZGRpdClcbi8vICAgICAgICAgJC5lYWNoKHN1YmJyZWRkaXRzLCBmdW5jdGlvbiAoaWR4LCBzdWJicmVkZGl0KSB7XG4vLyAgICAgICAgLy8gQWx0ZXJuYXRlIGFwcHJvYWNoIGNhbGxlZCB1bmRlcnNjb3JlXG4vLyAgICAgICAgLy9fLmVhY2goc3ViYnJlZGRpdHMsIGZ1bmN0aW9uKHN1YmJyZWRkaXQpIHtcbi8vICAgICAgICAgICAgLy8gQ291bGQgYWxzbyBzYXkgc3RyaW5nICs9IHN1YmJyZWRkaXRbJ25hbWUnXVxuLy8gICAgICAgICAgICBzdHJpbmcgKz0gc3ViYnJlZGRpdC5uYW1lO1xuLy8gICAgICAgICAgICBzdHJpbmcgKz0gXCIgXCI7XG4vLyAgICAgICAgfSk7XG4vLyAgICAgICAgJCgnI2NvbnRlbnQnKS50ZXh0KHN0cmluZyk7XG4vLyAgICB9XG4vL30pO1xuLy9cbi8vJC5hamF4KCcvYXBpL3Bvc3RzJywge1xuLy8gICAgdHlwZTogJ0dFVCcsXG4vLyAgICBzdWNjZXNzOiBmdW5jdGlvbihwb3N0cykge1xuLy9cbi8vICAgICAgICB2YXIgc3RyaW5nID0gXCJcIjtcbi8vICAgICAgICAkLmVhY2gocG9zdHMsIGZ1bmN0aW9uIChpZHgsIHBvc3QpIHtcbi8vXG4vLyAgICAgICAgICAgIHN0cmluZyArPSBwb3N0LnRpdGxlO1xuLy8gICAgICAgICAgICBzdHJpbmcgKz0gXCI8YnIgLz5cIjtcbi8vICAgICAgICB9KTtcbi8vICAgICAgICAvLyBOb3RlIHRoYXQgd2UgYXJlIHVzaW5nIC5odG1sIGluc3RlYWQgb2YgLnN0cmluZywgYmVjYXVzZSB3ZSBpbnNlcnRlZCBhIDxiciAvPiB0YWcgaW50byB0aGUgc3RyaW5nIGFib3ZlXG4vLyAgICAgICAgJCgnI2NvbnRlbnQnKS5odG1sKHN0cmluZyk7XG4vLyAgICB9XG4vL30pO1xuLy99KTsiLCJ2YXIgSG9tZVZpZXcgPSBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG4gICAgZWw6ICdcXFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XFxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aHJlZSBjb2x1bW5zXCI+PC9kaXY+XFxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2l4IGNvbHVtbnNcIj5cXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0d2VsdmUgY29sdW1uc1wiIGlkPVwicG9zdHNcIj48L2Rpdj5cXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0d2VsdmUgY29sdW1uc1wiPjwvZGl2PlxcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGhyZWUgY29sdW1uc1wiIGlkPVwiYWxsLXN1YmJyZWRkaXRzXCI+PC9kaXY+XFxcbiAgICAgICAgICAgIDwvZGl2PlxcXG4gICAgICAgIDwvZGl2PlxcXG4gICAgJyxcblxuICAgIC8vIFRoaXMgaXMgYSBoZWxwZXIgZnVuY3Rpb24gdG8gc3RvcCB0aGUgcmVuZGVyKCkgZnJvbSBnZXR0aW5nIHRvbyBiaWdcbiAgICBpbnNlcnRTdWJicmVkZGl0czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzdWJicmVkZGl0cyA9IG5ldyBTdWJicmVkZGl0c0NvbGxlY3Rpb24oKTtcbiAgICAgICAgc3ViYnJlZGRpdHMuZmV0Y2goKTtcbiAgICAgICAgdmFyIHN1YmJyZWRkaXRzTGlzdFZpZXcgPSBuZXcgU3ViYnJlZGRpdHNMaXN0Vmlldyh7IGNvbGxlY3Rpb246IHN1YmJyZWRkaXRzIH0pO1xuICAgICAgICAvLyBCZWNhdXNlIHRoZSBzdWJicmVkZGl0c0xpc3RWaWV3J3MgcmVuZGVyIGZ1bmN0aW9uIGhhcyAncmV0dXJuIHRoaXMnIGl0IHJldHVybnMgdGhlIGNvbnRleHQgb2YgdGhlIHJlbmRlciwgd2hpY2hcbiAgICAgICAgLy8gaXMgdGhlIHZpZXcsIHdoaWNoIGlzIHdoeSB3ZSBjYW4gc2F5ICdzdWJicmVkZGl0c0xpc3RWaWV3LnJlbmRlcigpLmVsJyBpbnN0ZWFkIG9mIHdoYXQgd2UgaGF2ZSBiZWxvdy4gV2UgY2FuXG4gICAgICAgIC8vIGFjY2VzcyB0aGUgcmV0dXJuZWQgdmFsdWUgb2YgJ3JlbmRlcigpJyAodGhlIHZpZXcpLCBhbmQgdGhlbiBnZXQgaXRzICdlbCdcbiAgICAgICAgLy8gQUxTTyBCZWNhdXNlIHRoZSBzdWJicmVkZGl0c0xpc3RWaWV3IGhhcyBhIGxpc3RlbmVyIGluIGl0cyBpbml0aWFsaXplIGZ1bmN0aW9uLCB3ZSBhcmUgZ3VhcmFudGVlaW5nIHRoYXQgZXZlbiBpZlxuICAgICAgICAvLyB0aGlzIHJlbmRlciBydW5zIGJlZm9yZSB0aGUgU3ViYnJlZGRpdHNMaXN0VmlldyBjbGFzcyBpcyBkZWZpbmVkLCB3aGVuIGl0IGlzIGRlZmluZWQgdGhpcyByZW5kZXIgd2lsbCByZS1ydW5cbiAgICAgICAgc3ViYnJlZGRpdHNMaXN0Vmlldy5yZW5kZXIoKTtcbiAgICAgICAgLy8gVGhpcyB1c2VzIHRoZSAnZmluZCcgZnVuY3Rpb24gdG8gc2VhcmNoIHRoaXMuZWwgZm9yICcjYWxsLXN1YmJyZWRkaXRzJyBhbmQgaW5zZXJ0cyB0aGUgJ3N1YmJyZWRkaXRzTGlzdFZpZXcuZWwnXG4gICAgICAgIHRoaXMuJGVsLmZpbmQoJyNhbGwtc3ViYnJlZGRpdHMnKS5odG1sKHN1YmJyZWRkaXRzTGlzdFZpZXcuZWwpO1xuICAgIH0sXG5cbiAgICAvLyBUaGlzIGlzIGEgaGVscGVyIGZ1bmN0aW9uIHRvIHN0b3AgdGhlIHJlbmRlcigpIGZyb20gZ2V0dGluZyB0b28gYmlnXG4gICAgaW5zZXJ0UG9zdHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcG9zdHMgPSBuZXcgUG9zdHNDb2xsZWN0aW9uKCk7XG4gICAgICAgIHBvc3RzLmZldGNoKCk7XG4gICAgICAgIHZhciBwb3N0c0xpc3RWaWV3ID0gbmV3IFBvc3RzTGlzdFZpZXcoe1xuICAgICAgICAgICAgY29sbGVjdGlvbjogcG9zdHNcbiAgICAgICAgfSk7XG4gICAgICAgIHBvc3RzTGlzdFZpZXcucmVuZGVyKCk7XG4gICAgICAgIHRoaXMuJGVsLmZpbmQoJyNwb3N0cycpLmh0bWwocG9zdHNMaXN0Vmlldy5yZW5kZXIoKS5lbCk7XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuaW5zZXJ0U3ViYnJlZGRpdHMoKTtcbiAgICAgICAgdGhpcy5pbnNlcnRQb3N0cygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBIb21lVmlldzsiXX0=
