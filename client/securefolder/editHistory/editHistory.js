


Template.editHistory.onCreated(function(){
	let template = Template.instance();
	template.subscribe('showHistory');
	template.selectedValue = new ReactiveVar();

	
	//Tracker.autorun( () =>{
		//Meteor.subscribe('showOneHistory' , Session.get('tonyAmakpasessionSelValue'))
	//});


});


Template.editHistory.rendered = function(){
    let template = Template.instance();
	template.$('#summernoteHistory').summernote();

}

Template.editHistory.helpers({
	History : function(){
		return this.History;
	},
});

Template.editHistory.events({
	'change .js-showHistoryDate' : function(evt , template){
		evt.preventDefault();
		let dropdown = $('.js-showHistoryDate');
		let value = dropdown.val();
		if (value !== "0"){
			//Session.set('tonyAmakpasessionSelValue', value);
			Router.go('/admin_matters/edit_history?id=' + value);
		}
	}
	

});


Template.historyDetails.events({
	'click .js-goBackHistory' : function(evt , template){
		evt.preventDefault();
		let div = $('.history');
		div.empty();
		Router.go('/admin_matters/view_history');
	},

	'click .js-saveEDitHistory' : function(evt , template){
		evt.preventDefault();
		let history = $('#summernoteEditHistory').summernote('code');
		let id = Router.current().params.query.id
		let button = $('.js-saveEDitHistory');
		button.attr('disabled' , true);
		button.text('Saving Please Wait--------');
		Meteor.call('editHistory', id, history , function (error, result) {
			if (! error){
        	 			sAlert.success('History Edited!', {effect: 'genie', 
                        position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
				  		button.attr('disabled' , false);
				  		button.text('Save History Edit');
				  		//$('#summernoteEditHistory').summernote('reset');
        	 		}

        	 		else{
        	 			sAlert.error(error.reason , {effect: 'genie', 
                        position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
                        button.attr('disabled' , false);
				  		button.text('Save History');
        	 		}
		});
	}

});

Template.historyDetails.helpers({
	//getHistory : function(){
	//   console.log(this.History);
	 //  return this.History;
	//}
});


Template.historyDetails.rendered=function(){
	 let template = Template.instance();
	 let extract = this.data.OneHistory;
	 if (extract){
	 	let history = extract[0].extract;
	 	template.$('#summernoteEditHistory').summernote('code' , history);
	 };
	 
}