Slingshot.fileRestrictions("academicPapers", {
  allowedFileTypes: ["application/pdf", "application/msword", "application/excel" , "application/x-excel" , "text/plain"],
  maxSize: null // 10 MB (use null for unlimited).
});

Slingshot.fileRestrictions("authorsImages", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/jpg" , "image/gif"],
  maxSize: 10 * 1024 * 1024 // 10 MB (use null for unlimited).
});


Slingshot.fileRestrictions("eventImage", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/jpg" , "image/gif"],
  maxSize: 3 * 1024 * 1024 // 10 MB (use null for unlimited).
});

Slingshot.fileRestrictions("uploadBookImage", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/jpg" , "image/gif"],
  maxSize: 3 * 1024 * 1024 // 10 MB (use null for unlimited).
});

Slingshot.fileRestrictions("submitted_papers", {
  allowedFileTypes: ["application/pdf", "application/msword", "application/excel" , "application/x-excel" , "text/plain"],
  maxSize: 200 * 1024 // 10 MB (use null for unlimited).
});

Slingshot.fileRestrictions("markedScript", {
  allowedFileTypes: ["application/pdf", "application/msword", "application/excel" , "application/x-excel" , "text/plain"],
  maxSize: 200 * 1024 // 10 MB (use null for unlimited).
});

Slingshot.fileRestrictions("uploadedCourseMaterialsAudioVideo", {
  allowedFileTypes: ["video/avi", "video/msvideo", "video/x-msvideo" ,"video/avs-video" ,
                      "audio/x-wav" , "audio/wav" , "audio/mpeg" ,"video/x-mpeg" ,
                      "audio/mpeg3" , "audio/midi" , "audio/x-mid" ,
                      "audio/x-midi" ,"audio/x-mpeg-3" , "video/mpeg" ,"audio/mp3" ],
  maxSize: null  // 10 MB (use null for unlimited).
});

Slingshot.fileRestrictions("uploadedCourseMaterialsDocument", {
  allowedFileTypes: ["application/pdf", "application/msword", "application/excel" , "application/x-excel" ,
                      "text/plain"],
  maxSize: 3 * 1024 * 1024 // 10 MB (use null for unlimited).
});
