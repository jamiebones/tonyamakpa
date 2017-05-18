
School_Events = new Mongo.Collection('school_events');

//if (Meteor.isServer){
	//Tripart_Property._ensureIndex({type : 1});
//}




School_Events_Schema = new SimpleSchema({
	"event_name" : {
		type : String,
		label : 'event name',
	},

	"event_date" : {
		type : Date,
		label : 'event date',
	},

    "card_link" : {
    	type : String,
    	label : 'event card',
    	optional : true
    },

	"pictures.$.imageUrl" : {
		type : String,
		label : 'event picture',
		optional : true
	},

	"pictures.$.title" : {
		type : Date,
		label : 'picture title',
		optional : true
	},
});


School_Events.attachSchema(School_Events_Schema);
