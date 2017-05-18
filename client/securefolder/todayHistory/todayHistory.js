


Template.todayHistory.rendered = function(){
    let template = Template.instance();
	template.$('#summernoteHistory').summernote();

}

Template.todayHistory.helpers({
	
});

Template.todayHistory.events({
	'click #js-submitHistory' : function(evt , template){
		evt.preventDefault();
		 let history = $('#summernoteHistory').summernote('code');
		 let date = Module.both.todayDate();
		 let button = $('#js-submitHistory');
		 button.attr('disabled' , true);
		 button.text('Saving Please Wait--------');

		 Meteor.call('saveHistory', history , date , function (error, result) {
  	 			if (! error){
        	 			sAlert.success('History Saved!', {effect: 'genie', 
                        position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
				  		button.attr('disabled' , false);
				  		button.text('Save History');
				  		$('#summernoteHistory').summernote('reset');
        	 		}

        	 		else{
        	 			sAlert.error(error.reason , {effect: 'genie', 
                        position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
                        button.attr('disabled' , false);
				  		button.text('Save History');
        	 		}
  	 });

	}

})