var pg = require('pg');
var connectionString="postgres://ubuntu:testPassword@localhost:5432/bad_habit";
var bcrypt = require('bcrypt');

var superSecret="TheSuperSecret";

function _handleError(err,client,done){
	if(!err) return false;
   if(client){
     done(client);
   }
   return true;
}

var UserModel = {
	create: function(userObj,callback){
		if(!userObj.password || !userObj.email) return callback({success:false,data:"Malformed user object"});
		bcrypt.genSalt(10, function(err, salt) {
		    bcrypt.hash(userObj.password, salt, function(err, hash) {
					userObj.password = hash;
						pg.connect(connectionString, function(err, client, done) {
				      if (_handleError(err,client,done)) {
				      	console.log("Error in PG Connection -New User",err);
				      	callback(err,null);
				      	return done();
				      }
				      client.query("INSERT INTO users(email, password) values($1, $2) returning email,id", [userObj.email, userObj.password],function(err,result){
				      	if (_handleError(err,client,done)){
				      		console.log("Error in PG Query - `",err);
				      		callback(err,null);
				      		return done();
				      	}
				      	done();
				      	return callback(null,result.rows[0]);
				      });
						});
		    });
		});
	},
	update: function(userObj,newEmail,callback) {
		pg.connect(connectionString, function(err, client, done) {
      if (_handleError(err,client,done)) {
      	console.log("Error in PG Connection - Update User",err);
      	callback(err,null);
      	return done();
      }
      client.query("UPDATE users SET email=($1) where id=($2) returning email,id", [newEmail, userObj.id],function(err,result){
      	if (_handleError(err,client,done)){
      		console.log("Error in PG Query - Update User",err);
      		callback(err,null);
      		return done();
      	}
      	if(!result){
      		console.log("PROBLEM")
      		callback("There was a problem");
      		return done();
      	}
      	callback(null,result.rows[0]);
      	return done();
      });
		});
	},
	delete: function(userObj,callback) {
		pg.connect(connectionString, function(err, client, done) {
	    if (_handleError(err,client,done)) {
	    	console.log("Error in PG Connection - Delete User",err);
	    	callback(err,null);
	    	return done();
	    }
	    client.query("DELETE FROM users WHERE id=($1) returning email,id", [userObj.id],function(err,result){
	    	if (_handleError(err,client,done)){
	    		console.log("Error in PG Query - Delete User",err);
	    		callback(err,null);
	    		return done();
	    	}
	    	callback(null,result.rows[0]);
	    	return done();
	    });
		});
	},
	get: function(userObj,callback){
		pg.connect(connectionString, function(err, client, done) {
	    if (_handleError(err,client,done)) {
	    	console.log("Error in PG Connection - Get User",err);
	    	return callback(err,null);
	    }
	    client.query("SELECT * FROM users WHERE email=($1)", [userObj.email],function(err,result){
	    	if (_handleError(err,client,done)){
	    		console.log("Error in PG Query - Get User",err);
	    		return callback(err,null);
	    	}
	    	done();
	    	var user = result.rows[0];
	    	if(user){
		    	user.authenticate = function (pwd,cb) {
																var password = this.password
																console.log("PWD",password)
																bcrypt.compare(pwd, password, function(err, res) {
																	if(err) return cb(err);
																	cb(null,res);
																});
															};
		    	return callback(null,user);
	    	}
	    	return callback({success:false,data:"Couldn't locate user with that info"},null);
	    });
		});
	}
}

module.exports = UserModel;
