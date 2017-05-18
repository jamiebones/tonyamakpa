
//forget and reset password account route

AccountsTemplates.configureRoute('forgotPwd' , {
	name : 'forgetPassword',
    path : '/reset_password',
    template : 'forgotPassword',
    layoutTemplate : 'mainLayout',
    //redirect :'/dashboard'
});




//AccountsTemplates.configureRoute('resetPwd' , {
	//name : 'resetPassword',
	//path : '/rest_passwordlink',
	//template : 'resetPassword',
	//layoutTemplate : 'mainLayout'
//});