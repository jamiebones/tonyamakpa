
let hooksObject = {
   before : {
     method : function(doc){
        doc.sender = Meteor.userId();
        doc.messageDate = new Date();
        doc.messageRead = false;
        this.result(doc);
     }
   },
   onSubmit : function(insertDoc , updateDoc , currentDoc){
       Meteor.call('saveMessageFeedback', insertDoc , function(error , result){
      });
   },
   onError : function(insert , error){
     alert(error);
   },
   onSuccess : function(method , result){
      sAlert.success('Message sent successfully!', {effect: 'genie',
      position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
   }
};

AutoForm.hooks({
    feedbackForm : hooksObject
});
