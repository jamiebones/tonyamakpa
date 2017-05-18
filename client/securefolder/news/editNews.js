

Template.editNews.onCreated(function(){
    let template = Template.instance();
    template.subscribe('newsEdit');
});

Template.editNews.helpers({
   showNews : function(){
     return News.find({} , {sort : {"date" : 1}}).fetch()
   }
});

Template.editNews.events({
  "click .js-editNews": function(event, template){
    debugger;
    //let m = Router.current().route.path()


      //event.preventDefault();
      //let newID = this._id;
      //Router.go('/admin_matters/edit_single_news')

  }
});
