$(document).onReady(function(){
  var postModel = Backbone.Model.extend({});
  var postCollection = Backbone.Collection.extend({
    model : postModel,
    url : 'https://graph.facebook.com/1235460097/feed?access_token=200851080004221|3vypsZGfzxdjv2FZsS4aETCbdWU',
    parse : function(response){

      var dateArr  = []
        , blogArr  = []
        , monthArr = ['Jan.','Feb.','Mar.','Apr.','May.','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.']
        ;

      _.each(response.data,function(post){
        var blogObj = {};
        var fbDate  = post.created_time.replace(/-/g,"/").replace(/[TZ]/g," ");
        dateArr.push(fbDate);
        blogObj['date'] = monthArr[fbDate.substring(5,7) - 1] + ' ' + fbDate.substring(8,10) + ', ' + fbDate.substring(0,4);
        blogObj['message'] = post.story;
        blogObj['name'] = post.id.substring(0,15);
        blogArr.push(blogObj);
      });

      for(var x = 0; x < blogArr.length; x++){
        if(blogArr[x].message == undefined){
          blogArr.splice(x,1);
        }
      }

      this.add(blogArr);
      new fb_posts_view({model : this}).render();
      return response;
    }
  });
  var fb_posts_view = Backbone.View.extend({
    el : 'tabs',
    tagName: 'div',
    initialize : function(){
      this.fb_blog_temp = doT.template( $('templateBlog').html(), undefined);
    },
    render : function(){
      var that = this;
      var tabs = new Tabs('tabs');
      _.each(this.model.models, function(fbPosts){
        tabs.add(fbPosts.attributes.name,that.fb_blog_temp(fbPosts.attributes));
      });
      return this;
    }
  });

  function activateTabs(){
    new Tabs('tabs');
  };
  new postCollection().fetch({jsonp : true});
});