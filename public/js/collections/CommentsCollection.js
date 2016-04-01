var CommentsCollection = Backbone.Collection.extend({
    url: '/api/comments/',
    model: CommentModel
});

module.exports = CommentsCollection;