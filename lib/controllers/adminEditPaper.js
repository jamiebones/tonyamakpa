
editPapersAdmin = RouteController.extend({
  template : 'editTermPaper',
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
    let Id = this.params.query.id;
        return {oneTermPaper : TermPaper.findOne({"_id" : Id})}
      },
   waitOn : function () {
    let Id = this.params.query.id;
    return Meteor.subscribe('getOneTermPaper' , Id);
  }
});
