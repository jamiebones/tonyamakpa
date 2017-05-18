
 editHistory = RouteController.extend({
   template : 'historyDetails',
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
        let id = this.params.query.id;
        return {OneHistory : History_Today.find(id).fetch()};
      },

  waitOn : function () {
     let id = this.params.query.id;
     return Meteor.subscribe('showOneHistory' , id);
  }
 })
