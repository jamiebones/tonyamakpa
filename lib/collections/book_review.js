
Book_Review = new Mongo.Collection('book_review');

//if (Meteor.isServer){
	//Tripart_Property._ensureIndex({type : 1});
//}




Book_Review_Schema = new SimpleSchema({
	"book_title" : {
		type : String,
		label : 'book title',
	},

    "book_author" : {
		type : [String],
		label : 'book author',
	},

	"book_image" : {
		type : String,
		label : 'book image',
		optional : true
	},

	"reviewers.$.name" : {
		type : String,
		label : 'reviewer name',
		optional : true
	},

	"reviewers.$.userId" : {
		type : String,
		label : '',
		optional : true
	},

	"reviewers.$.date_reviewed" : {
		type : Date,
		label : 'Date reviewed',
		optional : true
	},

	"reviewers.$.review_comment" : {
		type : String,
		label : 'review comment',
		optional : true
	},

	"reviewers.$.rating" : {
		type : Number,
		label : 'review comment',
		optional : true
	},
});


Book_Review.attachSchema(Book_Review_Schema);
export {Book_Review}
