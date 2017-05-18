
Slingshot.createDirective("authorsImages", Slingshot.S3Storage, {
  bucket: Meteor.settings.BucketName,
  AWSAccessKeyId : Meteor.settings.AWSAccessKeyId,
  AWSSecretAccessKey : Meteor.settings.AWSSecretAccessKey,
  acl: "public-read",

  authorize: function () {
    // do some validation
    // e.g. deny uploads if user is not logged in.
    if (!this.userId) {
      return true;
     }

    return true;
  },

  key: function (file) {
    let timeStamp = + new Date
    return  'authors_images/' + timeStamp + '_' + file.name;
  }
});



