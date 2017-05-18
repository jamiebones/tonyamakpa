

let uploader = new ReactiveVar();
let paperVarId = new ReactiveVar();
let timeInterval;


Template.submittedPaper.onCreated(function(){
	let template = Template.instance();
	template.subscribe('getTermPaperAssignment');
	template.selectedValue = new ReactiveVar();
	template.autorun(function(){
		template.subscribe('getTermOnePaperAssignment' , template.selectedValue.get());
	});
});



Template.submittedPaper.rendered = function () {
	// ...
};

Template.submittedPaper.events({
	'change .js-selectAssignment': function (evt , tmp) {
		evt.preventDefault();
		debugger;
		let div = $('.divPaperDetails')
		let value = $('.js-selectAssignment').val();
		if (value !== '0'){
			  debugger;
				clearInterval(timeInterval);
		  	tmp.selectedValue.set(value);
         let termPaper = TermPaper.find({"_id" : value}).fetch();
				 let submitDate = termPaper[0].last_submission_date;
				 Session.set("termPaperId" , value);
				 timeInterval = setInterval(function() {
						Meteor.call("getCurrentTime" , function(error , result) {
							Session.set("time" , result);
							let timeLapse = getTimeRemaining(submitDate);
							Session.set("timeLapse" , timeLapse);
						})

				 } , 1000);

			//console.log(submitDate);







			if (div.hasClass('hide')){
				div.removeClass('hide');

			}
		}
	},

	'change .js-submitAssignment' : function(evt , template){
		evt.preventDefault();
		let file = event.target.files[0];
	    let divU = $('#divUpload');
	    if (divU.hasClass('hide')){
	         divU.toggleClass('hide');
	    }
	    let upload = new Slingshot.Upload('submitted_papers');
		  upload.send(file, (error , downloadUrl) => {
				uploader.set();
				if (error){
					sAlert.error('Error uploading image' + '\n' + error);
					$('.js-submitAssignment').val('');
			    	return false;
			    }

				else{
					let submited = {};
					submited.userId = Meteor.userId();
					submited.submittedLink = downloadUrl;
					submited.date_submitted = new Date();
					submited.sriptMarked = false;
					submited.submitted = true;
					let paperId = this._id;
					Meteor.call('saveStudentAssignment', paperId , submited, function (error, result) {
						if (! error){
						sAlert.success('Assignment Submitted sucessfully!' , {effect: 'genie',
	                        position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '150px'});
	        	             divU.addClass('hide');
	        	             $('.js-submitAssignment').val('');
						}

						else{
							sAlert.error(error.reason , {effect: 'bouncyflip',
	                        position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '150px'});
	                        $('.js-submitAssignment').val('');
	                        divU.toggleClass('hide');
						}

					});
				  }
				});
				uploader.set(upload);

	}
});

Template.submittedPaper.helpers({
	showAssignment: function () {
		return TermPaper.find().fetch();
	},

	assignmentDetails : function(){
		let arr = []
		let termPaper = TermPaper.find({"_id" : Template.instance().selectedValue.get()}).fetch();
	    termPaper.map(function(submit){
			_.each(submit.submiter , function(submiter , index){
				if (submiter.userId === Meteor.userId()){
					arr.push(submiter);
					//return submiter;
				}
			});
		});
		return {paper : termPaper , submitDetails : arr}
	},

	isUploading : function () {
		return  '<p>File is uploading : ' + '<span class="text-primary">' + Boolean(uploader.get()) + '</span></p>';
	},

	progress : function() {
		var upload = uploader.get();
		if (upload){
			return Math.round(upload.progress() * 100);
		}
	},

	timeEnded : function(){
		return Session.get("timeLapse").total <= 0;
	}


});

function getTimeRemaining (endtime){
	    let t = Date.parse(endtime) - Session.get('time');
			let seconds = ("0" + Math.floor((t/1000) % 60)).slice(-2);
			let minutes = ("0" + Math.floor((t/1000/60) % 60)).slice(-2);
			let hours =   ("0" + Math.floor((t/(1000 * 60 * 60)) % 24)).slice(-2);
			let days = Math.floor(t/(1000*60*60*24));

			if (t <= 0){
				//if timer has counted to zero here i'm going to make the paper inactive
				//by updating the termpaper collection
				let termPaperId = Session.get("termPaperId");
				Meteor.call('updateTermPaperStatus' , termPaperId , false , function(err , result){
					//	if (result){
						//	alert(result);
					//	}
				});
				clearInterval(timeInterval);
			}

			return {
				'total' : t,
				'days'  : days,
				'hours' : hours,
				'minutes': minutes,
				'seconds' : seconds
			}
}
