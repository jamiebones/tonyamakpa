
Template.manageUsers.onCreated(function(){
	let template = Template.instance()
	template.userId = ReactiveVar();
	template.Id = ReactiveVar();
	template.updateReg = ReactiveVar()
	template.searchQuery = new ReactiveVar();
	template.searching = new ReactiveVar(false);


		template.autorun( () => {
			 template.subscribe('allUsers' , template.searchQuery.get(), () => {
				 setTimeout( ()=> {
						template.searching.set(false)
				 } , 300);
			 });
		});
})

Template.manageUsers.events({
	'change .js-selectRole' : function(event , template){
		event.preventDefault();
		let selectedRole = $(event.target).val();
		let id = event.currentTarget.dataset.id;

		if (selectedRole === '0'){
			return false;
		}

		//if (selectedRole === 'admin'){
			//return false;
		//}

		Meteor.call('updateUserRole' , id , selectedRole , function(error , result){
			 if (! error) {
			 		sAlert.success('Roles added to user', {effect: 'genie',
    				position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
			 }

			 else{
			 	sAlert.error(error.reason , {effect: 'genie',
    					position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
			 }

		});
	},

	'click .js-deleteUser' : function(event , template){
		event.preventDefault();
		let id = event.currentTarget.dataset.id;
    let con = confirm('Are you sure you want to delete user account');
		if (id && con){
			Meteor.call('deleteUserAccount' , id , function(error , result){
				if (! error){
					sAlert.success('user account deleted', {effect: 'genie',
    				position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
				}

				else{
					sAlert.error(error.reason , {effect: 'genie',
    				position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
				}
			})
		}
	},

	'click .js-addRegNum' : function(event , template){
		 event.preventDefault();
		 let id = event.currentTarget.dataset.id;
		 template.updateReg.set(id)
		 $("#updateRegistrationNum").modal('show');

	},

	'click .js-updateReg' : function(event , template){
			 event.preventDefault();
			 debugger;
			 let id = template.updateReg.get();
			 let regnum = $("#txtRegNumber").val().trim();
			 if (id && regnum){
	 			Meteor.call('saveRegisterationNumber' , id , regnum ,  function(error , result){
	 				if (! error){
	 					sAlert.success('Reg number updated', {effect: 'genie',
	     				position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
							$("#updateRegistrationNum").modal('hide');
							$("#txtRegNumber").val("");
	 				}

	 				else{
	 					sAlert.error(error.reason , {effect: 'genie',
	     				position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
	 				}
	 			})
	 		}

	},

	'click .js-removeRole' : function(event , template){
		event.preventDefault();
		let li = $(event.target.parentNode);
		let role = li.context.innerText;
		role = role.replace("X" , " ").trim();
		let user = template.userId.get();
		let id = user[0]._id;
		let roles = user[0].roles;
		let index = roles.indexOf(role);
		if (index != -1){
			roles.splice(index , 1)
		}
		if (id){
			Meteor.call('removeRole' , id , roles , function(error , result){
				if (! error){
					sAlert.success('role removed', {effect: 'genie',
    				position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
    				let modal = $('#editUserModal');
		            modal.modal('hide');
				}

				else{
					sAlert.error(error.reason , {effect: 'genie',
    				position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
				}
			})
		}
	},

	'click .js-editRole' : function(evt , template){
		evt.preventDefault();
		let id = evt.currentTarget.dataset.id;
		let user = Meteor.users.find(id).fetch();
		template.userId.set(user);
		let modal = $('#editUserModal');
		modal.modal('show');
	},

	"keyup #js-searchUser" : function(event, template){
	event.preventDefault();
	let value = $('#js-searchUser').val().trim();
	if ( value !== '' && event.keyCode === 13 ) {
		template.searchQuery.set( value );
		template.searching.set( true );
	}

	if ( value === '' ) {
		template.searchQuery.set( value );
	}
},
});



Template.manageUsers.helpers({
	getUsers()  {
		let search = Template.instance().searchQuery.get();
		let query      = {},
			  projection = {}
		check( search, Match.OneOf( String, null, undefined ) );
		if (! search){
			  return Meteor.users.find(query , projection);
		}
			let regex = new RegExp(search, 'i');
			query = {
				$or : [
						{ "profile.surname" : regex},
						{ "regnum" : regex},
						{ "profile.firstname" : regex},
				]
			};
	    projection.limit = 50;
   //console.log(Meteor.users.find(query , projection).fetch())
		return Meteor.users.find(query , projection);
	},
	searching() {
    return Template.instance().searching.get();
  },
  query() {
    return Template.instance().searchQuery.get();
  },
	getRoles(){
		return Meteor.roles.find().fetch();
	},
	oneUser(){
		if (Template.instance().userId.get()){
			let user = Template.instance().userId.get();
			return user;
		}
	}
})
