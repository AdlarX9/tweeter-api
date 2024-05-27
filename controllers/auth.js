const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../schema/User');


exports.logged = (req, res, next) => {
	try {
		const token = req.body.token.split('').filter(char => char !== '"').join('');
		const decodedToken = jwt.verify(token, process.env.TOKEN);
		const username = decodedToken.username;
		User.findOne({ username: username })
		.then(user => {
			if (user) {
				res.status(200).json({ message: 'loggé' });
			} else {
				res.status(200).json({ message: null });
			}
		})
		.catch(error => {
			res.status(200).json({ error });
		});
	} catch (error) {
		res.status(200).json({ message: null });
	}
}




exports.login = (req, res, next) => {

	User.findOne({username: req.body.username})

	  .then(user => {

		if (user === null) res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte'})
		else {
			bcrypt.compare(req.body.password, user.password)
			  .then(valid => {

				if (!valid) res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte'});
				else {
					res.status(200).json({
						username: user.username,
						token: jwt.sign(
							{ username: user.username },
							process.env.TOKEN,
							{ expiresIn: '24h' }
						)
					});
				}

			})
			  .catch(error => res.status(500).json({error}));
		}

	  })
	  .catch(error => res.status(500).json({error}));
};




exports.signup = (req, res, next) => {

	bcrypt.hash(req.body.password, 10)
	  .then(hash => {
		const user = new User({
			username: req.body.username,
			password: hash
		});

		user.save()
		  .then(() => {
			User.findOne({username: req.body.username})
				.then((user) => {
					res.status(201).json({
						username: user.username,
						token: jwt.sign(
							{ username: user.username },
							process.env.TOKEN,
							{ expiresIn: '24h' }
						)
					});
			    })
				.catch(error => res.status(500).json(error));
		    })
		  .catch(() => res.status(401).json({message: 'Username déjà pris'}));

	  })
	  .catch(error => res.status(500).json({error}));
};