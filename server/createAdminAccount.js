
if (Meteor.isServer){
	//find if the account has already been created
	let user = Accounts.findUserByEmail('jamiebones2000@yahoo.co.uk');

	if (user == undefined){
	  let id = Accounts.createUser({
		email: 'jamiebones2000@yahoo.co.uk',
		password : 'blazing147',
    username : 'jamiebones',
		profile : {firstname : 'James',
               surname : 'Oshomah'}
	});

	if (id){
		Roles.addUsersToRoles(id , 'admin');
	}

	}
}
