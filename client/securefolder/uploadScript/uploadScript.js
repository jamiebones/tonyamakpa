
 // counter starts at 0
  Session.setDefault('tonyUploadProgress', 0);
  Session.setDefault('tonyAmakpaPaperDetails', []);



Template.uploadScript.onCreated(function(){
	let template = Template.instance();
	template.subscribe('showAllTermPaper');
	template.subscribe('allUsers');
	template.selectedValue = new ReactiveVar();

});


Template.uploadScript.rendered = function () {
	// ...

};


Template.uploadScript.events({
	'change .js-selectAssignment': function (evt , tmp) {
		evt.preventDefault();
		let div = $('.paperDetails')
		let value = $('.js-selectAssignment').val();
		let title = $('.js-selectAssignment option:selected').text()
		if (value !== '0'){
			tmp.selectedValue.set(value);
			if (div.hasClass('hide')){
				div.removeClass('hide');
			}
			let bookId = value;
			let bookTitle = title.replace(/ /g , '_');
	     	Router.go('/admin_matters/upload_script?bookId=' + bookId + '&title=' + bookTitle);
		}
	},

	'change #js-uploadScript' : function(evt , template){
		evt.preventDefault();
		let files = $('#js-uploadScript').get(0).files;
		if (files.length > 0){
			let totalFiles = files.length;
			let bookId = Router.current().params.query.bookId;
			let title = Router.current().params.query.title;
			let bookTitle = title.replace(/_/g , ' ');
			let uploads = _.map(files , function(file){
				let uploader = new Slingshot.Upload('markedScript');
				let upload = uploader.send(file , function(error , downloadUrl){
					if (error){
					}
					else{
						//update the submit array of the student with the link
						let name = file.name;
						let nameArray = name.split("_");
						let userId = nameArray[1];
						Meteor.call('saveMarkedStudentPaperLink',bookId , userId , downloadUrl , function (error, result) {
							if (result){
								//send an email to the person that the script has been marked
								let user = Meteor.users.findOne(userId);
								let firstname = user.profile.firstname;
								let userEmail = user.emails[0].address;
								let emailObj = {}
								emailObj.to = userEmail;
								emailObj.from = "[Tony Amakpa] <noreply@flagstoneholdings.com>";
								emailObj.subject = "Attention " + firstname;
								emailObj.text = "Hello " + firstname + ", your assignment " + bookTitle + " has been marked. Please login and reviewed it.";
								emailObj.html = "<p>Hello " + firstname + ", your assignment " + bookTitle + " has been marked. Please login and reviewed it.</p>"
								Meteor.defer(function(){
            					Meteor.call('sendStudentEmail' , emailObj ,(error,result) =>{
							  	if (error){
							  		alert(error.reason);
							  		Meteor.setTimeout(()=>{
							  	 		Meteor.call('sendStudentEmail' , emailObj , (error) => {
							  				if (error){
							  				alert('I could not sent the email to admin i give up. sigh----- what a life');
							  			  }
							  		  });

							  	}, 3000);
							  }
					  		 	 });
            				});
						  }
						});

					}
				});
					return uploader;
			});
			//create upload tracker to interate over all the uploads
			let uploadTracker = Tracker.autorun(function (computation) {
				let paper_array = [];
				let overall_progress = 0;
				_.each(uploads , function(a_uploader){
					let prog = a_uploader.progress();
					if (!isNaN(prog)){
						prog =Math.round(prog*100);
					}
					else{
						prog=0;
					}
					let paperDetails = {
						//url : a_uploader.url(true),
						progress : prog
					}
					paper_array.push(paperDetails);
					overall_progress = overall_progress + prog;
				});
				overall_progress = overall_progress/totalFiles;

				 //Set our Session var array of image details
                  Session.set('tonyAmakpaPaperDetails', paper_array);

                  if (!isNaN(overall_progress)){
             		 Session.set('tonyUploadProgress', Math.round(overall_progress));
           			 }
           		 if(overall_progress==100){
           		 	    $('#js-uploadScript').val('');
                		computation.stop();
           		 }
           		 return;
			});
		}

	},

	'change #upload-btn': function (event , template) {
		let files = $('#upload-btn').get(0).files;
		if (files.length > 0){
			let totalFiles = files.length;
			let uploads = _.map(files , function(file){
				let uploader = new Slingshot.Upload('authorsImages');
				let upload = uploader.send(file , function(error , downloadUrl){
					if (error){
						alert('i can not upload this file ' + file.name);
					}
					else{
						alert('uploaded file ' + file.name + ' successfully');
					}
				});
				 return uploader;
			});
			//create upload tracker to interate over all the uploads
			let uploadTracker = Tracker.autorun(function (computation) {
				   let overall_progress = 0;
				_.each(uploads , function(a_uploader){
					let prog = a_uploader.progress();
					if (!isNaN(prog)){
						prog = Math.round(prog * 100);
					}
					else{
						prog = 0
					}
					overall_progress = overall_progress + prog;

				});
				 overall_progress = overall_progress/totalFiles;
				 if (!isNaN(overall_progress)){
				 	 template.uploadProgress.set(Math.round(overall_progress))
				 }

				 if (overall_progress == 100){
				 	computation.stop();
				 }
				 return
			});
		}

	}



});


Template.uploadScript.helpers({
	paper: function () {
		return this.termPaper;
	},

	showAssignment: function () {
		return TermPaper.find().fetch();
	},

});


  Template.progressBar.helpers({
    progress: function () {
      return Session.get('tonyUploadProgress');
    }
  });
