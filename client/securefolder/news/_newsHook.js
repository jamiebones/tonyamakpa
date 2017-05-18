

let newsHook = {
   before : {
     method : function(doc){
       return doc;
     }
   },

   onSubmit : function(insertDoc , updateDoc , currentDoc){
      Meteor.call('saveNews', insertDoc , function(error , result){
     });
  },
  onError : function(insert , error){
    sAlert.error(error, {effect: 'genie',
    position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
  },
  onSuccess : function(method , result){
     sAlert.success('Home page news created successfully!', {effect: 'genie',
     position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
  }
}


let newsUpdateHook = {
   before : {
     method : function(doc){
       return doc;
     }
   },
   onSubmit: function (insertDoc, updateDoc, currentDoc) {
      // console.log(AutoForm.debug())
       this.event.preventDefault();
       Meteor.call('updateNews', currentDoc._id, updateDoc);
     },

  onError : function(insert , error){
    sAlert.error(error, {effect: 'genie',
    position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
  },
  onSuccess : function(method , result){
     sAlert.success('Edited successfully!', {effect: 'genie',
     position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
  }
}




//updateNewsForm








AutoForm.hooks({
    newsInsertForm : newsHook,

});
AutoForm.hooks({
    updateNewsForm : newsUpdateHook,

});
