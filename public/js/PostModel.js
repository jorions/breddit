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

module.exports = PostModel;