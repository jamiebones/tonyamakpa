Meteor.methods({
	'addTermPaper' : function(termpaper){
		check(termpaper , TermPaper_Schema);
		return TermPaper.insert(termpaper);
	},

    'updateTermPaperStatus' : function(id , status){
    	return TermPaper.update(id , {$set : {"active" : status}});
    },

    'updateTermPaperSubmitDate' : function(id , submitDate){
    	return TermPaper.update(id , {$set : {"last_submission_date" : submitDate}});
    },

    'saveAcademicPaper' : function(paper){
    	check(paper , Academic_Paper_Schema);
    	return Academic_Paper.insert(paper);
    },

    'savePaperLink' : function(id , link){
    	return Academic_Paper.update(id , {$set : {"downloadUrl" : link }});
    },

    saveAuthorImageLink : function(imageObj){
        return Academic_Paper.update({"_id" : imageObj._id , "author.name" : imageObj.name},
                                 {$set : {"author.$.imageUrl" : imageObj.imageUrl}});
    },

    addUpcomingEvent : function(event){
        check(event , School_Events_Schema);
        return School_Events.insert(event);
    },

    saveEventImageLink : function(id , url){
        return School_Events.update({"_id" : id} , {$set : {"card_link" : url}});
    },

    insertNewsLetter : function(newsletter){
      check(newsletter, Newsletter_Schema);
      return Newsletter.insert(newsletter);
    },

  sendEmailVerificationLink : function(){
     let userId = Meteor.userId();
     if (userId){
       return Accounts.sendVerificationEmail(userId);
     }
  },

  saveBookForReview : function(book){
    check(book,Book_Review_Schema);
    return Book_Review.insert(book);
  },

  'updateBookReview' : function(id , review){
    return Book_Review.update(id ,  {$push : {"reviewers" : review}})
  },

  'getUserBookReview' : function(bookId){
        return Book_Review.aggregate([
          {$match: {'reviewers.userId': Meteor.userId()}},
          {$project : {
            reviewers : {$filter : {
                input : "reviewers",
                as : "reviewer",
                cond : {$eq : ["$$reviewer.userId" , Meteor.userId()]}
              }},
            _id : 0

          }}
      ]);
  },

  'saveEditedReview' : function(bookId , oldReview, newReview){
    Book_Review.update({"_id" : bookId} ,  {$pull :{"reviewers" : oldReview}});
    return Book_Review.update({"_id" : bookId} , {$push : {"reviewers" : newReview}})
  },

  'savePersonReview' : function(bookId , review){
    return Book_Review.update({"_id" : bookId} ,  {$push : {"reviewers" : review}});

  },

  'deleteReview' : function(bookId , review){
     return Book_Review.update({"_id" : bookId} ,  {$pull :{"reviewers" : review}});
  },

  saveStudentAssignment : function(paperId , submited){
    return TermPaper.update(paperId , {$push : {"submiter" : submited}})
  },

  'saveStudentScore' : function(bookId , oldSubmitter, newSubmitter){
      TermPaper.update({"_id" : bookId} ,  {$pull :{"submiter" : oldSubmitter}});
    return TermPaper.update({"_id" : bookId} , {$push : {"submiter" : newSubmitter}});
  },

  'saveMarkedStudentPaperLink' : function(bookId , userId , scriptLink){
    return TermPaper.update({"_id" : bookId , "submiter.userId" : userId}
               , {$set : {"submiter.$.markedScriptLink" : scriptLink}});
  },

  'sendStudentEmail' : function(emailObj){
        Email.send({
        to: emailObj.to,
        from: emailObj.from,
        subject: emailObj.subject,
        text: emailObj.text,
        html : emailObj.html
    });
  },

  saveHistory : function(history , date){
    return History_Today.insert({"extract" : history , "date" : date});
  },

  editHistory : function(id , history){
    return History_Today.update({"_id": id} , {$set : {"extract" : history}})
  },

  updateUserRole : function(userId , role){
  if (!Roles.userIsInRole(userId ,[role])){
     //Roles.setUserRoles(userId , role);
     Roles.addUsersToRoles(userId , role);
  }
},

 removeRole : function(userId , roles){
     Roles.setUserRoles(userId , []);
     Roles.addUsersToRoles(userId , roles);
},


deleteUserAccount : function(userId){
  return Meteor.users.remove(userId);
},

getCurrentTime : function(){
  return Date.parse(new Date());
},

saveCourseCode : function(course){
	//check(course , Courses_Schema);
	return Courses.insert(course);
},
saveCourseMaterial : function(material){
	 check(material , CourseMaterial_Schema);
	 return CourseMaterial.insert(material);
},

saveMessageFeedback : function(feedback){
	 check(feedback, MessageFeedback_Schema);
	 return MessageFeedback.insert(feedback);
},
 saveNews : function(news){
	 check(news, News_Schema);
	 return News.insert(news);
},

updateNews : function( doc, newsId ) {
	check( doc, News_Schema );
	try {
		 News.update({_id: newsId}, doc );
	   //return newsId;
	} catch( exception ) {
		return exception;
	}
},

insertChannel : function (name){
	check(name, String);
	Channels.insert(name)
},

updateReadMessages : function (owner , to){
	 Messages.update({"owner" : owner , "to" : to , "read" : false} ,
	 {$set :{"read" : true}} , {multi : true})
},

saveStudentProject : function(project){
	 check (project , StudentProject_Schema);
	 return StudentProject.insert(project);
},

makeMessageRead : function(msgId){
	 return MessageFeedback.update(msgId , {$set : {"messageRead" : true}});
},

saveRegisterationNumber : function(userId , regNum){
	 return Meteor.users.update({"_id" : userId} , {$set : {"regnum" : regNum}})
},

saveTeamTermPaper : function(paper){
	check(paper , TeamTermPaper_Schema);
	return TeamTermPaper.insert(paper);
},

updateSubmitId : function(userId , paperId){
	 return Meteor.users.update(userId , {$set : {"submittedId" : paperId}});
},
updateTeamTermPaper : function(paperId , downloadUrl){
	  let submitDate = new Date();
	  return TeamTermPaper.update(paperId , {$set :
			                                     {"paperUrl": downloadUrl,
																				     "scriptSubmitted" : true,
																					   "dateSubmitted" : submitDate }});
},

updateTeamPaperScore : function(paperId , score){
	  return TeamTermPaper.update({"_id" : paperId} , {$set : {"score" : score , "script_marked" : true}});
}


});
