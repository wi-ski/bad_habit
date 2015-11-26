
// var ReplayHandler = require('./replay/replayController.js');
// var roomsController = require('./rooms/roomsController.js');
var NmcBlock = require('./modules/nmc_model.js')

module.exports = function (router) { //might refactor to use _id
	// router.get('/api/rooms', roomsController.getRooms);
	// router.post('/api/rooms', roomsController.saveRoom);
	
	// router.get('/api/replays',ReplayHandler.getAllReplays);
	// router.get('/api/replays/:owner/:title',ReplayHandler.getOneReplay);
	// router.post('/api/replays',ReplayHandler.insertReplay);
	// router.delete('/api/replays',ReplayHandler.deleteReplay);
	// router.put('/api/replays/:owner/:title',ReplayHandler.updateReplayTitle); //this is totes assuming you can update the coords or owner. So if they wanna do that [other stuff], make a new replay. derp.

	// router.get("nmc/entry/",function ( req,res ) {
	// })
	console.log("OPEN ROUTER ROUTES LOADED")
	router.get("/nmc/entry/name/:val",function ( req,res ) {
		var entry = NmcBlock.find({name:req.params.val},function (err,MongoDocument) {
			if(err){
				return console.log("Error - name GET request",err);
			}
			res.send(MongoDocument);
		});

	})

	router.get("/nmc/entry/txid/:val",function ( req,res ) {
		console.log("IN TRANSACTION ROUTE")
		var entry = NmcBlock.find({txid:req.params.val},function (err,MongoDocument) {
			if(err){
				return console.log("Error - txid GET request",err);
			}
			res.send(MongoDocument);
		});
	})

	router.get("/nmc/entry/address/:val",function ( req,res ) {
		var entry = NmcBlock.find({address:req.params.val},function (err,MongoDocument) {
			if(err){
				return console.log("Error - address GET request",err);
			}
			res.send(MongoDocument);
		});
	})

	router.get("/nmc/entry/height/:val",function ( req,res ) {
		var entry = NmcBlock.find({height:req.params.val},function (err,MongoDocument) {
			if(err){
				return console.log("Error - height GET request",err);
			}
			res.send(MongoDocument);
		});
	})

	router.get("/nmc/entry/expires_in/:val",function ( req,res ) {
		var entry = NmcBlock.find({expires_in:req.params.val},function (err,MongoDocument) {
			if(err){
				return console.log("Error - expires_in GET request",err);
			}
			res.send(MongoDocument);
		});
	})










}

