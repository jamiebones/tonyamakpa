
Meteor.publish('sideLink' , function() {
  return [
     Channels.find(),
     Meteor.users.find({_id : {$ne : this.userId}} , {fields : {username : 1 , 'profile.firstname' : 1 , 'profile.surname' : 1}}),
     Messages.find()
  ];
});
