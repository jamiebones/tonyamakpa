import studentFileUpload from '../modules/handle-fileuploads';

Template.studentProject.onCreated(function(){
  //create a global variable that will store the id of the inserted project
   let template = Template.instance();
   template.uploader = new ReactiveVar();
   template.downloadUrl = new ReactiveVar();
   template.subscribe('getProjectDetails');
});


Template.studentProject.rendered = function () {

}

Template.studentProject.helpers({
  isUploading () {
    return  '<p>File is uploading : ' + '<span class="text-primary">' +
             Boolean(Template.instance().uploader.get()) + '</span></p>';
  },
  progress () {
    var upload = Template.instance().uploader.get();
    if (upload){
      return Math.round(upload.progress() * 100);
    }
  },
  getDownloadUrl () {
     return Template.instance().downloadUrl.get();
  }
});

Template.studentProject.events({
  'change #js-studenfFileUpload' : function(event , template){
      event.preventDefault();
      studentFileUpload(event , template , 'academicPapers' , 'divProgress');
  },

});
