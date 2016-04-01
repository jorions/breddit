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