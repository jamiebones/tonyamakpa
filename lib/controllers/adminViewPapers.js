

adminViewAcademicPapers = RouteController.extend({
  template : 'editAcademicPapers',
  layoutTemplate : 'secureLayout',
  onBeforeAction : function () {
    var user = Meteor.user()
    if (! user) {
      //route.go('/signIn')
      this.render('accountLogin')
    }
    else{
      this.next();
      //var currentRoute =  Router.current().route.getName();
    }
  },
  data : function () {
        return {paper : Academic_Paper.find().fetch()};
   },
  waitOn : function () {
     return Meteor.subscribe('showAllAcademicPapers');
  }
});
