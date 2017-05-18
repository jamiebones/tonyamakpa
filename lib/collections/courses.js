
Courses = new Mongo.Collection('courses');


Courses_Schema = new SimpleSchema({

	"course_title" : {
		type : String,
		label : 'course title'
	},

	"course_level" : {
		type : String,
		label : 'course level',
		autoform:{
		  options:[
			      	{label: '100 Level', value: '100 Levelt'},
							{label: '200 Level', value: '200 Level'},
							{label: '300 Level', value: '300 Level'},
							{label: '400 Level', value: '400 Level'}
		    	]
     }
},

	"course_code" : {
		type : String,
		label : "course code",
		optional : true
	}
});

Courses.attachSchema(Courses_Schema);
//export {Courses}
