AccountsTemplates.removeField ('email');

AccountsTemplates.addField({
    _id: 'username',
    type: 'text',
    displayName: 'username',
    required: true,
    minLength: 4,
    lowercase: true,
    });

AccountsTemplates.addField({
  _id: 'email',
  type: 'email',
  required: true,
  re: /.+@(.+){2,}\.(.+){2,}/
});

AccountsTemplates.removeField ('password');
AccountsTemplates.addField({
  _id: 'password',
  type: 'password',
  required: true,
  minLength: 5
});


AccountsTemplates.addFields([

    {
        _id: 'firstname',
        type: 'text',
        displayName: "Firstname",
        required : true,
    },
    {
        _id: 'surname',
        type: 'text',
        displayName: "Surname",
        required : true,
    },

]);

//AccountsTemplates.addField({
   // _id: 'password',
   // type: 'password',
  //  placeholder: {
    //    signUp: "At least six characters"
   // },
   // required: true,
   // minLength: 6,
   // re: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
  //  errStr: 'At least 1 digit, 1 lowercase and 1 uppercase',
//});
AccountsTemplates.configureRoute('signUp' , {
    name : 'signUp',
    path : '/new_account_registeration',
    template : 'accountRegister',
    layoutTemplate : 'mainLayout',
    redirect :'/dashboard'
});
