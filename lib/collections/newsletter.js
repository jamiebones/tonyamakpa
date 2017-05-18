
Newsletter = new Mongo.Collection('newsletter');

//if (Meteor.isServer){
	//Tripart_Property._ensureIndex({type : 1});
//}




Newsletter_Schema = new SimpleSchema({
	"title" : {
		type : String,
		label : 'newsletter title',
	},

	"author" : {
		type : String,
		label : 'author name',
		optional : true
	},

	"date" : {
		type : Date,
		label : 'date of newsletter',
		optional : true
	},
});


Newsletter.attachSchema(Newsletter_Schema);

export {Newsletter}
