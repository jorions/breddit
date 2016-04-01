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