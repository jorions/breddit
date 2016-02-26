'use strict';

// $. is the same as saying "jQuery."
$.ajax('/subbreddits', {
    type: 'GET',

    // Ajax always has a success function. Says that when there is a successful (200) response
    success: function(subbreddits) {
        var string = "";

        // This returns 2 items - index (idx) and item from index ??? (subbreddit)
        $.each(subbreddits, function (idx, subbreddit) {
        // Alternate approach called underscore
        //_.each(subbreddits, function(subbreddit) {
            // Could also say string += subbreddit['name']
            string += subbreddit.name;
            string += " ";
        });
        $('#content').text(string);
    }
})