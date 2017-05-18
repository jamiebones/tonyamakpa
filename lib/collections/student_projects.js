
StudentProject = new Mongo.Collection('studentproject');

StudentProject_Schema = new SimpleSchema({

	"studentName" : {
		type : String,
		label : 'Student Name'
	},

  "regNum" : {
		type : String,
		label : 'Registration Number'
	},

  "projectTopic" : {
		type : String,
		label : 'Project Topic'
	},

  "supervisor" : {
		type : String,
		label : 'Supervisor'
	},

  "projectLink" : {
		type : String,
		label : 'Upload Project',
    optional : true
	}
});

StudentProject.attachSchema(StudentProject_Schema);
