var Crawl = require('./modules/nmc_crawl.js');
var NmcBlock = require('../app/modules/nmc_model.js');

var Crawler = new Crawl();

function populate(name,count){
	Crawler.name_scan(name,count).then(function(name_collection){
		var name_collection = JSON.parse(name_collection);
		for(var i = 1; i < name_collection.length; i++){
			var nmc_entry = name_collection[i];
			if(nmc_entry.name === ""){
				nmc_entry.name = "**Empty String Entry**"
			}
			var newNmcBlock = new NmcBlock(nmc_entry);
			newNmcBlock.save(function(err){
				if(err) {
					console.log(err);
					throw new Error(err);
				}
			});
		}
		if(name_collection.length < count){
			return console.log("DP POPULATING DONE, FINAL COUNT: ",name_collection.length); // TODO: Possible refactor for second call back or something
		}else{
			console.log("NEW START : ",name_collection[name_collection.length-1].name)
			return populate(name_collection[name_collection.length-1].name,21); //offset by one because we're skipping the first one
		}
	});
}

populate('',20)