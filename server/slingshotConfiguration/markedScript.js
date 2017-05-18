

Slingshot.createDirective("markedScript", Slingshot.S3Storage, {
  bucket: Meteor.settings.BucketName,
  AWSAccessKeyId : Meteor.settings.AWSAccessKeyId,
  AWSSecretAccessKey : Meteor.settings.AWSSecretAccessKey,
  acl: "public-read",

  authorize: function () {
    // do some validation
    // e.g. deny uploads if user is not logged in.
    if (this.userId) {
         return true;
     }
  },

  key: function (file) {
    let timeStamp = + new Date;
    let userId = this.userId;
    let newFilename = file.name.replace(/_/g , "-");
    return  'markedScript/' + timeStamp + '_' + userId + '_' + newFilename;
  }
});
