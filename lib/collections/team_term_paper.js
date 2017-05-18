
TeamTermPaper = new Mongo.Collection("teamtermpaper");

TeamTermPaper_Schema = new SimpleSchema({
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

	"member.$.regnum" : {
		type : String,
		label : 'member regnum',
		optional : true
	},

	"member.$.teamLeader" : {
		type : Boolean,
		label : '',
		optional : true
	},

  "script_marked" : {
     type : String,
     label : '',
     optional : true
  },

	"score" : {
		type : Number,
		label : '',
		optional : true
	},

	"active" : {
		type : Boolean,
		label : 'Active',
		optional : true
	},

	"scriptSubmitted" : {
		type : Boolean,
		label : '',
		optional : true
	},

	"dateSubmitted" : {
		type : Date,
		label : '',
		optional : true
	},

	"paperUrl" : {
		type : String,
		label : '',
		optional : true
	},

	"markScript_Uploaded" : {
		type : Boolean,
		label : '',
		optional : true
	},
});

TeamTermPaper.attachSchema(TeamTermPaper_Schema);
