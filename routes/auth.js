//* Path login api/login

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const {validateJWT} = require('../middlewares/validate-jwt')
const { createUser, login, renewToken } = require('../controllers/auth');
const router = Router();

router.post(
	'/new',
	[
		check('name', 'name is obligatory').not().isEmpty(),
		check('email', 'this isnt a valid email').isEmail(),
		check('password', 'password is obligatory').not().isEmpty(),
		validateFields,
	],
	createUser
);

router.post(
	'/',
	[
		check('email', 'email is obligatory').not().isEmpty(),
		check('password', 'password is obligatory').not().isEmpty(),
		validateFields,
	],
	login
);

router.get('/renew', validateJWT, renewToken)

module.exports = {
	router,
};
