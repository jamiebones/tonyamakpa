
Module.both.rankScore = function(items , object){
	let last = items[0].score;
	j = 0;
	return function(k){
		object[k] = object[k] || [];
		while (j < items.length && items[j].score === last){
			object[k].push(items[j]);
			j++;
		}
		last = items[j].score;
	}


}

