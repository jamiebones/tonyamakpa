
import CheckExtension from '../../modules/check_Extension';
import FileUpload from '../../modules/handle-fileuploads';


let courseMaterialUrl = new ReactiveVar();


Template.courseMaterial.onCreated(function(){
  let template = Template.instance();
  template.selectedLevel = new ReactiveVar();
  template.uploader = new ReactiveVar();
  template.downloadUrl = new ReactiveVar();
  template.autorun(function () {
    template.subscribe('coursesByLevel' , template.selectedLevel.get());
  });

});

Template.courseMaterial.rendered = function(){



}


Template.courseMaterial.helpers({
  courses : ()=>{
    if (Template.instance().selectedLevel.get()){
      return Courses.find({"course_level" : Template.instance().selectedLevel.get()}).fetch();
    }
  },
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

Template.courseMaterial.events({
  "change #js-courseLevel": function(event, template){
     event.preventDefault();
     let value = $('#js-courseLevel').val();
     if (value !== "0"){
        template.selectedLevel.set(value);
     }

  },

  'change #js-materialType' : function (event , template) {
       event.preventDefault();
       let materialType = $('#js-materialType').val();
       let mediaDuration = $('.mediaDuration');
       let document = $('.document');
       let upload = $('.uploadMaterial');
       switch (materialType) {
         case "Audio":
            if (! document.hasClass('hide')){
               document.addClass('hide');
            }
            mediaDuration.removeClass('hide');
            upload.removeClass('hide');
            break;
         case "Video":
           if (!document.hasClass('hide')){
               document.addClass('hide');
           }
           mediaDuration.removeClass('hide');
           upload.removeClass('hide');
           break;
         case "Documents":
           //hhhhhhh
           if (!mediaDuration.hasClass('hide')){
                mediaDuration.addClass('hide');
           }
          document.removeClass('hide');
          upload.removeClass('hide');
           break;
         default:
            alert('Please select the material type that you want to upload');
            mediaDuration.addClass('hide');
            document.addClass('hide');
            upload.addClass('hide');
            return false;
       }
  },

  'click .js-SaveCourseMaterial' : function(event , template){
      event.preventDefault();
      let courseLevel = $('#js-courseLevel');
      let course = $('#js-course');
      let materialType = $('#js-materialType');
      let button = $('.js-SaveCourseMaterial');
      button.attr('disabled' , true);
      button.text('Saving ------------------------');
      let courseMaterial = {}

      if (courseLevel.val() !== "0"){
          courseMaterial.level = courseLevel.val();
      }
      if (course.val() !== "0"){
         courseMaterial.courseCode = course.val();
      }
      if (materialType.val() !== "0"){
          courseMaterial.type = materialType.val();
      }

      switch (materialType.val()) {
        case "Audio" || "Video":
            courseMaterial.duration = {}
            let hours = $('.js-hours');
            let mins = $('.js-mins');
            let seconds = $('.js-seconds');
            if (hours.val() !== ""){
               courseMaterial.duration.hours = parseInt(hours.val());
            }
            else{
              courseMaterial.duration.hours = parseInt("00");
            }

            if (mins.val() !== ""){
               courseMaterial.duration.mins = parseInt(mins.val());
            }
            else{
              courseMaterial.duration.mins = parseInt("00");
            }

            if (seconds.val() !== ""){
               courseMaterial.duration.seconds = parseInt(seconds.val());
            }
            else{
               courseMaterial.duration.seconds = parseInt("00");
            }
            $('.mediaDuration').toggleClass('hide');
          break;
        case "Documents" :
            let documentPage = $('.js-document');
            if (documentPage.val() !== ""){
               courseMaterial.documentPage = parseInt(documentPage.val());
            }
            else{
               return false;
            }
          $('.document').toggleClass('hide');
          break;
        default:
           alert('please select what kind of media you want to upload');
      }
      if (template.downloadUrl.get() === undefined){
        return alert('Please you need to upload the course material before saving')
      }

      courseMaterial.materialLink = template.downloadUrl.get();
      Meteor.call('saveCourseMaterial', courseMaterial , function(error , result){
        if (! error){
           sAlert.success('Course Material Saved!', {effect: 'genie',
           position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
           button.attr('disabled' , false);
           button.text('Save Course Material');
         }
         else{
           sAlert.error(error.reason , {effect: 'genie',
           position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
           button.text('Save Course material');
           button.attr("disabled" , false);
         }

      });
  },

  'change #js-uploadCourseMaterial' : function(event , template){
       event.preventDefault();
       let file = event.target.files[0].name;
       let fileCheck = CheckExtension(file);
       if (fileCheck == "document")
         {
           //use the document upload of slingshot to carry out the exercise
          FileUpload(event , template , 'uploadedCourseMaterialsDocument' , 'divProgress');
         }
       else if (fileCheck == "audio" || fileCheck == "video") {
          //use the video audio slingshot to do the upload
          FileUpload(event , template , 'uploadedCourseMaterialsAudioVideo' , 'divProgress');
       }
       else{
         //operation is not supported.
         sAlert.error("The file type is not suppported in this operation" , {effect: 'genie',
         position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
       }
  }
});
