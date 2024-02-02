const Tweet = require('../schema/Tweet');


exports.getTweet = (req, res, next) => {
	Tweet.find()
	  .then(tweets => res.status(200).json({tweets}))
	  .catch(error => res.status(500).json({error}));
}


exports.postTweet = (req, res, next) => {
	const tweet = new Tweet({
		tweet: req.body.tweet,
		username: req.auth.username
	})

	tweet.save()
	  .then(() => res.status(201).json({message: 'Tweet envoyé !'}))
	  .catch(error => res.status(500).json({error}));
}


exports.deleteTweet = (req, res, next) => {
	if (req.body.username !== req.auth.username) res.status(401).json({ message: 'pas autorisé' });
	else {
		Tweet.deleteOne({_id: req.params.id})
		.then(() => res.status(200).json({ message: 'supprimé' }))
		.catch(error => res.status(400).json({ error }));
	}
}