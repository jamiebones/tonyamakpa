
let uploader = new ReactiveVar();
let paperVarId = new ReactiveVar();


Template.addAcademicPapers.onCreated(function(){
	let template = Template.instance();

	
});


Template.addAcademicPapers.rendered = function () {	
	let template = Template.instance();
 	template.$('#summernotePaperAbstract').summernote();
};


Template.addAcademicPapers.events({
	'click .js-addAuthorName' : function (event , template){
		event.preventDefault();
        let title = $('.js-selectTitle').val();
        let name = $('.js-authorName').val();

        if (title !== '0' || name !== ''){
        	let div = $('.divAuthorName');
        	let button = $('<button/>' , {
        					text :  "X",
        					class : "js-removeAuthor btn-default"
        	});

        	let text = title.toUpperCase() + ' ' +  name.toUpperCase();
        	let para = $('<p>' +  text + ' ' + '</p>');
        	para.append(button);
        	div.append(para);
        	$('.js-authorName').val('');
        	$('.js-selectTitle option:eq(0)').prop('selected', true);
        	 if (div.hasClass('hide')){
                div.toggleClass('hide');
            }
        }
	},

	'click .js-removeAuthor' : function(event , template){
		event.preventDefault();
		let pcount = $('.divAuthorName p').length

		let p = $(event.target.parentNode);
		p.remove();
		if (pcount - 1 == 0){
			$('.divAuthorName').addClass('hide');
		}

	},

	'click .js-addTermPaper' : function(event , template){
		event.preventDefault();
		let button = $('.js-addTermPaper');
		let papername = $('.js-academicPaperName');
		let abstract =  $('#summernotePaperAbstract').summernote('code');
		let authors = [];

		$('.divAuthorName p').each(function(){
			var para = $(this)
			var str = para.context.innerText;
			str = str.slice(0 , -1).trim();
			let splitString = str.split(' ');
			let obj = {}
			obj.title = splitString[0];
        	obj.name = returnName(splitString);
        	obj.imageUrl =  "";
			authors.push(obj);
		});


		if (authors.length !== 0 || papername.val() !== "" || abstract !== ""){
			//all system good u can proceed
			let paperTitle = $('#js-paperTitle');
			paperTitle.text('You can upload the paper ' + papername.val() + ' to the server.');
			button.attr('disabled' , true);
			button.text('Please Wait----------');
			let paperObj =  {};
			paperObj.name = papername.val();
			paperObj.author = authors;
			paperObj.abstract = abstract;
			paperObj.downloadUrl = "";

			//save me in the database
			Meteor.call('saveAcademicPaper', paperObj , function (error, result) {
				if (result){
				  sAlert.success('Saved!', {effect: 'genie', 
                        position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '90px'});
				  button.attr('disabled' , false);
				  button.text('Add Academic Paper');
				  $('.js-paperName').val('');
				  authorNameArray = [];
				  papername.val('');
			      paperVarId.set(result);
			      $('.divAuthorName').empty();
			      $('#summernotePaperAbstract').summernote('reset');
			      $('.js-selectTitle option:eq(0)').prop('selected', true);
			      $('.paperUpload').toggleClass('hide');
			      $('.paperDetails').toggleClass('hide');
                }
             else{
             	sAlert.error(error.reason , {effect: 'bouncyflip', 
                        position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '90px'});
             	  button.attr('disabled' , false);
				  button.text('Add Academic Paper');
             }
			});

		}


 
	},

	'change #filePaper' : function(event , template){
        	event.preventDefault();
        	let paperId = paperVarId .get();
        	if (paperId){
	        	let file = event.target.files[0];
	        	let divP = $('#divProgress');
	        	let divU = $('#divUpload');
	        	if (divP.hasClass('hide')){
	        		divP.toggleClass('hide');
	        	}

				let upload = new Slingshot.Upload('academicPapers');

			    upload.send(file, (error , downloadUrl) => {
				uploader.set();
				if (error){
					sAlert.error('Error uploading image' + '\n' + error);
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
	        	             $('.paperDetails').toggleClass('hide');
						}

						else{
							sAlert.error(error.reason , {effect: 'bouncyflip', 
	                        position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '150px'});
	                        $('filePaper').val('')
	                        divU.toggleClass('hide');
	                        divP.toggleClass('hide');
	                        $('.paperDetails').toggleClass('hide');

						}
						
					});
			
				}
				});
				uploader.set(upload);
        	}
        },


});


        	


Template.addAcademicPapers.helpers({
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



function returnName(array){
	let string;
	_.each(array , function(val , ind){
		if (ind !== 0 || val == ""){
			string += " " + val;
		}
	});

	let regEx = /undefined/gi;
	let newString = string.replace(regEx , " ");
	return newString.trim();
}

