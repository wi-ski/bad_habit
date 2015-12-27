var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bad_habit', function (err) {
	if (err) throw err;
	console.log("Mongo connection established...")
});

module.exports = mongoose;
