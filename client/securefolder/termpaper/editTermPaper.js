
Template.editTermPaper.onCreated(function(){
	let template = Template.instance();
	template.termPaperId = new ReactiveVar();
    template.subscribe('showAllTermPaper');
	
});

Template.editTermPaper.rendered = function(){
	let template = Template.instance();
	let chk = template.$('.js-checked');
	
	
	let date = this.data.oneTermPaper.last_submission_date
    let convertDate = moment(date).format('MM/DD/YYYY')
	template.$('#txtLastDate').val(convertDate);
	template. $( "#txtLastDate" ).datepicker({
						showOn: "button",
                        buttonImage: "/img/calendar.gif",
                        buttonImageOnly: true,
                        buttonText: "Select date"
	});
}




Template.editTermPaper.events({
      
        'change #js-termPaper' : function(event , template){
        	event.preventDefault();
        	let value = $('#js-termPaper').val();
        	if (value !== '0'){
        		template.termPaperId.set(value);
        			Router.go('/admin/edit_term_paper?id=' + value);
        	}

        },

       
     'change .js-checked' : function(event , template){
     	event.preventDefault();
     	let checkbox = $('.js-checked');
     	let id = event.currentTarget.dataset.id;
     	let status;
     	if ((checkbox).is(':checked')){
     		status = true
     	}
     	else{
     		status = false
     	}
     	Meteor.call('updateTermPaperStatus', id, status, function (error, result) {
    			if (! error){
    				sAlert.success('Status changed!', {effect: 'bouncyflip', 
    					position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '90px'});
    			}
    		});
     },

     'change #txtLastDate' : function(event , template){
     	event.preventDefault();
     	let date = $('#txtLastDate').val();
     	let id = this._id;
     	Meteor.call('updateTermPaperSubmitDate', id, date ,  function (error, result) {
     		if (! error){
    				sAlert.success('Submission date updated!', {effect: 'bouncyflip', 
    					position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '90px'});
    			}
     	});
     }

});



Template.editTermPaper.helpers({
	termPaper: function () {
		return TermPaper.find({});
	},

   oneTermPaper : function(){
   	  return this.oneTermPaper;
   }
	
});