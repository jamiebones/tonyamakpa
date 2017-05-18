

Template.viewStudentProject.onCreated(function(){
     let template = Template.instance();
     template.subscribe('getStudentProject');
});

Template.viewStudentProject.rendered = function(){

}

Template.viewStudentProject.helpers({
    projects (){
      let projects = StudentProject.find();
      if (projects){
        return projects;
      }
    }
});
