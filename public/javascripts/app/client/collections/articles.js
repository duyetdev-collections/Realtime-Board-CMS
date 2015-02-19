Lvduit.Collections.Articles = Backbone.Collection.extend({
    url: function() {
        return this.url;
    },

    model: Lvduit.Models.Article,

    name: "articles",

    initialize: function() {
        this.url = app.config.api.articles;
    }
});