
Meteor.publish('getOneTermPaper' , function(id) {
	return TermPaper.find(id);
});


Meteor.publish('showAllTermPaper' , function() {
	return TermPaper.find();
});


Meteor.publish('showAllAcademicPapers' , function(){
	return Academic_Paper.find();
});


Meteor.publish('showAcademicPaperDetails' , function(id) {
	return Academic_Paper.find(id);
});


Meteor.publish('showUpcomingEvents' , function() {
		return School_Events.find();
});

Meteor.publish('getTermPaperAssignment' , function() {
   	return TermPaper.find({"active" : true});
});

Meteor.publish('getTermOnePaperAssignment' , function(id){
	return TermPaper.find({"_id" : id});
});

Meteor.publish('showBookReview' , function() {
	return Book_Review.find();
});

Meteor.publish('getOneBook' , function(id) {
	return Book_Review.find(id);
});

Meteor.publish('showIndividualReview' , function(bookId) {
	return Book_Review.find({"_id" : bookId});
});

Meteor.publish('showIfAssignmentSubmitted' , function(paperId) {
	return TermPaper.find({"_id" : paperId});
});

Meteor.publish("allUsers", function () {
  return Meteor.users.find({});
});

Meteor.publish("showHistory", function () {
   return History_Today.find({} , {sort : {"date" : -1}});
});

Meteor.publish("showOneHistory", function (id) {
   return History_Today.find(id);
});

Meteor.publish("showTodayHistory", function (id) {
   let todayDate = Module.both.todayDate()
   return History_Today.find({"date" : todayDate});
});

Meteor.publish(null , function (){
  return Meteor.roles.find({})
});

Meteor.publish("coursesByLevel" , function(level){
	return Courses.find({"course_level" : level});
});

Meteor.publish('getCourseMaterials', function () {
  	return CourseMaterial.find({} ,
   {$sort : {"level" : 1 , "courseCode" : 1}});
});

Meteor.publish("homepageNews" , function(){
	return News.find({"active" : true});
});

Meteor.publish("newsEdit" , function(){
	return News.find();
});

Meteor.publish("getSingleNews" , function(newsID){
	return News.find(newsID);
});

Meteor.publish("getProjectDetails" , function(projectId){
	  return StudentProject.find(projectId);
});

Meteor.publish("getStudentProject" , function(){
	  return StudentProject.find();
});

Meteor.publish('getFeedbackMsg' , function(){
	  return MessageFeedback.find();
});

Meteor.publish('getOnlyStudents' , function(){
	 return Meteor.users.find("regnum" : {"$exists" : true});
});

Meteor.publish('allTeamTermPaper' , function(){
	 return TeamTermPaper.find({} , {sort:{"date_created" : -1}});
});

Meteor.publish('getTeamTermPaper' , function(){
	let userId = this.userId;
	let user = Meteor.users.findOne({_id: userId});
	if (user){
		const regnum = user.regnum;
		return TeamTermPaper.find({"member.regnum" : {$in : [regnum]}})
	}

})
