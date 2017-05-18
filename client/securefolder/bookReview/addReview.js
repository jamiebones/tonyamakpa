
Template.addReview.rendered = function(){
	let template = Template.instance();
    template.$('#summernoteReview').summernote();
}




Template.addReview.onCreated(function(){

});


Template.addReview.events({
  'click .js-saveReview' : function(evt , template){
  	 evt.preventDefault();
  	 let id = Router.current().params.query.bookId;

  	 let button = $('.js-saveReview');
  	 let name = $('.js-reviewerName').val();
  	 let date = new Date();
  	 let rating = $('#rating').data('userrating');
  	 let review = $('#summernoteReview').summernote('code');

  	 button.attr('disabled' , true);
	 button.text('Please Wait------');

  	 let reviewerObj = {}
  	 reviewerObj.name = name;
  	 reviewerObj.date_reviewed = date;
  	 reviewerObj.review_comment = review;
  	 reviewerObj.rating = rating;

  	 Meteor.call('updateBookReview', id, reviewerObj , function (error, result) {
  	 			if (! error){
        	 			sAlert.success('Saved!', {effect: 'genie',
                        position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
				  		button.attr('disabled' , false);
				  		button.text('Save Review');
        	 		}

        	 		else{
        	 			sAlert.error(error.reason , {effect: 'genie',
                        position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
        	 		}
  	 });
  }





});


Template.addReview.helpers({
	getBook: function () {
		return this.oneBook;


	},

	indexGetBook : function(){
		return _.map(this.oneBook , function(book , index) {
			return _.extend(book , {index , index});
		})

	},

	field : function(){
		return 'reviewers.' + this.index + '.review_comment' ;
	},


});


//Template.ticker_table.helpers({
  //indexedTickers: function () {
  //  return _.map(this.tickers, function (ticker, index) {
   //   return _.extend(ticker, {index, index});
   // });
  //},
  // Context for the following is inside the each, so a single ticker object
 // field: function () {
 //   return 'tickers.' + this.index + '.shares';
 // }
//});
