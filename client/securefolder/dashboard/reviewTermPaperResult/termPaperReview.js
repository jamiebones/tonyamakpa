
Template.termPaperReview.onCreated(function(){
	let template = Template.instance();
	template.subscribe('getTermPaperAssignment');
});

Template.termPaperReview.rendered = function(){

};

Template.termPaperReview.events({
	'click': function () {
		// ...
	}
});


Template.termPaperReview.helpers({
		assignmentDetails : function(){
		let arr = [];
		let termPaper = TermPaper.find().fetch();
	    termPaper.map(function(paper){
	    	let paperObj = {};
	    	paperObj.name = paper.paper_name;
			paperObj.createdDate = paper.date_created;
			paperObj.submitDate = paper.last_submission_date;

			_.each(paper.submiter , function(submiter , index){
				if (submiter.userId === Meteor.userId()){
					paperObj.owner = submiter;
				}
			});
		    	arr.push(paperObj);
		});
		return arr;
	},
});