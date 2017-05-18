

Slingshot.createDirective("submitTeamTermPaper", Slingshot.S3Storage, {
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
  key: function (file , metacontext) {
    let newFilename = metacontext.newFilename;
    let timeStamp = + new Date;
    //let newFilename = file.name.replace(/_/g , "-");
    return 'Team_Term_Papers/' + timeStamp + '_' + newFilename;
  }
});
