

Template.addTermPaper.onCreated(function(){

});

Template.addTermPaper.rendered = function() {
	let template = Template.instance();
	template. $( "#datepicker" ).datepicker({
						showOn: "button",
                        buttonImage: "/img/calendar.gif",
                        buttonImageOnly: true,
                        buttonText: "Select date"
	});

	template.$('#formAddTermPaper').validate();

};



Template.addTermPaper.events({
	'submit form#formAddTermPaper': function (event , template) {
		event.preventDefault();
		let button = $('.js-addTermPaper');
		let papername = $('.js-paperName').val();
		let instructions = $('.js-instructions').val()
		let submission_Date = $('.js-submitDate').val();
		let submitDate = new Date(submission_Date);
		button.attr('disabled' , true);
		button.text('Please Wait----------');

		let termpaper = {}
		termpaper.active = true;
		termpaper.paper_name = papername;
		termpaper.last_submission_date = submitDate;
		if (instructions !== ""){
			  termpaper.instructions = instructions;
		}

	//	termpaper.date_created = new Date();
		Meteor.call('addTermPaper', termpaper, function (error, result) {
			if (result)
			    {
							  sAlert.success('Saved!', {effect: 'genie',
			                        position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '150px'});
							  button.attr('disabled' , false);
							  button.text('Add Term Paper');
							  $('.js-paperName').val('');
							  $('.js-submitDate').val('');
								$('.js-instructions').val('');
                }
             else{
             	sAlert.error(error.reason , {effect: 'bouncyflip',
                      position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '150px'});
             	  button.attr('disabled' , false);
				  button.text('Add Term Paper');
             }
		});
	}
});
