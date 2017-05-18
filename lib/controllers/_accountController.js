

AccountController = RouteController.extend({
    fastRender: true,
    data: function () {},
    onBeforeAction: function () {
        this.next();
    },

    verifyEmail: function() {
        let verificationToken = this.params.token;
        Accounts.verifyEmail(verificationToken,  function(error) {
           if (error) {
               sAlert.error(error);
           } else {
               sAlert.success('Email verified successfully');
               Router.go('/dashboard');
           }
        });

    }
});
