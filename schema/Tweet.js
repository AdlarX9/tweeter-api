const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
	tweet: { type: String, required: true },
	username: { type: String, required: true }
});

module.exports = mongoose.model('Tweet', tweetSchema);