


editNewsController = RouteController.extend({
  template : 'editSingleNews',
  layoutTemplate : 'secureLayout',
  onBeforeAction : function () {
    var user = Meteor.user()
    if (! user) {
      //route.go('/signIn')
      this.render('accountLogin');
    }
    else{
      this.next();
      //var currentRoute =  Router.current().route.getName();
    }
  },

  data : function(){
    let newsID = this.params._id;
    return News.findOne(newsID);
  },

  waitOn : function(){
     let newsID = this.params._id;
     return Meteor.subscribe('getSingleNews' , newsID);
  }
});
