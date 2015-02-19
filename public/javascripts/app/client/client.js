MyApp = new Backbone.Marionette.Application();

MyApp.addRegions({
    articles: "#articles",
    sidebar: "#sidebar"
});

MyApp.on("initialize:before", function(){

});

MyApp.on("initialize:after", function(){
    app.clientRouter = new Lvduit.Routers.ClientRouter();

    Backbone.history.start({
        root : app.config.url.blog,
        pushState : true,
        silent : false
    });
});

var getTemplates = function(templates) {
    var dTemplates = Q.defer();

    var deferreds = [];

    $.each(templates, function(index, view) {
        deferreds.push($.get('/templates/client/' + view + '.html', function(data) {
            app.templates[view] = _.template(data);
        }, 'html'));
    });

    $.when.apply(null, deferreds).done(function() {
        dTemplates.resolve();
    });

    return dTemplates.promise;
};

var getConfig = function() {
    var dConfig = Q.defer();

    var xhr = $.get('/postit/config');

    xhr.done(function(data) {
        app.config = data;
        dConfig.resolve();
    });

    return dConfig.promise;
};

var getCollections = function() {
    var dCollections = Q.defer();

    app.articles = new Lvduit.Collections.Articles();

    var xhr = $.get(app.config.api.articlesPublished);

    xhr.done(function(data) {
        data.forEach(function(article) {
            app.articles.add(article);
        });
        dCollections.resolve();
    });

    return dCollections.promise;
};

$(function() {
    var templates = ['article', 'articlePage', 'sidebar', 'login'];

    getTemplates(templates)
        .then(function() {
            return getConfig();
        })
        .then(function() {
            return getCollections();
        })
        .then(function() {
            MyApp.start();
        });

    // Sockets events

    socket.on('articles::create', function(data) {
        // data.postDate = jQuery.timeago(data.postDate);

        if (data.state === "Publish") {
            app.articles.add(data);
        }
    });

    socket.on('articles::update', function(data) {
        // data.postDate = jQuery.timeago(data.postDate);

        var item = app.articles.find(function(item){
            return item.get('_id') === data._id;
        });

        if(!item){
            app.articles.add(data, {at: app.articles.length - 2});
            return;
        }

        if (data.state === "Draft") {
            app.articles.remove(item);
            return;
        }

        item.set(data);
    });

    socket.on('articles::remove', function(data) {
        app.articles.fetch();
    });
});

var socket = io.connect();