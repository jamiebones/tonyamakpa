
import setScroll from './set-scroll';


let _getMessage = ( template ) => {
   let message = template.find( '[name="message"]').value;
   return message.trim();
};

let _checkIfCanInsert = ( message , event ) => {
   return message !== "" && event.keyCode === 13;
};

let _buildMessage = ( template ) => {
  return {
      destination : Router.current().params.query.channel.replace('@' , ''),
      isDirect : template.isDirect.get(),
      message : template.find('[name="message"]').value
  };
};

let _handleInsert = ( message , event , template ) => {
  Meteor.call('insertMessage' , message , (error) => {
    if (error){
      sAlert.error(error.reason , {effect: 'genie',
      position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '100px'});
    }
    else{
      event.target.value = '';
    }
  });
};

export default function (event , template) {
   let text = _getMessage(template),
       canInsert = _checkIfCanInsert( text , event);
   if (canInsert) {
       setScroll('messages');
       _handleInsert( _buildMessage(template) , event , template);
   }
}
