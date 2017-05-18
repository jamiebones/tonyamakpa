
Media = new Mongo.Collection('media');

//if (Meteor.isServer){
	//Tripart_Property._ensureIndex({type : 1});
//}


Media_Schema = new SimpleSchema({
	"type" : {
		type : String,
		label : '',
	},

	"duration" : {
		type : Number,
		label : '',
	},

	"date_added" : {
		type : Date,
		label : ""
	},

	"author" : {
		type : String,
		label : '',
	},

	"downloadUrl" : {
		type : String,
		label : '',
	},
});


Media.attachSchema(Media_Schema);
