var mongoose = require('./mongo.js');

var nmc_block_schema = new mongoose.Schema({
  created : { type : Date, default : Date.now },
  name: {type: String,required:true},
  value: {type: String,required:true},
  txid: {type: String,required:true},
  vout: {type: String,required:true},
  address: {type: String,required:true},
  height: {type: String,required:true},
  expires_in: {type: String,required:true},
  expired: {type: String,required:true}
});

module.exports = mongoose.model('NmcBlock', nmc_block_schema);