

AccountsTemplates.configureRoute('signIn' , {
    name : 'signIn',
    path : '/login',
    template : 'accountLogin',
    layoutTemplate : 'mainLayout',
    redirect :'/dashboard'
});