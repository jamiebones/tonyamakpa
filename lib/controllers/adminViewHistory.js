
viewHistory = RouteController.extend({
  template : 'editHistory',
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
 data : function () {
       return {History : History_Today.find().fetch()};
     },

 waitOn : function () {
    return Meteor.subscribe('showHistory');
 }
});
