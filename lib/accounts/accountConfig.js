
let myPostLogout = function(){
    //example redirect after logout

    Router.go('/')
}

  let addUserHookUp = function(userid , info){
      if (info.profile.regnum){
          Roles.addUsersToRoles(userid , ['student'])
      }

    //if (info.profile.surname == 'admin'){
       // Roles.addUsersToRoles(userid , ['admin']);
   //}

   //else{
      //  Roles.addUsersToRoles(userid , ['sitemember'])
  //  }
}

 let mypreSubmitFunction = function(pwd , info){
    //adding the token to the hidden field

}

let mySubmitHook = function(){

}


AccountsTemplates.configure({
    // Behavior
    confirmPassword: true,
    enablePasswordChange : true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: true,
    lowercaseUsername: false,
    focusFirstInput: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: true,

    // Client-side Validation
    continuousValidation: true,
    negativeFeedback: true,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Privacy Policy and Terms of Use
    privacyUrl: '',
    termsUrl: '',

    // Redirects
    homeRoutePath: '/',
    redirectTimeout: 4000,

    // Hooks
    onLogoutHook: myPostLogout,
    onSubmitHook: mySubmitHook,
    preSignUpHook: mypreSubmitFunction,
    postSignUpHook: addUserHookUp,

    // Texts
    texts: {
      button: {
          signUp: "Sign Up For An Account"
      },
      socialSignUp: "Register",
      socialIcons: {
          "meteor-developer": "fa fa-rocket"
      },
      title: {
          forgotPwd: "Recover Your Password"
      },
    },


});




AccountsTemplates.configure({
    defaultLayout: 'mainLayout',
});





//AccountsTemplates.configureRoute('signUp' , {
   //name : 'register',
    //path : '/register',
    //template : 'registerTemplate',
    //layoutTemplate : 'mainLayout',
    //redirect : '/'
//});

AccountsTemplates.configure({
    texts: {
      title: {
        changePwd: "Password Title",
        enrollAccount: "Set Password",
        forgotPwd: "Forgot Password",
        resetPwd: "Reset Password",
        signIn: "Please Login",
        signUp: "Sign Up For An Account",
        verifyEmail: "Verify Your Email",
      }
    }
});


AccountsTemplates.configure({
    texts: {
        button: {
          changePwd: "Change Password",
          enrollAccount: "Set Password",
          forgotPwd: "Forgot Password",
          resetPwd: "Reset Password",
          signIn: "Login",
          signUp: "Register Account",
        }
    }
});


AccountsTemplates.configure({
    texts: {
        info: {
            emailSent: "info.emailSent",
            emailVerified: "info.emailVerified",
            pwdChanged: "info.passwordChanged",
            pwdReset: "info.passwordReset",
            pwdSet: "info.passwordReset",
            signUpVerifyEmail: "Successful Registration! Please check your email and follow the instructions.",
            verificationEmailSent: "A new email has been sent to you. If the email doesn't show up in your inbox, be sure to check your spam folder.",
        }
    }
});


AccountsTemplates.configure({
    texts: {
        errors: {
            accountsCreationDisabled: "Client side accounts creation is disabled!!!",
            cannotRemoveService: "Cannot remove the only active service!",
            captchaVerification: "Captcha verification failed!",
            loginForbidden: "error.accounts.The username or password is incorrect",
            mustBeLoggedIn: "error.accounts.Must be logged in",
            pwdMismatch: "error.pwdsDontMatch",
            validationErrors: "Validation Errors",
            verifyEmailFirst: "Please verify your email first. Check the email and follow the link!",
        }
    }
});


//AccountsTemplates.configureRoute('signIn');
//AccountsTemplates.configureRoute('signUp');

AccountsTemplates.configure({
    defaultLayout: 'mainLayout',
    texts:{
          signUpLink_pre: '',
          signUpLink_link: '',
       }


});
