
Template.addCourse.onCreated(function(){

});

Template.addCourse.rendered = function(){
  let template = Template.instance()
  template.$('#addCourse').validate();
}

Template.addCourse.helpers({

});

Template.addCourse.events({
  "submit form#addCourse": function(event, template){
     event.preventDefault();
     let level = $('#courseLevel').val();
     let courseCode = $('.js-courseCode').val();
     let courseTitle = $('.js-courseTitle').val();
     let button = $('.js-addCourse');
     button.attr('disabled' , false);
     button.text('Adding Course Please Wait------------');

     if (level === "0"){
       alert('Please select the course level');
       return false;
     }

     let course = {}
     course.course_title = courseTitle;
     course.course_level = level;
     course.course_code = courseCode;


     Meteor.call('saveCourseCode', course , function(error , result) {
         if (result)
               {
                 sAlert.success('Saved!', {effect: 'genie',
                               position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '150px'});
                 button.attr('disabled' , false);
                 button.text('Add Course');
                 $('#courseLevel').val('');
                 $('.js-courseCode').val('');
                 $('.js-courseTitle').val('');
                  }
               else{
                 sAlert.error(error.reason , {effect: 'bouncyflip',
                          position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '150px'});
                   button.attr('disabled' , false);
                   button.text('Add Course');
               }

     });



  }
});
