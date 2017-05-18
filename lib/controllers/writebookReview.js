

writeBookReviewController = RouteController.extend({
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
  waitOn : function () {
   let Id = this.params.query.bookId;
   return Meteor.subscribe('getOneBook' , Id);
 },

 template : 'writeBookReview',
 layoutTemplate : 'secureLayout',
  data : function () {
   let Id = this.params.query.bookId;
       return {oneBook : Book_Review.find({"_id" : Id}).fetch()}
     },
});
