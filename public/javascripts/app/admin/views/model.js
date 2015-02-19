Lvduit.Views.Model = Backbone.Marionette.ItemView.extend({
    events: {
        "click": "editionView"
    },

    modelEvents: {
        "change": "render",
        "remove": "remove"
    },

    className: "padding_medium border solid bottom_small pointer",

    template: function(model){
        if (app.state === "articles") {
            return app.templates.article(model);
        }

        if (app.state === "users") {
            return app.templates.user(model);
        }
    },

    editionView: function() {
        Backbone.history.navigate(app.state + '/' + this.model.get('_id'), {trigger: true});
    },

    onRender: function(){
        setTimeout(function() {
            $("abbr.timeago").timeago();
        }, 10);
    }
});