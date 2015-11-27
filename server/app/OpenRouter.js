
// var ReplayHandler = require('./replay/replayController.js');
// var roomsController = require('./rooms/roomsController.js');
var NmcBlock = require('./modules/nmc_model.js');
// var BlockData = require('../worker/modules/nmc_crawl.js');
// BlockData = new BlockData().getBlockChainInfo(); //<-- might use to get the height of the block chain and return the last 20? We shall see

var User = require('../pg/userModel.js');

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





	router.post("/logout",function ( req,res ) {
		//destroy session token
	});

	router.post("/login",function ( req,res ) {
		User.get(req.body,function(err,UserObj){
			if(err) return res.send({success:false,data:"Something went wrong, check email and password"},404)
			UserObj.authenticate(req.body.password,function(err,resp){
				if(err) return res.send({success:false,data:"Something went wrong, this might be our fault"})
					if(!resp) return res.send({success:false,data:"Something went wrong, check email and password"},404)
					res.send("SUCCESS");


			});
		});
	});

	router.post("/user",function ( req,res ) {
		console.log("CREATING USER",req.body);
		User.create(req.body,function(err,result){
			if(err) return res.send({success:false,data:"Something went wrong, its possible that email already has an account"},404);
			return res.send({success:true,data:result});
		});
		//User.create, if err (malformed or exists) send 404;
		//else send new user back; Someday do email verification.
	});

	router.put("/user",function ( req,res ) {
		console.log("UPDATING USER",req.body);
		User.update(req.body.user,req.body.newEmail,function(err,result){
			if(err) return res.send("Something went wrong",404);
			return res.send({success:true,data:result});
		});
	});

}

