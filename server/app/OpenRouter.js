
// var ReplayHandler = require('./replay/replayController.js');
// var roomsController = require('./rooms/roomsController.js');
var NmcBlock = require('./modules/nmc_model.js');

var BlockData = require('../worker/modules/nmc_crawl.js');

// BlockData = new BlockData().getBlockChainInfo(); //<-- might use to get the height of the block chain and return the last 20? We shall see

module.exports = function (router) { //might refactor to use _id
	console.log("=-=-=-=-=-=-=-=OPEN ROUTER ROUTES LOADED=-=-=-=-=-=-=-=")
	router.get("/nmc/entry/latest/",function ( req,res ) { //should return the last 20 entries
		NmcBlock.find().limit(20).exec(function (err,MongoDocument) { //<- NOT ideal, would like to use the block height to find some number of entries
			if(err){
				res.send("Bad query",404);
				return console.log("Error - name GET request",err);
			}
			res.send(MongoDocument);
		});
	});

	router.get("/nmc/entry/name/:val",function ( req,res ) {
		NmcBlock.find({name:req.params.val},function (err,MongoDocument) {
			if(err){
				res.send("Bad query",404);
				return console.log("Error - name GET request",err);
			}
			res.send(MongoDocument);
		});
	});

	router.get("/nmc/entry/txid/:val",function ( req,res ) {
		NmcBlock.find({txid:req.params.val},function (err,MongoDocument) {
			if(err){
				res.send("Bad query",404);
				return console.log("Error - txid GET request",err);
			}
			res.send(MongoDocument);
		});
	});

	router.get("/nmc/entry/address/:val",function ( req,res ) {
		NmcBlock.find({address:req.params.val},function (err,MongoDocument) {
			if(err){
				res.send("Bad query",404);
				return console.log("Error - address GET request",err);
			}
			res.send(MongoDocument);
		});
	});

	router.get("/nmc/entry/height/:val",function ( req,res ) {
		NmcBlock.find({height:req.params.val},function (err,MongoDocument) {
			if(err){
				res.send("Bad query",404);
				return console.log("Error - height GET request",err);
			}
			res.send(MongoDocument);
		});
	});

	router.get("/nmc/entry/expires_in/:val",function ( req,res ) {
		NmcBlock.find({expires_in:req.params.val},function (err,MongoDocument) {
			if(err){
				res.send("Bad query",404);
				return console.log("Error - expires_in GET request",err);
			}
			res.send(MongoDocument);
		});
	});
}

