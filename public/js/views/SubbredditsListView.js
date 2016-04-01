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