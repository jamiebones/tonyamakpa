
let _getLastDateOfSubmit = (template)=>{
    
}

let _getTimeRemaining = (endtime , template) => {
	    let t = Date.parse(endtime) - Session.get('time');
			let seconds = ("0" + Math.floor((t/1000) % 60)).slice(-2);
			let minutes = ("0" + Math.floor((t/1000/60) % 60)).slice(-2);
			let hours =   ("0" + Math.floor((t/(1000 * 60 * 60)) % 24)).slice(-2);
			let days = Math.floor(t/(1000*60*60*24));

			if (t <= 0){
				//if timer has counted to zero here i'm going to make the paper inactive
				//by updating the termpaper collection
				let termPaperId = Session.get("termPaperId");
				Meteor.call('updateTermPaperStatus' , termPaperId , false , function(err , result){
					//	if (result){
						//	alert(result);
					//	}
				});
				clearInterval(timeInterval);
			}

			return {
				'total' : t,
				'days'  : days,
				'hours' : hours,
				'minutes': minutes,
				'seconds' : seconds
			}
}

export default function(endtime , template){
  return _getTimeRemaining(endtime , template)
}
