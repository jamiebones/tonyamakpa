
CourseMaterial = new Mongo.Collection('course_materials');


CourseMaterial_Schema = new SimpleSchema({

	"courseCode" : {
		type : String,
		label : 'course code'
	},

	"level" : {
		type : String,
		label : 'course level',
		autoform:{
		  options:[
			      	{label: '100 Level', value: '100 Level'},
							{label: '200 Level', value: '200 Level'},
							{label: '300 Level', value: '300 Level'},
							{label: '400 Level', value: '400 Level'}
		    	]
     }
},

	"type" : {
		type : String,
		label : "Material type"
	},

  "duration" : {
    type : Object,
    label : "",
    optional : true
  },

  "duration.hours" : {
    type : Number,
    label : "hours",
    optional : true
  },

  "duration.mins" : {
    type : Number,
    label : "hours",
    optional : true
  },

  "duration.seconds" : {
    type : Number,
    label : "hours",
    optional : true
  },

  "documentPage" : {
    type : Number,
    label : "",
    optional : true
  },

  "materialLink" : {
    type : String,
    label : ""
  }
});

CourseMaterial.attachSchema(CourseMaterial_Schema);
//export {Courses}
