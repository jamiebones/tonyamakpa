Template.registerHelper('count' , function(arr){
	if (arr instanceof Array){
		return arr.length
	}
	else{
		return arr
	}

})


Template.registerHelper('first' , function(index){
	if (index == 0) {
		return 'active'
	}
});


Template.registerHelper('addZero' , function(number){
	return '0' + (number);
});


Template.registerHelper('startYear', function(){
    	var yearArr = [];
    	var yearDate = new Date();
    	var yearEnd = yearDate.getFullYear();
    	for (var i = 1980; i <= yearEnd; i++){
    		yearArr.push(i);
    	}

    	return yearArr;
    }),

Template.registerHelper('endYear' , function(){
    	var yearArr = [];
    	var yearDate = new Date();
    	var yearEnd = yearDate.getFullYear();
    	for (var i = 1980; i <= yearEnd; i++){
    		yearArr.push(i);
    	}
    	return yearArr;
    });



Template.registerHelper('userTitle' , function(){
	var title = [];
	title.push('Mrs');
	title.push('Prof');
	title.push('Prof(Mrs)');
	title.push('Dr(Mrs)');
	title.push('Arch');
	title.push('Arch(Mrs)');
	title.push('Engr');
	title.push('Engr(Mrs)');
	return title;
});

Template.registerHelper('formatDate' , function(date){
	 if(date){
	 		return moment(date).format('MM/DD/YYYY');
	 }
});

Template.registerHelper('shortWord' , function(word){
	var wordToShorten = word;
    var newWord = wordToShorten.substr(0 , 300);
	return newWord +  '----'
});

Template.registerHelper('shortExtract' , function(word){
	var wordToShorten = word;
    var newWord = wordToShorten.substr(0 , 100);
	return newWord +  '---'
});

Template.registerHelper('formatMoney' , (money)=> {
	Meteor.call('formatMoney' , money , function(error , result){
		if (result){
			return result
		}

	});
});


Template.registerHelper('getName' , (userId) => {
	let user = Meteor.users.findOne(userId);
	if (user){
		return user.profile.firstname + " " + user.profile.surname;
	}
});

Template.registerHelper('formatDate2' , function(date){
	 if(date){
	 	return moment(date).startOf('second').fromNow();
	 }
});


Template.registerHelper('formatChatMessage' , (userId) => {
	if (userId === Meteor.userId()){
		 return 'pull-right'
	}
	return 'pull-left'
});

Template.registerHelper('colorChat' , (userId) => {
	if (userId === Meteor.userId()){
		 return 'text-success'
	}
	return ''
});

Template.registerHelper('showIndex' , (index) => {
	return (index + 1)
});

Template.registerHelper('showStatus', (status)=> {
	if (status){
		return 'success'
	}
	else{
		return 'danger'
	}
});

Template.registerHelper('isCurrentUser', ( currentUser ) => {
  return currentUser === Meteor.userId() ? true : false;
});

Template.registerHelper('disableIfAdmin', ( userId ) => {
  if ( Meteor.userId() === userId ) {
    return Roles.userIsInRole( userId, 'admin') ? "disabled" : "";
  }
});

Template.registerHelper('selected', ( v1, v2 ) => {
  return v1 === v2 ? true : false;
});


Template.registerHelper('displayTodayDate' , () => {
	let todayDate  = new Date();
	let monthArray = ['January' , 'February' , 'March', 'April' , 'May' , 'June', 'July' , 'August' , 'September' ,'October','November', 'December']
	let dayArray = ['Sunday' , 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday', 'Friday' , 'Saturday'];
	let date = todayDate.getDate();
	let month = todayDate.getMonth();
	let year = todayDate.getFullYear();
	let day = todayDate.getDay();

	let theDate = dayArray[day]  + ' ' + date + ' ' + monthArray[month] + ' ' + year;

	return theDate;

});

Template.registerHelper('compareDate' , (compDate) => {
	let newDate = new Date();
	Meteor.call("getCurrentTime" , function(error , result) {
		Session.set("currentTime" , result);
	});
	let todayDate = Session.get("currentTime");
	let remainingDate = Date.parse(compDate) - todayDate

	if (remainingDate <= 0){
		 return false;
	}
	else{
		return true;
	}
});


Template.registerHelper('realIndex' , (index) => {
	let num = parseInt(index) + 1;
	return num;
});

Template.registerHelper('checkUser' , (userId) => {
	let compareUser = Meteor.userId();
	if (userId === compareUser){
		return true;
	}
	else{
		return false;
	}
});


Template.registerHelper('checkValue' , (value) => {
	if (value === true){
		return "Yes"
	}

	else{
		return "No"
	}
});

Template.registerHelper('checkArray' ,(value) => {
	if (value instanceof Array){
		return true
	}
	else{
		return false;
	}

});

Template.registerHelper('checkTag' , (posts) => {
	let tag = {}
	_.each(posts , function(val , ind){
		let ta = val.tags;
		_.each(ta , function(v , id){
			if (v in tag){
				tag[v] += 1;
			}
			else{
				tag[v] = 1
			}
		})
	});
	//put the key into an array of sort kind of
	let arr = []
	_.each(tag , function(val , key){
		arr.push(key + " "  +  val).toString();
	});
	return arr;
});


Template.registerHelper('removeNum' , (string) => {
	let arr = string.split(' ');
	let numToRemove = arr.length - 1;
	arr.pop(numToRemove);
	let word = arr.join(' ');
	return word;
});


Template.registerHelper('courseLevel' , (string) => {
	 let courseArray = [];
	 courseArray.push("100 Level");
	 courseArray.push("200 Level");
	 courseArray.push("300 Level");
	 courseArray.push("400 Level");
	 return courseArray;
});

Template.registerHelper('materialType' , (string) => {
	 let courseArray = [];
	 courseArray.push("Audio");
	 courseArray.push("Documents");
	 courseArray.push("Video");
	 return courseArray;
});

Template.registerHelper("amIActiveBitch", function(value){
	  if (value){
			return "Active"
		}
		return "Not Active"

});

Template.registerHelper("noShowZero", function(value){
	  if (value === 0){
			 return ''
		}
		return value;
});

Template.registerHelper("Timer", function(endTime){
	 let date = (endTime - Chronos.now())
		let seconds = ("0" + Math.floor((date/1000) % 60)).slice(-2);
		let minutes = ("0" + Math.floor((date/1000/60) % 60)).slice(-2);
		let hours =   ("0" + Math.floor((date/(1000 * 60 * 60)) % 24)).slice(-2);
		let days = Math.floor(date/(1000*60*60*24));

		if (date <= 0){
			 return "Submission Closed"
		}

		return days + " days " + hours +" hours " + minutes + " minutes " + seconds + " seconds "
});

Template.registerHelper('getTeamLeader' , (leader , regnum) => {
	let userId = Meteor.userId()
	let user = Meteor.users.findOne(userId);
	let lead = leader
	if (user && lead ){
		 return user.regnum === regnum ? true : false
	}
});

Template.registerHelper('areYouATeamLeader' , (value) => {
	if (value === true){
		return "Team Leader"
	}
	else{
		return ""
	}
});

Template.registerHelper('disableControl' , (value) => {
	if (!value){
		return "disabled"
	}
	return ""
});
