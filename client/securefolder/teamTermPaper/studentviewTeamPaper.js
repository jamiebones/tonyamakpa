

import studentFileUpload from '../../modules/handle-fileuploads';

Template.studentViewTeamPaper.onCreated(function(){
  let template = Template.instance();
  template.subscribe('getTeamTermPaper');
  template.subscribe('allUsers');
  template.paperId = new ReactiveVar();
  template.uploader = new ReactiveVar();
  template.downloadUrl = new ReactiveVar();
  template.paperDetails = new ReactiveVar();
  template.newFilename = new ReactiveVar();
//  template.subscribe('getTeamTermPaper');

})

Template.studentViewTeamPaper.helpers({
  getPaperDetails(){
     let paper = TeamTermPaper.find({"_id":Template.instance().paperId.get()}).fetch();
     if (paper){
         Template.instance().paperDetails.set(paper);
         return paper;
      }
  },
  lastDate(){
      let papers = TeamTermPaper.find({}).fetch();
      return papers;
  },
  isUploading () {
    return  '<p>File is uploading : ' + '<span class="text-primary">' +
             Boolean(Template.instance().uploader.get()) + '</span></p>';
  },
  progress () {
    var upload = Template.instance().uploader.get();
    if (upload){
      return Math.round(upload.progress() * 100);
    }
  },
  getDownloadUrl () {
     return Template.instance().downloadUrl.get();
  }
});

Template.studentViewTeamPaper.events({
  'click .js-viewDetails' : function( event , template){
       event.preventDefault();
       let id = event.currentTarget.dataset.id;
       template.paperId.set(id);
       $('#paperModal').modal('show');
  },
  'change .js-submitTeamPaper' : function(event , template){
       event.preventDefault();
       let paper = template.paperDetails.get();
       let newFilename;
       let metacontext = {}
       newFilename = paper[0].paper_name + "_"
      _.map(paper[0].member , (member)=>{
        newFilename +=  "_" + member.regnum + "_"
      });
      newFilename += paper[0]._id;
      let filename = event.target.value;
      let fileArray = filename.split(".");
      let ext = fileArray[fileArray.length - 1];
      newFilename += "." + ext;
      metacontext.newFilename = newFilename;
      studentFileUpload(event , template , 'submitTeamTermPaper' , 'divProgress' , metacontext);
       Tracker.autorun(function (c) {
         if (template.downloadUrl.get()){
            let paperUrl = template.downloadUrl.get();
            let paperId = template.paperId.get();
            $('#paperModal').modal('hide');
            Meteor.call('updateTeamTermPaper' , paperId , paperUrl , function(err , result){
               if (err){alert(err.reason)}
           });
           c.stop()
         }
       });

  }

});
