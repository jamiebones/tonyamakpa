
uploadScript = RouteController.extend({
  template : 'uploadScript',
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
    let Id = this.params.query.bookId;
        return {termPaper : TermPaper.find({"_id" : Id}).fetch()}
      },
   waitOn : function () {
    let Id = this.params.query.bookId;
    return Meteor.subscribe('getTermOnePaperAssignment' , Id);
  }
});
