
MessageFeedback = new Mongo.Collection("messagefeedback");

MessageFeedback_Schema = new SimpleSchema({
     "sender" : {
       type : String,
       label : '',
     },
     "messageDate" : {
        type : Date,
        label : ''
     },

     "message" : {
       type : String,
       label : "Message",
     },

     "messageRead" : {
       type : Boolean,
       label : 'Message Read',
     }
});

MessageFeedback.attachSchema(MessageFeedback_Schema);
