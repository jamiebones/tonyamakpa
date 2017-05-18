


newsEditController = RouteController.extend({
  template : 'editNews',
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
});
