

let channelHook = {
   before : {
     method : function(doc){
       return doc;
     }
   },

   onSubmit : function(insertDoc , updateDoc , currentDoc){
      Meteor.call('insertChannel', insertDoc , function(error , result){
     });
  },
  onError : function(insert , error){
    sAlert.error(error, {effect: 'genie',
    position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
  },
  onSuccess : function(method , result){
     sAlert.success('Channel created successfully!', {effect: 'genie',
     position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
  }
}


AutoForm.hooks({
    insertChatChannel : channelHook
});
