
Template.markScript.onCreated(function(){
	let template = Template.instance();
	template.subscribe('getTermPaperAssignment');
	template.subscribe('allTeamTermPaper');
	template.subscribe('allUsers');
	template.subscribe('publication');
	template.selectedValue = new ReactiveVar();
	template.submitterObject = new ReactiveVar();
	template.paperId = new ReactiveVar();
	template.index = new ReactiveVar();
	template.autorun(function(){
		template.subscribe('getTermOnePaperAssignment' , template.selectedValue.get());

	});

});


Template.markScript.rendered = function () {
	// ...
};


Template.markScript.events({
	'change .js-selectAssignment': function (evt , tmp) {
		evt.preventDefault();
		let div = $('.details')
		let value = $('.js-selectAssignment').val();
		if (value !== '0'){
			tmp.selectedValue.set(value);
			if (div.hasClass('hide')){
				div.removeClass('hide');
			}
		}
	},

	'click .js-addPaperScore' : function(evt , template){
		evt.preventDefault();
		let modal = $('#scoreModal');
		modal.modal('show');
		//set the index here save in a template reactive varable
		let index = evt.currentTarget.dataset.num;
		template.index.set(index);
	},

	'click .js-savePaperScore' : function(evt , template){
		evt.preventDefault();
		let input = $('.js-studentScore');
		let score = input.val();
		let modal = $('#scoreModal');

		if (score !== "" && score !== undefined){
			//get the past submiter object
			let index = template.index.get();
			let submitterObject = template.submitterObject.get();
			let obj = submitterObject[index];
			let initialObj = _.omit(obj , "profile");
			let oldObj = _.omit(obj , "profile");
			let newObj = _.extend(initialObj , {"score" : parseInt(score) , sriptMarked : true});
			let paperId = template.selectedValue.get();
			let button = $('.js-savePaperScore');
			button.attr('disabled' , true);
	    	button.text('Please Wait------');

			Meteor.call('saveStudentScore', paperId , oldObj , newObj, function (error, result) {
						if (! error){
						sAlert.success('paper grade added!' , {effect: 'genie',
	                        position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '150px'});
	                        button.attr('disabled' , false);
				  		    button.text('Add Score');
				  		    input.val('');
				  		    modal.modal('hide');

						}

						else{
							sAlert.error(error.reason , {effect: 'bouncyflip',
	                        position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '150px'});
	                        button.attr('disabled' , false);
				  		    button.text('Add Score');
						}

					});
		}
	},
	'click .js-viewPaper' : function(event , template){
		   event.preventDefault();
			 let id = event.currentTarget.dataset.id;
       template.paperId.set(id);
       $('#viewTeamPaperModal').modal('show');
	},

	'click .js-scorePaper' : function(event , template){
		   event.preventDefault();
			 let id = event.currentTarget.dataset.id;
			 template.paperId.set(id);
			 $('#gradeTeamPaperModal').modal('show');
	},

	'click .js-saveTeamPaperScores' : function(event , template){
		   event.preventDefault();
			 let score = $(".js-teamScore").val().trim();
			 let paperId = template.paperId.get();
			 if (score != undefined && score != "" ) {
				  score = parseFloat(score);
				  Meteor.call('updateTeamPaperScore' , paperId , score , function(error , result){
						if (result){
							sAlert.success('Scores saved !' , {effect: 'genie',
							position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
							$('.js-teamScore').val('');
							$('#gradeTeamPaperModal').modal('hide');
						}
						else{
							sAlert.error(error.reason , {effect: 'genie',
							position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
						}
					})
			 }
	}

});

Template.markScript.helpers({
	scripts : function(){
		let arr = [];
		let termPaper = TermPaper.find({"_id" : Template.instance().selectedValue.get()}).fetch();
		termPaper.map(function(paper){
			_.each(paper.submiter , function(submiter , index){
				if (submiter.userId){
					let userId = submiter.userId;
					let user = Meteor.users.findOne(userId);
					let profile = {profile : user.profile}
					_.extend(submiter , profile);
					arr.push(submiter);
				}

			});
		});
	    Template.instance().submitterObject.set(arr);
		  return arr;
	},

	showAssignment: function () {
	  return TermPaper.find().fetch();
	},

	getAllTeamTermPapers(){
		  return TeamTermPaper.find({} , {sort : {"date_created" : -1}}).fetch()
	},
	getPaperDetails(){
		if (Template.instance().paperId.get()){
			let paper = TeamTermPaper.find({"_id":Template.instance().paperId.get()}).fetch();
			if (paper){
					return paper;
			 }
		}

  },
});
