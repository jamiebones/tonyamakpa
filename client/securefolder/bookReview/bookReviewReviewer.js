
Template.bookReviewReviewer.onCreated(function(){
	let template = Template.instance();
	template.subscribe('showBookReview');

});


Template.bookReviewReviewer.rendered = function(){
	let template = Template.instance();


}


Template.bookReviewReviewer.events({
	'click .js-writeReview': function (evt , template) {
		evt.preventDefault();
		let id = evt.currentTarget.dataset.id;

		if (id){
			let bookId = id;
			Router.go('/admin_matters/write_review_book?bookId=' + id);
		}
	}
});

Template.bookReviewReviewer.helpers({
	allBooks: function () {
		return Book_Review.find().fetch();
	}
});



//code for template when the individual writes its own book review
Template.writeBookReview.helpers({
	allBooks: function () {
		return Book_Review.find().fetch();
	},
	showBookReview : function(){
		let arr = [];
		let book = this.oneBook;
		book.map(function(review){
		 	_.each(review.reviewers , function(comment , index){
		 		if (comment.userId === Meteor.userId()){	
				arr.push(comment);
			  }
		 	}); 
		});
		//set the review object here so i can make use of it when i want to edit it
		Template.instance().personReview.set(arr);
	    return {book : book , review : arr};
	}
});


Template.writeBookReview.onCreated(function(){
	let template = Template.instance();
	template.bookId = new ReactiveVar();
	template.personReview = new ReactiveVar();
	template.subscribe('showBookReview');
});

Template.writeBookReview.rendered = function(){
	let template = Template.instance();
	 template.$('#summernoteReview').summernote();
	// template.$('#summernoteEditReview').summernote();
	//am trying to get the review left by a user if there's any 
	template.autorun(function(){
		//template.subscribe('getUserBookReview' , template.bookId.get());
		template.subscribe('showIndividualReview' , template.bookId.get())
	});
}


Template.writeBookReview.events({
	'change .js-selectBookReview': function (evt , template) {
		evt.preventDefault();
		let id = $('.js-selectBookReview').val();
		let title = $('.js-selectBookReview option:selected').text()

		if (id !== "0"){
			template.bookId.set(id);
			let bookTitle = title.replace(/ /g , '_');
			Router.go('/dashboard/write_review_book?title=' + bookTitle + '&bookId=' + id);
		}
	},

	'click .js-addPersonalReview' : function(evt , template) {
		evt.preventDefault();
		let id = Router.current().params.query.bookId;
		let button = $('.js-addPersonalReview');
		let review = $('#summernoteReview').summernote('code');
		let rating = $('#rating').data('userrating');
		let date = new Date();
		let reviewerName = Meteor.user().profile.firstname + " " +  Meteor.user().profile.surname;

		let reviewObj = {}


		if (review !== "" && rating !== ""){
			reviewObj.name = reviewerName,
			reviewObj.userId = Meteor.userId();
			reviewObj.date_reviewed = date;
			reviewObj.review_comment = review;
			reviewObj.rating = rating;
			button.attr('disabled' , true);
	    	button.text('Please Wait------');

	    	Meteor.call('savePersonReview', id ,reviewObj , function (error, result) {
	    		if (result){
	    			sAlert.success('Review Saved!', {effect: 'genie', 
                        position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
				  		button.attr('disabled' , false);
				  		button.text('Save Review');
				  		$('#summernoteReview').summernote('reset');
	    		}

	    		else{
	    			sAlert.error(error.reason , {effect: 'genie', 
                        position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
	    				button.attr('disabled' , false);
				  		button.text('Save Review');
        	 		}
	    		}
	    	);
		}
	},

	'click .js-editReview' : function(evt , template){
		evt.preventDefault();
		let editModal = $('#editReviewModal');
		editModal.modal('show');
		let review = template.personReview.get();
		if (review){
			let reviewComment = review[0].review_comment;
			template.$('#summernoteEditReview').summernote('code' , reviewComment);
		}
	},

	'click .js-saveEditedReview' : function(evt , template){
		evt.preventDefault();
		let reviewObj = template.personReview.get();
		let review = reviewObj[0];
		let newRating = $('#editRating').data('userrating');
		let newreviewComment = $('#summernoteEditReview').summernote('code');
		let button = $('.js-saveEditedReview');
		let bookId = Router.current().params.query.bookId;
		button.attr('disabled' , true);
		button.text('Please Wait---------');

		let newReview = {}
		newReview.name = review.name;
		newReview.userId = review.userId;
		newReview.date_reviewed = review.date_reviewed;
		newReview.review_comment = newreviewComment;
		if (newRating !== undefined ){
			newReview.rating = newRating;
		}
		else{
			newReview.rating = review.rating;
		}
		
		Meteor.call('saveEditedReview', bookId , review , newReview , function (error, result) {
			if (result){
				 sAlert.success('Review Edited!', {effect: 'genie', 
                 position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
				 button.attr('disabled' , false);
				 button.text('Save Changes');
				 template.$('#editReviewModal').modal('hide');     
			}
			else{
	    		 sAlert.error(error.reason , {effect: 'genie', 
                 position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
	    		 button.attr('disabled' , false);
				 button.text('Save Changes');
        	 }
		}); 
	},
	'click .js-deleteReview' : function(evt , template){
		evt.preventDefault();
		let title = Router.current().params.query.title;
		let bookTitle = title.replace(/_/g , " ");
		let reviewObj = template.personReview.get();
		let review = reviewObj[0];
		let button = $('.js-deleteReview');
		let bookId = Router.current().params.query.bookId;
		button.attr('disabled' , true);
		button.text('Please Wait---------');
		let pleaseConfirm = confirm('Are you sure you want to delete your review for ' + bookTitle);
		if (pleaseConfirm){
			Meteor.call('deleteReview', bookId, review , function (error, result) {
				if (result){
				 sAlert.success('Review Deleted!', {effect: 'genie', 
                 position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
				 button.attr('disabled' , false);
				 button.text('Delete Review');  
				 Router.go('/dashboard/write_review');
			}
			else{
	    		 sAlert.error(error.reason , {effect: 'genie', 
                 position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
	    		 button.attr('disabled' , false);
				 button.text('Delete Review');
        	 }

			});
		}

	}
});