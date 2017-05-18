

News= new Mongo.Collection('news');

//if (Meteor.isServer){
	//Tripart_Property._ensureIndex({type : 1});
//}




News_Schema = new SimpleSchema({
	"news" : {
		type : String,
		label : 'news',
		max: 1000
	},

	"date" : {
		type : Date,
		label : 'date news added',
		optional : true
	},

	"active" : {
		type : Boolean,
		label : 'active',
		optional : true
	},
});


News.attachSchema(News_Schema);
