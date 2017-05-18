
Slingshot.fileRestrictions("submitTeamTermPaper", {
  allowedFileTypes: ["application/msword" , "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  maxSize: 50 * 1024 // 10 MB (use null for unlimited).
});
