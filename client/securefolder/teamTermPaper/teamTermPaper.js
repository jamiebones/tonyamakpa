
Template.teamTermPaper.onCreated(function(){
   let template = Template.instance();
   template.subscribe('allUsers');
});

Template.teamTermPaper.rendered = function(){
  let template = Template.instance();
  template. $( "#datepicker" ).datepicker({
               showOn: "button",
               buttonImage: "/img/calendar.gif",
               buttonImageOnly: true,
               buttonText: "Select date"
});
  	template.$('#teamForm').validate();
}


Template.teamTermPaper.helpers({
   getStudents(){
     return Meteor.users.find({} , {$sort : {"regnum" : -1}});
   }
});

Template.teamTermPaper.events({
  "submit form#teamForm" : function(event , template){
      event.preventDefault();
      let div = $(".selectedDiv").find('p'),
          divPara = [...div]
      if (divPara.length > 0){
          let arr = []
          let mapPara = divPara.map((para)=>{
             debugger
              let member = {}
              member.teamLeader = false;
              member.regnum = para.innerText
              arr.push(member);
          });
          //we are all good we can save everything in the database
          //make an idiot a team leader
    
          let teamLeader = Math.ceil(Math.random() * (arr.length - 1));
          let mem = arr[teamLeader];
          let obj = {}
          obj.teamLeader = true;
          obj.regnum  = mem.regnum
          arr[teamLeader] = obj;

          let button = $(".js-submitTermPaper");
          let paper = {};
          paper.paper_name = $("#txtPaperName").val().trim();
          paper.date_created = new Date();
          paper.instructions = $(".js-termPaperInstruction").val().trim();
          let submission_Date = $('.js-lastSubmitDate').val();
      		paper.last_submission_date = new Date(submission_Date);
          paper.active = true;
          paper.member = arr;
      		button.attr('disabled' , true);
      		button.text('Please Wait----------');
          Meteor.call('saveTeamTermPaper' , paper , (error , result)=>{
            if (! error){
             sAlert.success('Paper assigned to selected students', {effect: 'genie',
               position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
               button.attr('disabled' , false);
           		 button.text('Assign Students To Team Term Paper');
               $("#txtPaperName").val("");
               $(".js-termPaperInstruction").val("");
               $('.js-lastSubmitDate').val("")
               divPara.map((para)=>{
                  para.remove();
               })
           }
           else{
             sAlert.error(error.reason , {effect: 'genie',
               position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
               button.attr('disabled' , false);
           		 button.text('Assign Students To Team Term Paper');
           }
          })
      }else{
        alert('Please select students to assign this fucking assignment to');
        return;
      }


  },

  "click .js-studentList": function(event, template){
      event.preventDefault();
      let data = event.currentTarget.dataset.id;
      let div = $('.selectedDiv');
      let para = $(div).find('p');
      let paraArray = [...para];
      let arr = []
      let mapPara = paraArray.map((para)=>{
          arr.push(para.innerText);
      });
      if (arr.includes(data)){
        return;
      }
      div.append('<p class=' + 'selRegNum' + '>' + data + '</p>');
  },
  'click .selRegNum' : function(event , template){
     event.preventDefault();
     let para = $(event.currentTarget).remove();
  }
});
