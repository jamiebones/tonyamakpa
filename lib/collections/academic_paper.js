
Academic_Paper = new Mongo.Collection('academic_paper');

//if (Meteor.isServer){
	//Tripart_Property._ensureIndex({type : 1});
//}




Academic_Paper_Schema = new SimpleSchema({
	"name" : {
		type : String,
		label : '',
	},

	"author.$.name" : {
		type : String,
		label : 'author name',
		optional : true
	},

	"author.$.title" : {
		type : String,
		label : 'author title',
		optional : true
	},

	"author.$.imageUrl" : {
		type : String,
		label : 'image url of author',
		optional : true
	},

	"abstract" : {
		type : String,
		label : 'abstract',
		optional : true
	},

	"downloadUrl" : {
		type : String,
		label : 'download url',
		optional : true
	},
});


Academic_Paper.attachSchema(Academic_Paper_Schema);
