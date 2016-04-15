var Backbone = require('backbone');

// This is an individual model that is based on the urlRoot you provide
// So when you instantiate a PostModel, the different methods you can use in the console such as fetch etc are tied to
// particular types of request (ex: fetch() = GET). Backbone is made to integrate well with RESTful APIs
// This model does not contain any of the properties of a post right now, it is just a shell. It gets the properties once we
// fetch data
var PostModel = Backbone.Model.extend({
    urlRoot: '/api/posts',
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