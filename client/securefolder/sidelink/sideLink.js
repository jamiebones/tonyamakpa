

Template.sideLink.onCreated(()=> {
   let template = Template.instance();
   template.subscribe('sideLink');
   template.subscribe("getFeedbackMsg");

})


Template.sideLink.helpers({
   currentChannel (name) {
      let current = Router.current().params.query.channel;
      if (current){
        return current === name || current === ('@'+ name)  ? 'active' : "hello"
      }
   },
   channels() {
      let channels = Channels.find();
      if (channels) {
        return channels
      }
   },

   users(){
     let users = Meteor.users.find({_id : {$not : Meteor.userId()}});
     if (users){
       return users;
     }
   },

   unReadFeedbackCount (){
      let count = MessageFeedback.find({"messageRead" : false}).count();
      return count
   },

   unreadMessages() {
     let users = Meteor.users.find({_id : {$not : Meteor.userId()}});
     if (users){
       let arrayMap = [];
       users.map( (user) => {
            let count = Messages.find({owner : user._id , to : Meteor.userId() , read : false}).count();
            let countObj = {}
            countObj.name = user.profile.firstname + " " + user.profile.surname;
            countObj.count = count;
            countObj.username = user.username;
            countObj.userId = user._id;
            arrayMap.push(countObj);

       });
       return arrayMap;
     }
   }
});


Template.sideLink.events({
   'click .js-count' (event , template){
       //event.preventDefault();
       let li = $(".js-count");
       let anchor = li.find('a');
       let owner = $(anchor).data('id');
       let receipent = Meteor.userId();
       if (owner){
          Meteor.call('updateReadMessages', owner , receipent , () => {});
       }


   }

});
