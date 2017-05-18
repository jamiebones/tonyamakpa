
Meteor.methods({
	 removeAcademicPaper: function (selectedPaperUrl , id){
      check(selectedPaperUrl, String );
      let bucket = Meteor.settings.BucketName;

        // URL string: e.g. https://mybucket.s3.amazonaws.com/images/myimage.jpg is saved in DB,
        // I only want: 'images/myimage.jpg'
        //var currentPhotoURL = currentPhoto.url.replace('https://' + bucket + '.s3.amazonaws.com/', '');

        var splitUrl = selectedPaperUrl.split('/');
        var deleteUrl = splitUrl[splitUrl.length - 2] + '/' + splitUrl[splitUrl.length - 1];

        AWS.config.update({
          accessKeyId: Meteor.settings.AWSAccessKeyId,
          secretAccessKey: Meteor.settings.AWSSecretAccessKey,
        });

        var s3 = new AWS.S3();
        var params = {
          Bucket: bucket, // 'mybucket'
          Key: deleteUrl // 'images/myimage.jpg'
        };

        var deleteObject = Meteor.wrapAsync(
        s3.deleteObject(params, Meteor.bindEnvironment(function (error, data) {
            if (error) {
              console.log(error);
            }
            else {
              if (id){
                    Academic_Paper.update({"_id" : id} , {$set : {"downloadUrl" : ""}});
              }
                
               // Remove the entry in the database. (Want to only trigger this if there is no error from Amazon).     
            }
          }))
        );
   
  },

    removeAuthorImage: function (selectedImageUrl , id , name){
      check(selectedImageUrl, String );
      let bucket = Meteor.settings.BucketName;

        // URL string: e.g. https://mybucket.s3.amazonaws.com/images/myimage.jpg is saved in DB,
        // I only want: 'images/myimage.jpg'
        //var currentPhotoURL = currentPhoto.url.replace('https://' + bucket + '.s3.amazonaws.com/', '');

        var splitUrl = selectedImageUrl.split('/');
        var deleteUrl = splitUrl[splitUrl.length - 2] + '/' + splitUrl[splitUrl.length - 1];

        AWS.config.update({
          accessKeyId: Meteor.settings.AWSAccessKeyId,
          secretAccessKey: Meteor.settings.AWSSecretAccessKey,
        });

        var s3 = new AWS.S3();
        var params = {
          Bucket: bucket, // 'mybucket'
          Key: deleteUrl // 'images/myimage.jpg'
        };

        var deleteObject = Meteor.wrapAsync(
        s3.deleteObject(params, Meteor.bindEnvironment(function (error, data) {
            if (error) {
              console.log(error);
            }
            else {
              if (id){
                    Academic_Paper.update({"_id" : id ,"author.name" : name }  , {$set : {"author.$.imageUrl" : ""}});
              }
                
               // Remove the entry in the database. (Want to only trigger this if there is no error from Amazon).     
            }
          }))
        );
   
  },

});