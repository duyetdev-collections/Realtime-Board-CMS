Lvduit.Routers.ClientRouter = Backbone.Router.extend({
    routes: {
        "": "home",
        ":id": "articlePage",
        "category/:id": "category",
        "login": "login",
    },

    initialize: function() {

    },

    home: function() {
        app.state = "articles";

        this.articlesView = new Lvduit.Views.Articles({collection: app.articles});
        MyApp.articles.show(this.articlesView);

        this.sidebarView = new Lvduit.Views.Sidebar();
        MyApp.sidebar.show(this.sidebarView);

        document.title = app.config.blogName;
        $('meta[name=description]').attr('content', app.config.blogDescription);

        jQuery("abbr.timeago").timeago();
    },

    articlePage: function(id) {
        app.state = "articlePage";

        var article = app.articles.find(function(article) {
            return article.get('slug') === id;
        });

        article.set({views: article.get('views') + 1});
        article.save();

        this.articleView = new Lvduit.Views.Article({model: article});
        MyApp.articles.show(this.articleView);

        document.title = article.get("title");
        $('meta[name=description]').attr('content', article.get("description"));

        jQuery("abbr.timeago").timeago();
    },

    category: function(id) {
        app.state = "articles";

        var byCategory = app.articles.where({category: id});

        app.articlesByCategory = new Lvduit.Collections.Articles();

        for (var article in byCategory) {
            app.model = byCategory[article];

            app.articlesByCategory.add(app.model);
        }

        this.articlesView = new Lvduit.Views.Articles({collection: app.articlesByCategory});
        MyApp.articles.show(this.articlesView);

        document.title = app.config.blogName;
        $('meta[name=description]').attr('content', app.config.blogDescription);

        jQuery("abbr.timeago").timeago();
    }
});