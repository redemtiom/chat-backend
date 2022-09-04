const jwt = require('jsonwebtoken');
const secret = process.env.JWT_KEY;

const generateJWT = (uid) => {
	return new Promise((resolve, reject) => {
		const payload = { uid };
		jwt.sign(
			payload,
			secret,
			{
				expiresIn: '24h',
			},
			(err, token) => {
				if (err) {
					//! No se puedo crear el token
                    reject('It can generated the JWT')
				} else {
					//* se puedo se logro wiiii
                    resolve(token)
				}
			}
		);
	});
};

module.exports = {
	generateJWT,
};
