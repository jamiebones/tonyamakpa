let uploader = new ReactiveVar();

Template.editAcademicPapers.onCreated(function(){

});


Template.editAcademicPapers.rendered = function () {
	// ...
};


Template.editAcademicPapers.events({
	'click .js-academicPapers' : function(event , template){
	
		event.preventDefault
		let id = event.currentTarget.dataset.id;
		let alink = $(event.currentTarget);
		let link = alink.closest('li');
		//link.toggleClass('active');
		
		if (id){
			Session.set('sessionAcademicPaperId', id);
			Router.go('/admin/paper_details?paperId=' + id)
		}
	},

});


Template.editAcademicPapers.helpers({
	getAcademicPaper : function () {
		return this.paper
	}
});





//view academic papers details events and helpers

Template.academicPapersDetails.onCreated(function(){
	//let template = Template.instance();
	//template.autorun( () =>{
	//	template.subscribe('showAcademicPaperDetails' , Session.get('sessionAcademicPaperId'))
	//})
});




Template.academicPapersDetails.helpers({
	getPaperDetails : function() {
		  return this.onePaper;
		
	},
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


Template.academicPapersDetails.events({
	'change .js-uploadAuthorPicture' : function(event , template){
		event.preventDefault();
		let name = event.currentTarget.dataset.name;
		let paperId = Router.current().params.query.paperId;
        	if (paperId){
	        	let file = event.target.files[0];
	        	let divStatus = $('.authorImageUpload');
	        	divStatus.toggleClass('hide');
				let upload = new Slingshot.Upload('authorsImages');

			    upload.send(file, (error , downloadUrl) => {
				if (error){
					sAlert.error('Error uploading image' + '\n' + error);
			    	return false;
			    }

				else{
					let imageUrl = downloadUrl;
					let imageObj = {};
					imageObj.name = name;
					imageObj._id = paperId;
					imageObj.imageUrl = imageUrl;
					Meteor.call('saveAuthorImageLink', imageObj, function (error, result) {
						if (! error){
						sAlert.success('Authors image uploaded sucessfully!' , {effect: 'genie', 
	                        position: 'bottom-right', timeout: 2000, onRouteClose: false, stack: false, offset: '150px'});
	        	             divStatus.toggleClass('hide');
	        	             $('.js-uploadAuthorPicture').val('');
						}

						else{
							sAlert.error(error.reason , {effect: 'bouncyflip', 
	                        position: 'bottom-right', timeout: 2000, onRouteClose: false, stack: false, offset: '150px'});
	                        $('.js-uploadAuthorPicture').val('');
	                         divStatus.toggleClass('hide');

						}
						
					});
			
				}
				});

        	}
        },

        'click .js-openAuthorModal' : function(event , template){
        	event.preventDefault();
        	let imageUrl = event.currentTarget.dataset.url;
        	let name = event.currentTarget.dataset.name;
        	let image = $('#js-picture');
        	let modal = $('#authorPictureModal');
        	let title = $('.modal-title');
        	if (imageUrl){
        		image.attr('src' , imageUrl);
        		modal.modal('show');
        		title.text(name);
        	}

        },

        'change #js-uploadAcademicPaper' : function(event , template){
        	event.preventDefault();
        	let paperId = Router.current().params.query.paperId;
        	if (paperId){
	        	let file = event.target.files[0];
	        	let divP = $('#divProgress');
	        	if (divP.hasClass('hide')){
	        		divP.toggleClass('hide');
	        	}

				let upload = new Slingshot.Upload('academicPapers');

			    upload.send(file, (error , downloadUrl) => {
				uploader.set();
				if (error){
					sAlert.error('Error uploading image' + '\n' + error);
			    	$('#js-uploadAcademicPaper').val('');
			    	divP.toggleClass('hide');
			    	return false;

			    }

				else{
					let imageUrl = downloadUrl;
					Meteor.call('savePaperLink', paperId , imageUrl, function (error, result) {
						if (! error){
						sAlert.success('Paper uploaded sucessfully!' , {effect: 'genie', 
	                        position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '150px'});
	        	             divU.addClass('hide');
	        	             divP.addClass('hide');
	        	             $('#js-uploadAcademicPaper').val('');
	        	             divP.toggleClass('hide');
						}

						else{
							sAlert.error(error.reason , {effect: 'bouncyflip', 
	                        position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '150px'});
	                        $('#js-uploadAcademicPaper').val('');
	                        divP.toggleClass('hide');
						}
						
					});
			
				}
				});
				uploader.set(upload);
        	}
        },

        'click .js-deletePaper' : function(event , template){
        	event.preventDefault();
        	let button = $('.js-deletePaper');
        	button.attr('disabled' , true);
        	button.text('Please Wait----------');

        	let paperUrl = event.currentTarget.dataset.url;
        	let paperId = Router.current().params.query.paperId;
        	Meteor.call('removeAcademicPaper', paperUrl, paperId , function (error, result) {
        		if (! error){
        			sAlert.success('Paper deleted!' , {effect: 'genie', 
	                  position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
        			  button.attr('disabled' , false);
        	          button.text('Delete Paper Upload');
        		}

        		else{
        			sAlert.error(error.reason , {effect: 'genie', 
	                  position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
        			  button.attr('disabled' , false);
        			  button.text('Delete Paper Upload');
        		}
        	});

        },

        'click #js-deletePicture' : function(event , template){
        	event.preventDefault();
        	let image = $('#js-picture');
        	let button = $('#js-deletePicture');
        	let modal = $('#authorPictureModal');
        	let title = $('.modal-title').text();
        	button.attr('disabled' , true);
        	button.text('Please Wait----------');
        	let url = image.attr('src');
        	let paperId = Router.current().params.query.paperId;
        	let name = event.currentTarget.dataset.name;
        	if (url && paperId && title){
        		Meteor.call('removeAuthorImage', url , paperId , name ,  function (error, result) {
        			if (! error){
        					sAlert.success('Picture deleted!' , {effect: 'genie', 
			                 position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
		        			 button.attr('disabled' , false);
		        	         button.text('Delete Picture');
		        	         modal.modal('hide');

        			}

        			else{
        			  sAlert.error(error.reason , {effect: 'genie', 
	                  position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
        			  button.attr('disabled' , false);
        			  button.text('Delete Picture');
        			}

        		});


        	}


        }

	});

        