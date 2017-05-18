
Messages = new Mongo.Collection('messages');

let MessagesSchema = new SimpleSchema({
     'channel' : {
        type : String,
        label : 'channel id',
        optional : true
     },

     'to' : {
       type : String,
       label : 'The id of the user messsage is for',
       optional : true
     },

     'owner' : {
        type : String,
        label : 'the id of the user that created the message'
     },

     'timestamp' : {
        type : Date,
        label : 'The date and time the message was created'
     },

     'message' : {
        type : String,
        label : 'The content of the message'
     },
     
     'read' : {
        type : Boolean,
        label : 'Is the message read'
     },
});

Messages.attachSchema(MessagesSchema);
