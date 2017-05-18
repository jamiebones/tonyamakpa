
Channels = new Mongo.Collection('channels');

let ChannelSchema = new SimpleSchema({
   'name' : {
      type : String,
      label : 'The name of the channel'
   }
});

Channels.attachSchema(ChannelSchema);
