

Template.message.helpers({
  name( userId ) {
    if ( userId ) {
      let user = Meteor.users.findOne( userId, { fields: { 'profile.firstname': 1 , 'profile.surname' : 1} } );
      let fullname = user.profile.firstname + " " + user.profile.surname;
      return user ? fullname : '';
    }
  }
});

Template.message.events({
  'click a' ( event ) {
    event.preventDefault();
    window.open( event.target.href, '_blank' );
  }
});
