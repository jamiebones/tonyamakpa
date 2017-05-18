

Template.home.onCreated(function(){
	let template = Template.instance();
	template.subscribe('showUpcomingEvents');
	//template.subscribe('showAllTermPaper');
	template.subscribe('allUsers');
	template.subscribe('showTodayHistory');
	//template.subscribe('showBookReview');
	template.subscribe('homepageNews');
});




Template.home.rendered = function(){
	let block_arr = $('.ticker li p').map(function(){
		return $(this).get(0);}).toArray();
	let ticker_item = $(block_arr[0]);
	$('.ticker').html(ticker_item);
	let ticker_width = $(".ticker").width();
	let text_x = ticker_width;

	scroll_ticker = function(){
		text_x--;
		ticker_item.css("left" , text_x);
		if (text_x < -1 * ticker_item.width()){
			ticker_item = $(block_arr[(block_arr.indexOf(ticker_item.get(0)) + 1
            == block_arr.length) ? 0 :
            block_arr.indexOf(ticker_item.get(0)) + 1]);
            ticker_item.css("left" , text_x);
            $(".ticker").html(ticker_item);
            text_x = ticker_width;
		}
	}
	Tracker.autorun(function () {
		setInterval(scroll_ticker , 10);
	});

};



//Template.scholars.onCreated(function(){
//	let template = Template.instance();
//	template.subscribe('showAllTermPaper');
//	template.subscribe('allUsers');
//});


Template.home.events({
	"mouseenter .tickerNews": function(evt, template){
		evt.preventDefault();

	},
	"mouseleave .tickerNews" : function(evt , template){
		evt.preventDefault();
	}
});





Template.home.helpers({
	showEvents: function () {
		return School_Events.find({} , {sort:{"event_date" : 1}}).fetch();
	},

	todayHistory : function(){
		let todayDate = Module.both.todayDate();
        return History_Today.find({"date" : todayDate}).fetch();
	},
	//bookReview : function(){
	//	let arr = [];

	//	Book_Review.find({} , {sort : {"book_title" : 1}}).fetch().map(function(book){
	//			debugger
	//		let reviewArr = [];
	//	    let obj = {};
	//	    let count = 0;
	//		_.each(book.reviewers , function(review) {
	//			if (review.userId){
	//				count += 1;
		//			let userId = review.userId;
		//		    let user = Meteor.users.findOne(userId);
		//		    let profile = {profile : user.profile}
		//		    _.extend(review , profile);
		//		   reviewArr.push(review);
		//		}
			//	else{
			//			debugger
			//		if (review.name && review.regNum){
		//				reviewArr.push(review);
		//				count += 1;
			///		}
		//		}
		//	});
		//	obj.bookTitle = book.book_title;
		//	obj.bookUrl = book.book_image;
		//	obj.review = reviewArr;
			//obj.reviewCount = count
		//	arr.push(obj);

	///	/});
	//	return arr
//	},
	homepageNews : function(){
		//console.log(News.find({}).fetch())
		return News.find({}).fetch();
	}
})



//Template.scholars.helpers({
//	rankTermPaper : function(){
//		let arr = [];
//		debugger;
//		TermPaper.find({} , {sort :{"date_created" : -1}}).fetch().map(function(paper){
//			let object = {};
//			let score = [];
	//		if (paper.submiter){
//				   const submitterArray = _.filter(paper.submiter , function(submiter){
//						   if (submiter.score){
//								  return submiter
//							 }
//					 });
//						if (submitterArray.length > 0){
	//					   	 submitterArray.sort(function(a , b){
//						  	 return parseInt(b.score - a.score);
//					    	});

							 //remove score object that has no mark associated with it
//								_.each(submitterArray, function(student){
//								 if (student.score){
									 //extend the student object add a profile to it
//									 if (student.userId){
//										 let userId = student.userId;
//											 let user = Meteor.users.findOne(userId);
//											 let profile = {profile : user.profile}
//											 _.extend(student , profile)
//											 score.push(student);
//									 }
//
//								 }
//							 });
//                //place the object stuffs here
//								object.paper = paper.paper_name;
//								//here's is where am going to apply the function to grade the marks into first second and third
//								let result = {};
//								let rank = ['first' , 'second' , 'third'];
//						  	rank.forEach(groupScore(score , result));
//								object.paper = paper.paper_name;
//								object.rank = result;
//								arr.push(object);
//						}

//
//			}
//		});
//		return arr;
	//},
//});


function groupScore(items , object){
	let last = items[0].score;
	j = 0;
	return function(k){
		object[k] = object[k] || [];
		while (j < items.length && items[j].score === last){
			object[k].push(items[j]);
			j++;
		}
		if (j < items.length){
			last = items[j].score;
		}
	}
}
