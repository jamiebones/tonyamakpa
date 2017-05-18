
viewCourseMaterials = RouteController.extend({
  waitOn : function () {
   return Meteor.subscribe('getCourseMaterials');
 },

 template : 'viewCourseMaterials',
 layoutTemplate : 'secureLayout',
  data : function () {
     return {courseMaterials : CourseMaterial.find({} ,
     {$sort : {"level" : 1 , "courseCode" : 1}}).fetch()}
  },
});
