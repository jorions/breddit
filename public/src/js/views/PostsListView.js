var Backbone = require('backbone');
var _ = require('underscore');

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