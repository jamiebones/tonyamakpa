

let uploader = new ReactiveVar();
let bookVarId = new ReactiveVar();

Template.bookReview.rendered = function(){
	let template = Template.instance();
	template.$('#formBookReview').validate();
}



Template.bookReview.events({
	'change #js-uploadBookCover' : function(event , template){
		        event.preventDefault();
	        	let file = event.target.files[0];
	        	let div = $('.divProgress');
	        	let img = $('#js-bookImagePreview');
	        	let divForm = $('.js-bookDetails');
	        	let divInput = $('.divInput');
	        	div.toggleClass('hide');
				let upload = new Slingshot.Upload('uploadBookImage');

			    upload.send(file, (error , downloadUrl) => {
			    uploader.set();
				if (error){
					sAlert.error('Error uploading image' + '\n' + error);
			    	divInput.toggleClass('hide');
			    	div.toggleClass('hide');
			    	$('#js-uploadBookCover').val('');
			    	return false;
			    }

				else{
					img.attr('src' , downloadUrl);
					divForm.toggleClass('hide');
					divInput.addClass('hide');
					div.toggleClass('hide');
					$('#js-uploadBookCover').val('');

				 }
		    });
		    uploader.set(upload);
        },

        'submit form#formBookReview' : function(evt , template){
        	evt.preventDefault();
        	let title = $('.js-bookTitle'),
        	     author = $('.js-bookAuthor'),
        	     button = $('.js-saveBookDetails'),
        	     img = $('#js-bookImagePreview'),
        	     divForm = $('.js-bookDetails'),
	        	 divInput = $('.divInput'),
	        	 authorArray = [];

	        	 //get the values for the author textboxes

	        	 author.each(function(){
	        	 	let input = $(this);
	        	 	if (input.val() !== ''){
	        	 		authorArray.push(input.val());
	        	 	}
	        	 })


        	 button.attr('disabled' , true);
        	 button.text('Please Wait-------');

        	let book = {};
        	book.book_title = title.val();
        	book.book_author = authorArray;
        	book.book_image = img.attr('src');

        	 Meteor.call('saveBookForReview', book, function (error, result) {
        	 		if (! error){
        	 			sAlert.success('Saved!', {effect: 'genie', 
                        position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
				  		button.attr('disabled' , false);
				  		button.text('Add Academic Paper');
				  		title.val('');
				  		author.val('');
				  		img.attr('src' , '');
				  		divForm.toggleClass('hide');
				  		divInput.toggleClass('hide');
				  		$('.divAddInput').empty();
        	 		}

        	 		else{
        	 			sAlert.error(error.reason , {effect: 'genie', 
                        position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
        	 		}
        	 });
        },

        'click .js-addNewAuthor' : function(evt , template){
        	evt.preventDefault();
        	let divContainer = $('.divAddInput');
        	let div = $('<div/>' , {
        					class : "input-group"
        	});

        	let input = $('<input/>' , {
        		     type : "text",
        		     class : "form-control js-bookAuthor required"
        	});

        	let span = $('<span />',{
        		      class:"input-group-addon js-removeAuthorInput",
        		      text : "-"
        	});

        	
        	div.append(input);
        	span.insertAfter(input);
        	divContainer.append(div);
        },

        'click .js-removeAuthorInput' : function(evt , template){
        	evt.preventDefault();
        	debugger;
        	let button = $('.js-removeAuthorInput');
        	let inputDiv = $(event.target.parentNode);
        	inputDiv.remove();
        }
});



Template.bookReview.helpers({
	isUploading : function () {
		return  '<p>File is uploading : ' + '<span class="text-success">' + Boolean(uploader.get()) + '</span></p>';
	},

	progress : function() {
		var upload = uploader.get();
		if (upload){
			return Math.round(upload.progress() * 100);
		}
	}
});