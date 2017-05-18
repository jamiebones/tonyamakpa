
let uploader = new ReactiveVar();
let eventId = new ReactiveVar();


Template.upcoming_events.onCreated(function(){

});

Template.upcoming_events.rendered = function() {
	let template = Template.instance();
	template. $( "#datepicker" ).datepicker({
						showOn: "button",
                        buttonImage: "/img/calendar.gif",
                        buttonImageOnly: true,
                        buttonText: "Select date"
	});

	template.$('#formUpcomingEvent').validate();

};



Template.upcoming_events.events({
	'submit #formUpcomingEvent' : function(event , template){
		event.preventDefault();
		let button = $('.js-addEvent');
		let eventName = $('.js-EventName').val();
		let event_Date = $('.js-EventDate').val();
		if (event_Date == ""){
			return false;
		}
		let eventDate = new Date(event_Date);
		let eventModal = $('#addEventPicture');
		button.attr('disabled' , true);
		button.text('Please Wait----------');
		let coming_event = {}
		coming_event.event_name = eventName;
		coming_event.event_date = eventDate;
		coming_event.card_link = "";


		Meteor.call('addUpcomingEvent', coming_event, function (error, id) {
			if (id){
				  eventId.set(id);
				  sAlert.success('Event Saved!', {effect: 'genie', 
                        position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '150px'});
				  button.attr('disabled' , false);
				  button.text('Add Event');
				  $('.js-EventName').val('');
				  $('.js-EventDate').val('');
				  //open the modal
				  eventModal.modal('show');
				  
                }
             else{
             	sAlert.error(error.reason , {effect: 'bouncyflip', 
                        position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '150px'});
             	  button.attr('disabled' , false);
				  button.text('Add Event');
             }
		});

	},


	'change #js-addEventCard' : function(event , template){
		
		event.preventDefault();
        	let eId = eventId.get();
        	if (eId){
	        	let file = event.target.files[0];
	        	let divP = $('#divProgress');
	        	if (divP.hasClass('hide')){
	        		divP.toggleClass('hide');
	        	}

				let upload = new Slingshot.Upload('eventImage');

			    upload.send(file, (error , downloadUrl) => {
				uploader.set();
				if (error){
					sAlert.error('Error uploading image' + '\n' + error);
			    	return false;
			    }

				else{
					
					let url = downloadUrl;
					Meteor.call('saveEventImageLink', eId , url, function (error, result) {
						if (! error){
						sAlert.success('Saved!' , {effect: 'genie', 
	                        position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '150px'});
	        	             divP.addClass('hide');
	        	             $('js-addEventCard').val('');
	        	             $('#addEventPicture').modal('hide');
						}

						else{
							sAlert.error(error.reason , {effect: 'bouncyflip', 
	                        position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '150px'});
	                        $('js-addEventCard').val('');
	                        divP.toggleClass('hide');
						}
						
					});
			
				}
				});
				uploader.set(upload);
        	}

	}

});



Template.upcoming_events.helpers({
	isUploading : function () {
		return  '<p>File is uploading : ' + '<span class="text-primary">' + Boolean(uploader.get()) + '</span></p>';
	},

	progress : function() {
		var upload = uploader.get();
		if (upload){
			return Math.round(upload.progress() * 100);
		}
	}
});
