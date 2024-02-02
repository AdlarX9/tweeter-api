const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
	try {
		const token = req.body.token.split('').filter(char => char !== '"').join('');
		const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
		const username = decodedToken.username;
		req.auth = {
			username: username
		};
		next();
	} catch(error) {
		res.status(401).json({ error });
	}
};