const { ResultWithContext } = require('express-validator/src/chain');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_KEY;

const validateJWT = (req, res, next) => {
	const token = req.header('x-token');
	//console.log('token: ', token);

	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: 'No authorization token',
		});
	}
	try {
		const { uid } = jwt.verify(token, secret);
		req.uid = uid;
		next();
	} catch (error) {
		res.status(401).json({
			ok: false,
			msg: 'Invalid token',
		});
	}
};

module.exports = { validateJWT };
