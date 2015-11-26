var exec = require('child_process').exec

function Crawl () {

	this._cmd = function (cmd, callback) {
		exec("/home/ubuntu/bad_habit/namecoin-core/src/namecoin-cli " + cmd, callback);
	},

	this.getBlockChainInfo = function () {
		var self = this;
		return new Promise(function(resolve,reject){
			self._cmd("getblockchaininfo",function(error,stdout,stderr){
				if(error) {
					reject(error);
				}
				if(stderr){
					reject(stderr);
				}
				resolve(stdout);
			});
		});
	},

	this.name_scan = function (name,count) {
		var name = "'"+ name + "'" || "''";
		var count = count || 1;
		var self = this;
		return new Promise(function(resolve,reject){
			self._cmd("name_scan " + name + " " + count ,function(error,stdout,stderr){
				if(error) {
					reject(error);
				}
				if(stderr){
					reject(stderr);
				}
				resolve(stdout);
			});
		});
	}
}

module.exports = Crawl;