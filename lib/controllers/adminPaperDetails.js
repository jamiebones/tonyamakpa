

adminPaperDetails = RouteController.extend({
  template : 'academicPapersDetails',
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
      let paperId = this.params.query.paperId;
        return {onePaper : Academic_Paper.findOne(paperId)}
      },
  waitOn : function () {
     let paperId = this.params.query.paperId;
     return Meteor.subscribe('showAcademicPaperDetails' , paperId);
  }
});
