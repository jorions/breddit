var Backbone = require('backbone');
var _ = require('underscore');

var SubbredditsListView = require('./SubbredditsListView.js');
var SubbredditsCollection = require('../collections/SubbredditsCollection.js');
var PostsListView = require('./PostsListView.js');
var PostsCollection = require('../collections/PostsCollection.js');
var UserModel = require('../models/UserModel.js');

var HomeView = Backbone.View.extend({
    el: '\
        <div class="container">\
            <div class="row">\
                <div class="small-7 columns">\
                    <div class="row">\
                        <div class="small-12 columns" id="posts"></div>\
                    </div>\
                    <div class="row">\
                        <div class="small-12 columns"></div>\
                    </div>\
                </div>\
                <div class="small-5 columns">\
                    <ul class="tabs" data-tab>\
                        <li class="tab-title active"><a href="#all-subbreddits">All</a></li>\
                        <li class="tab-title"><a href="#subscribed-subbreddits">Subscribed</a></li>\
                    </ul>\
                    <div class="tabs-content">\
                        <div class="content active" id="all-subbreddits"></div>\
                        <div class="content" id="subscribed-subbreddits"></div>\
                    </div>\
                </div>\
            </div>\
        </div>\
    ',

    // This is a helper function to stop the render() from getting too big
    insertAllSubbreddits: function() {
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

    insertSubscribedSubbreddits: function() {

        var that = this;

        var currentUser = new UserModel({ id:1 });

        currentUser.fetch({
            success: function() {
                var subbredditsListView = new SubbredditsListView({
                    collection: currentUser.get('subscribed_subbreddits')
                });
                that.$el.find('#subscribed-subbreddits').html(subbredditsListView.render().el);
            }
        });

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
        this.insertAllSubbreddits()
        this.insertSubscribedSubbreddits();
        this.insertPosts();
        $(document).foundation('reflow', 'tabs');
        return this;
    }
});

module.exports = HomeView;