var SubbredditsCollection = Backbone.Collection.extend({
    url: '/api/subbreddits/',
    model: SubbredditModel
});

module.exports = SubbredditsCollection;