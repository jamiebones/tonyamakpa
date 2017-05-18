

Template.multipleUpload.onCreated(function(){
	let template = Template.instance();
	template.uploadProgress = new ReactiveVar(0);

});


Template.multipleUpload.events({
	'change #upload-btn': function (event , template) {
		let files = $('#upload-btn').get(0).files;
		if (files.length > 0){
			let totalFiles = files.length;
			let uploads = _.map(files , function(file){
				let uploader = new Slingshot.Upload('authorsImages');
				let upload = uploader.send(file , function(error , downloadUrl){
					if (error){
						alert('i can not upload this file ' + file.name);
					}
					else{
						alert('uploaded file ' + file.name + ' successfully');
					}
				});
				 return uploader;
			});
			//create upload tracker to interate over all the uploads
			let uploadTracker = Tracker.autorun(function (computation) {
				   let overall_progress = 0;
				_.each(uploads , function(a_uploader){
					let prog = a_uploader.progress();
					if (!isNaN(prog)){
						prog = Math.round(prog * 100);
					}
					else{
						prog = 0
					}
					overall_progress = overall_progress + prog;

				});
				 overall_progress = overall_progress/totalFiles;
				 if (!isNaN(overall_progress)){
				 	 template.uploadProgress.set(Math.round(overall_progress))
				 }

				 if (overall_progress == 100){
				 	computation.stop();
				 }
				 return 
			});
		}

	}
});


Template.multipleUpload.helpers({
	progress: function () {
      return Template.instance().uploadProgress.get();
    },

    testing : function(){
    debugger;
    var numbers = [60, 60, 60, 56, 56, 45, 33, 12, 10],
    object = {},
    i = 0; j = 0,
    keys = ['first', 'second', 'third'],
    last = numbers[0];

	while (i < keys.length) {
		debugger
    while (j < numbers.length && numbers[j] === last) {
    	debugger;
        object[keys[i]] = object[keys[i]] || [];
        object[keys[i]].push(numbers[j]);
        j++;
    }
    last = numbers[j];
    i++;
}
    }
});