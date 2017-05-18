
Slingshot.createDirective("uploadedCourseMaterialsAudioVideo", Slingshot.S3Storage, {
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
    return  'course_materails/audio_video/' + file.name;
  }
});


Slingshot.createDirective("uploadedCourseMaterialsDocument", Slingshot.S3Storage, {
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
    return  'course_materails/documents' + file.name;
  }
});
