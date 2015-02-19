Lvduit.Views.Articles = Backbone.Marionette.CollectionView.extend({
    itemView: Lvduit.Views.Article,

    appendHtml: function(collectionView, itemView, index){
        collectionView.$el.prepend(itemView.el);
    },

    onRender: function(){
        $("abbr.timeago").timeago();
    }
});