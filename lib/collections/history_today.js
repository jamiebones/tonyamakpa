
History_Today = new Mongo.Collection('history_today');

//if (Meteor.isServer){
	//Tripart_Property._ensureIndex({type : 1});
//}




History_Today_Schema = new SimpleSchema({
	"date" : {
		type : String,
		label : '',
	},
	"extract" : {
		type : String,
		label : '',
		optional : true
	}
});


History_Today.attachSchema(History_Today_Schema);
