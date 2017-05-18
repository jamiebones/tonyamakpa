

Template.viewFeedback.onCreated(function(){
  let template = Template.instance();
  template.subscribe("getFeedbackMsg");
  template.subscribe("allUsers");
});

Template.viewFeedback.rendered = function (){

}

Template.viewFeedback.helpers({
    readMessages () {
      let readMsg = MessageFeedback.find({"messageRead" : true},{$sort:{"messageDate" : 1}});
      if (readMsg){
        return readMsg;
      }
    },
    unReadMessages () {
      let unread = MessageFeedback.find({"messageRead" : false} , {$sort:{"messageDate" : 1}});
      if (unread) {
        return unread;
      }
    },
    unReadCount (){
       let count = MessageFeedback.find({"messageRead" : false}).count();
       return count
    },
});

Template.viewFeedback.events({
  'click .js-makeMsgRead' : function(event , template){
     event.preventDefault();
     debugger;
     let msgId = event.currentTarget.dataset.id
     if (msgId) {
        Meteor.call("makeMessageRead" , msgId ,()=> {})
     }
  }
})
