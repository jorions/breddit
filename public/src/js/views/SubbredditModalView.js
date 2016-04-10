var Backbone = require('backbone');
var _ = require('underscore');
var SubbredditModel = require('../models/SubbredditModel.js');

var SubbredditModalView = Backbone.View.extend({
    el: '<div></div>',
    
    template: _.template('\
        <form>\
            <input type="text" name="name">\
            <textarea name="description"></textarea>\
            <input type="submit" value="Submit">\
        </form>\
        <a class="close-reveal-modal" aria-label="Close">&#215;</a>\
    '),

    events: {
        // Create a new subbreddit via form submission
        'submit form': function(event) {
            event.preventDefault();

            // Create a frontend SubbredditModel and populate it with the values (.val()) from the form
            var subbreddit = new SubbredditModel({
                name: $(event.target).find('[name="name"]').val(),
                description: $(event.target).find('[name="description"]').val()
            });

            // Saves the new model to the backend. Because we aren't using a model with an id, then the save() is a POST
            // request to the backend, instead of a PUT (which would make it an update to a current subbreddit)
            subbreddit.save();

            // Updates the collection to contain the new subbreddit so that we can see the newly added subbreddit immediately
            this.collection.add(subbreddit);
        }

    },

    render: function() {
        this.$el.html(this.template());
        return this;
    }
});

module.exports = SubbredditModalView;
