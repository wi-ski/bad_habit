
// var ReplayHandler = require('./replay/replayController.js');
// var roomsController = require('./rooms/roomsController.js');
var NmcBlock = require('./modules/nmc_model.js');
// var BlockData = require('../worker/modules/nmc_crawl.js');
// BlockData = new BlockData().getBlockChainInfo(); //<-- might use to get the height of the block chain and return the last 20? We shall see

var jwt = require('jsonwebtoken');

var User = require('../pg/userModel.js');

module.exports = function (router) { //might refactor to use _id
	console.log("=-=-=-=-=-=-=-=CLOSED ROUTER ROUTES LOADED=-=-=-=-=-=-=-=");
	router.put("/user",function ( req,res ) {
		User.update(req.body.user,req.body.newEmail,function(err,result){
			if(err) return res.status(404).send({success:false,data:"Something went wrong, we could not update your account"});
			console.log("IN PUT ROUTE",result)
			return res.send({success:true,data:result});
		});
	});

	router.post("/logout",function ( req,res ) {
		return res.send({success:true,token:"Expired"}); //no actual reason for doing this atm, should just have client destroy token and be done with it.
	});
}

