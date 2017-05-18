
Accounts.emailTemplates.siteName = 'Tony Amakpa';
Accounts.emailTemplates.from = 'noreply@flagstoneholdings.com';




Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "[Tony Amakpa] Verify Your Email Address";
  },
  text( user, url ) {
    let emailAddress   = user.emails[0].address,
        urlWithoutHash = url.replace( '#/', '' ),
        supportEmail   = "support@flagstoneproperty.com",
        emailBody      = 'To verify your email address ' + emailAddress + ' visit the following link:\n\n ' + urlWithoutHash + '\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ' + supportEmail ;

    return emailBody;
  }
};


Accounts.emailTemplates.enrollAccount = {
  subject() {
    return "[Tony Amakpa]  Set your password";
  },
  text(user, url ) { 
      let urlWithoutHash = url.replace( '#/', '' ),
        emailBody      = 'To set your password visit the following link:\n\n ' + urlWithoutHash;

    return emailBody;
  }
};