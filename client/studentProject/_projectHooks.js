


let projectHook = {
   before : {
     method : function(doc){
       let downloadUrl = this.formAttributes.downloadUrl
       doc.projectLink = downloadUrl;
       return doc;
     }
   },

   onSubmit : function(insertDoc , updateDoc , currentDoc){
      Meteor.call('saveStudentProject', insertDoc , function(error , result){
     });
  },
  onError : function(insert , error){
    sAlert.error(error, {effect: 'genie',
    position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
  },
  onSuccess : function(method , result){
     sAlert.success('Project saved successfully!', {effect: 'genie',
     position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
  }
}


AutoForm.hooks({
    StudentProjectForm : projectHook
});
