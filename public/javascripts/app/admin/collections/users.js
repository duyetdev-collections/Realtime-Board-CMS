Lvduit.Collections.Users = Backbone.Collection.extend({
    url: function() {
        return this.url;
    },

    model: Lvduit.Models.User,

    name: "users",

    initialize: function() {
        this.url = app.config.api.users;
    }
});