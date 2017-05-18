

manageUsersControllers = RouteController.extend({
  template : 'manageUsers',
  layoutTemplate : 'secureLayout',
  onBeforeAction : function () {
    var user = Meteor.user()
    if (! user) {
      //route.go('/signIn')
      this.render('accountLogin');
    }
    else{
      if (!Roles.userIsInRole(Meteor.user() , ['admin'])){
        this.render('notAuthorize');
        this.stop();
        return false;
      }
        this.next();


      //var currentRoute =  Router.current().route.getName();
    }
  },
});
