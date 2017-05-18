Meteor.startup(function(){

  TonyAmakpa = {}

	TonyAmakpa.smtp = {
		username : 'noreply@flagstoneholdings.com',
		password : 'Mnijoiafesflagstone147/',
		server : 'smtp.mailgun.org',
		port : 587
	}


	process.env.MAIL_URL = 'smtp://' +
				encodeURIComponent(TonyAmakpa.smtp.username) + ':' +
				encodeURIComponent(TonyAmakpa.smtp.password) + '@' +
				encodeURIComponent(TonyAmakpa.smtp.server) + ':' +
				TonyAmakpa.smtp.port;
});
