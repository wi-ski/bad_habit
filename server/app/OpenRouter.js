
// var ReplayHandler = require('./replay/replayController.js');
// var roomsController = require('./rooms/roomsController.js');
var NmcBlock = require('./modules/nmc_model.js');
// var BlockData = require('../worker/modules/nmc_crawl.js');
// BlockData = new BlockData().getBlockChainInfo(); //<-- might use to get the height of the block chain and return the last 20? We shall see
var jwt = require('jsonwebtoken');

var User = require('../pg/userModel.js');


function validateEmail(email) {
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}

function _badRequest(data,errObj){
	console.log(data,errObj);
	return {success:false,data:data}
}

function _goodRequest(data){
	return {success:true,data:data}
}

module.exports = function (router) { //might refactor to use _id(mongo atm)
	console.log("=-=-=-=-=-=-=-=OPEN ROUTER ROUTES LOADED=-=-=-=-=-=-=-=")
	router.get("/nmc/entry/latest/",function ( req,res ) { //should return the last 20 entries
		var searchObj = {};
		searchObj[req.params.attr]=req.params.val;
		NmcBlock.find().limit(20).exec(function (err,MongoDocument) { //<- NOT ideal, would like to use the block height to find some number of entries
			if(err) return res.send.status(404).send(_badRequest("Error - name GET request",err));

			res.send(_goodRequest(MongoDocument));
		});
	});

	router.get("/nmc/entry/:attr/:val",function ( req,res ) {
		var searchObj = {};
		searchObj[req.params.attr]=req.params.val;

		NmcBlock.find(searchObj,function (err,MongoDocument) {
			if(err) return res.send.status(404).send(_badRequest("Error - " + req.params.attr + "GET request for : " + req.params.val,err));
			res.send(_goodRequest(MongoDocument));
		});
	});

	router.post("/login",function ( req,res ) {
		if(!req.body.email || !req.body.password) return res.status(404).send(_badRequest("Email or password not provided"));

		User.get(req.body,function(err,UserObj){
			if(err) return res.status(404).send(_badRequest("Something went wrong, check email and password"));

			UserObj.authenticate(req.body.password,function(err,resp){
				if(err || !resp) return res.status(404).send(_badRequest("Something went wrong, check email and password"));

				var token = jwt.sign({email:UserObj.email}, "TheSuperSecretPassword", {expiresIn: 120 });
				return res.send(_goodRequest(token));
			});
		});
	});

	router.post("/user",function ( req,res ) {
		if(!req.body.email || !validateEmail(req.body.email)) return res.status(404).send(_badRequest("Need valid email"));
		if(!req.body.password || !req.body.passwordConfirm ) return res.status(404).send(_badRequest("Provide passwords"));
		if(req.body.password !== req.body.passwordConfirm) return res.status(404).send(_badRequest("Passwords do not match"));
		
		User.create(req.body,function(err,result){
			if(err) return res.status(404).send(_badRequest("Something went wrong, its possible that email is associated with an existing account"));
			return res.send(_goodRequest(result));
		});
	});
}

