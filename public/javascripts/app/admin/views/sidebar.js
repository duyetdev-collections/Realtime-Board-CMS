Lvduit.Views.Sidebar = Backbone.Marionette.CompositeView.extend({
    events: {
        "click [data-link='articles']": "showArticles",
        "click [data-link='users']": "showUsers",
        "click [data-link='newArticle']": "newArticle"
    },

    itemView: Lvduit.Views.Model,

    itemViewContainer: "#list",

    template: function(){
        return app.templates.sidebar();
    },

    showArticles: function() {
        app.state = "articles";

        this.collection = app.articles;
        this.collection.on('add', this.render);
        this.render();
    },

    showUsers: function() {
        app.state = "users";

        this.collection = app.users;
        this.collection.on('add', this.render);
        this.render();
    },

    newArticle: function() {
        Backbone.history.navigate('articles/new', {trigger: true});
    },

    onRender: function(){
        $("[data-link='newArticle']").attr("class", "bck b_jet text center color c_white padding_medium pointer anchor");
        $("[data-link='newArticle']").html('Add article +');
    }
});