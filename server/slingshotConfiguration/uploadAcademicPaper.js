
Slingshot.createDirective("academicPapers", Slingshot.S3Storage, {
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
    let timeStamp = + new Date
    return  'academic_papers/' + timeStamp + '_' + file.name;
  }
});


Slingshot.createDirective("eventImage", Slingshot.S3Storage, {
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
    return  'event_Image/' + timeStamp + '_' + file.name;
  }
});

Slingshot.createDirective("uploadBookImage", Slingshot.S3Storage, {
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
    let timeStamp = + new Date
    return  'academic_papers/' + timeStamp + '_' + file.name;
  }
});



