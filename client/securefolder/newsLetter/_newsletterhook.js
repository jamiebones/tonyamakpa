
let hookObject = {
	onSuccess : function(formType , result){
		if (result){
			sAlert.success('Saved!', {effect: 'genie',
            position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
		}
	},

	onError : function(formType , error){
		if (error){
			sAlert.error(error.reason , {effect: 'bouncyflip',
            position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
		}
	},
}



//AutoForm.addHooks(null , hookObject)
AutoForm.addHooks(['insertNewsLetter'], hookObject);
