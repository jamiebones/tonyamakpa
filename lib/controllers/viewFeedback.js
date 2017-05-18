


viewFeedbackMessageController = RouteController.extend({
  template : 'viewFeedback',
  layoutTemplate : 'secureLayout',
  onBeforeAction : function () {
    let user = Meteor.user()
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
