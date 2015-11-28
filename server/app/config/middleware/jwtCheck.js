var jwt = require("jsonwebtoken");


module.exports = function(req,res,next){
	if(!req.body.token) return res.status(404).send({success:false,data:"No token provided"});
	jwt.verify(req.body.token,"TheSuperSecretPassword",function(err,result){
		if(err || !result) return res.status(404).send({success:false,data:"Error processing your request, it's possible your token has expired"});
		next();
	});
}