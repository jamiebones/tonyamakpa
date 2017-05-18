




Template.dashBoard.events({
	'click .js-resendLink': function (evt , tpl) {
		 let button = $(".js-resendLink");
		 button.attr('disabled' , true);
		 button.text('Sending a verification email to you. Please wait--------------');
		 Meteor.defer(function(){
			Meteor.call('sendEmailVerificationLink', function (error, result) {
				if (! error) {
					let email = Meteor.user().emails[0].address;
					button.attr('disabled' , false);
					button.text('Please Try again.Resend Verification Link');
					sAlert.success('Verification email sent to ' + email, {effect: 'genie',
										position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
				}

				else{
					sAlert.error(error.reason, {effect: 'genie',
										position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
										button.attr('disabled' , false);
							 		  button.text('Resend Verification Link');
				}

			});
		})


		// ..
	}
});
