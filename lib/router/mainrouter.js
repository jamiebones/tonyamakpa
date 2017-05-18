
Router.configure({
  //layoutTemplate: 'mainLayout',
  loadingTemplate : 'loadingTemplate',

});




Router.route('/testing', {
  name : 'testing',
  template : 'multipleUpload',
  layoutTemplate:'mainLayout'

});

//normal routes that doesn't require the user to be loggined into the system
//Router.route('/student_projects' , { name : 'studentProject' , template : viewStudentProject , layoutTemplate : mainLayout});
Router.route('/', {name : 'home', controller : 'homeController'});
Router.route('/student_projects', {name : 'projects', controller : 'viewStudentProjectController'});


//admin stuffs router business





Router.route('/dashboard', {name : 'dashboard', controller : 'dashboardController'});
Router.route('/dashboard/view_termpaper_result' , {name : 'viewTermPaperResult', controller : 'viewTermPaperResultController'});
Router.route('/dashboard/write_review' , {name : 'writeNewReview',  controller : 'writeReviewController'});
Router.route('/dashboard/submit_paper' , {name : 'submitPaper',    controller : 'submitPapersController'});

Router.route('/dashboard/course_materials_download' , {name : 'viewCourseMaterials', controller : 'viewCourseMaterials'});
Router.route('/dashboard/write_review_book' , {name : 'writeandEditReview', controller : 'writeBookReviewController'});
Router.route('/dashboard/write_feedback' , {name : 'feedback', controller : 'feedbackController'});
Router.route('/dashboard/registeration_number' , {name : 'regNum', controller : 'regNumController'});
Router.route('/dashboard/term_paper_team_assignment' , {name : 'viewTeamPaper', controller : 'teamPaperAssignmentView'});

Router.route('/admin_matters/upload_script' , { name : 'uploadScript' , controller : 'uploadScript'});
Router.route('/admin_matters/write_review_book' , {name : 'writeReview', controller : 'adminWriteReview'});
Router.route('/admin_matters/edit_term_paper' , {name : 'editPaper', controller : 'editPapersAdmin'});
Router.route('/admin_matters/paper_details' , {name : 'paperDetails', controller : 'adminPaperDetails'});
Router.route('/admin_matters/view_academic_papers' , {name : 'allAcademicPapers', controller : 'adminViewAcademicPapers'});
Router.route('/admin_matters/view_history' , {name : 'showHistory', controller : 'viewHistory'});
Router.route('/admin_matters/edit_history' , {name : 'editHistory', controller : 'editHistory'});
Router.route('/admin_matters/add_course_material' , {name : 'addCourseMaterial',controller : 'addCourseMaterialController'});
Router.route('/admin_matters/script' , {name : 'scriptPage',controller : "scriptController"});
Router.route('/admin_matters/add_term_paper' , {name : 'addTermPaper', controller : 'addTermPaperController'});
Router.route('/admin_matters/add_newsletter_paper' , {name : 'addnewsLetter',  controller : 'addNewsPaperController'});
Router.route('/admin_matters/book_review' , {name : 'bookReview',  controller : 'bookReviewController'});
Router.route('/admin_matters/all_books' , {name : 'showBooks',controller : 'allBooksController'});
Router.route('/admin_matters/add_academic_paper' , {name : 'addAcademicPapers', controller : 'addAcademicPapersController'});
Router.route('/admin_matters/mark_script' , {name : 'markScript', controller : 'markScriptController'});
Router.route('/admin_matters/manage_users' , {name : 'manageUsers',  controller : 'manageUsersControllers'});
Router.route('/admin_matters/add_event' , {name : 'addEvents', controller : 'addEventsController'});
Router.route('/admin_matters/add_courses' , {name : 'addCourse', controller : 'addCourseController'});
Router.route('/admin_matters/add_history' , {name : 'addHistory', controller : 'addHistoryController'});



Router.route('/admin_matters/add_news' , { name : 'addNews' , controller : 'addNewsController'});
Router.route('/admin_matters/edit_news' , { name : 'editNews' , controller : 'newsEditController'});

Router.route('/admin_matters/edit_single_news/:_id' , { name : 'editOneNews' , controller : 'editNewsController'});

Router.route('/admin_matters/viewfeedback_messages' , { name : 'viewFeedbackMsg' , controller : 'viewFeedbackMessageController'});

Router.route('/admin_matters/team_term_paper' , { name : 'teamPaper' , controller : 'teamTermPaperControllers'});


//academic paper
//Account loggin routes
Router.route('/verify-email/:token', {controller : 'AccountController', action : 'verifyEmail'});
Router.route('/resend_link' , {name : 'verifyLink',  template : 'membersHome',  layoutTemplate:'secureLayout'});
Router.route('reset-password/:token' , {name : 'resetPassword', template : 'resetPassword', layoutTemplate : 'mainLayout'});



//chating route link

Router.route('/messages/' , {name : 'chatRoute',  template : 'channel',  layoutTemplate:'secureLayout'});

Router.route('/admin_matters/add_chat_channel' , { name : 'addNewChannel' , controller : 'addChannelController'});



Router.route('/admin_matters/upload_student_project' ,{ name : 'uploadProject' , controller : 'UploadProjectController'});

//blog route

//Router.route('/tony_amakpa_blog/:slug' , {
//  name : 'showBlog',
 // template : 'blogShow',
 // layoutTemplate : 'blogLayout'
//});
