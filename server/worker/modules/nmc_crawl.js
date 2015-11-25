var exec = require('child_process').exec

function Crawl () {

	this. initialize = function () {
		this.BlckChainInfo = function () {
			exec("../../../namecoin-core/src/namecoin-cli getblockchaininfo", function(error, stdout, stderr) {
				if(error) {
					return console.log("Error in nmc_crawl - BlckChainInfo",error)
				}
				console.log(stdout);
			});
		}
	}
}





var test = new Crawl();

Crawl.initialize();