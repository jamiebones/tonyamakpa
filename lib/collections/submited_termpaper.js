
Submited_TermPaper = new Mongo.Collection('submited_termpaper');

//if (Meteor.isServer){
	//Tripart_Property._ensureIndex({type : 1});
//}




Submited_TermPaper_Schema = new SimpleSchema({
	"userId" : {
		type : String,
		label : 'user id',
	},

	"paper.$.name" : {
		type : String,
		label : 'paper name',
		optional : true
	},

	"paper.$.date_submited" : {
		type : Date,
		label : 'date submitted',
		optional : true
	},

	"paper.$.paper_id" : {
		type : String,
		label : 'paper id submitted',
		optional : true
	},

	"paper.$.course_title" : {
		type : String,
		label : 'course title',
		optional : true
	},


});


Submited_TermPaper.attachSchema(Submited_TermPaper_Schema);
