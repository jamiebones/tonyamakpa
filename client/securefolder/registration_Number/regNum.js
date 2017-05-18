
Template.regNumber.onCreated(function(){
   let template = Template.instance()
   template.subscribe('allUsers');
});

Template.regNumber.events({
  'click .js-saveRegNum' : function(event , template){
    event.preventDefault();
    let regNum = $('.js-regNumber').val().trim();
    let con = confirm('Hope' + regNum + ' is your registeration number. You can not edit it again after saving it');

    if (regNum && con) {
       let userId = Meteor.userId();
       Meteor.call('saveRegisterationNumber' , userId , regNum , (error , result)=>{
          if (result){
            sAlert.success('Registeration number saved' , {effect: 'genie',
  					position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
            $('.js-regNumber').val('');
          }
          else{
            sAlert.error(error.reason)
          }
      })


    }

  }
})

Template.regNumber.helpers({
  getUser()  {
    let userId = Meteor.userId();
		let user = Meteor.users.find({"_id": userId}).fetch();
		return user
	},
})
