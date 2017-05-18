

TermPaper = new Mongo.Collection('termpaper');

//if (Meteor.isServer){
	//Tripart_Property._ensureIndex({type : 1});
//}




TermPaper_Schema = new SimpleSchema({
	"paper_name" : {
		type : String,
		label : 'paper name',
	},

	"date_created" : {
		type : Date,
		label : 'date created',
		optional : true
	},

	"instructions" : {
		type : String,
		label : "Term paper instructions",
		optional : true
	},

	"last_submission_date" : {
		type : Date,
		label : 'last date to submit',
		optional : true
	},

	"submiter.$.userId" : {
		type : String,
		label : 'user id',
		optional : true
	},

	"submiter.$.submittedLink" : {
		type : String,
		label : '',
		optional : true
	},

	"submiter.$.date_submitted" : {
		type : Date,
		label : 'Date Submitted',
		optional : true
	},

	"submiter.$.sriptMarked" : {
		type : Boolean,
		label : '',
		optional : true
	},

	"submiter.$.submited" : {
		type : Boolean,
		label : '',
		optional : true
	},


	"submiter.$.markedScriptLink" : {
		type : String,
		label : '',
		optional : true
	},

	"submiter.$.score" : {
		type : Number,
		label : '',
		optional : true
	},

	"active" : {
		type : Boolean,
		label : 'Active',
		optional : true
	},
});


TermPaper.attachSchema(TermPaper_Schema);
//export {TermPaper}

//collection hooks

TermPaper.before.insert(function(user , doc){
	  doc.date_created = new Date();
});
