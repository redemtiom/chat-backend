const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
	const { email, password } = req.body;

	try {
		const existEmail = await Usuario.findOne({ email });
		console.log(email, existEmail);
		if (existEmail) {
			//* this is a bad practice for secure pourposes
			return res.status(400).json({
				ok: false,
				msg: 'The email already exist',
			});
		}

		const user = Usuario(req.body);

		//* encript the password
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);

		await user.save();

		//* Generate JWT
		const token = await generateJWT(user.id);

		res.json({
			ok: true,
			//msg: 'Crear usuario!!!!',
			user,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Contact with admin',
		});
	}
};

const login = async (req, res = response) => {
	const { email, password } = req.body;
	try {
		const user = await Usuario.findOne({ email });

		if (!user) {
			//! bad security practice
			return res.status(404).json({
				ok: false,
				msg: 'Email no encontrado',
			});
		}

		//* validate password
		const validPassword = bcrypt.compareSync(password, user.password);
		if (!validPassword) {
			//! bad security practice
			return res.status(400).json({
				ok: false,
				msg: 'Password no valido',
			});
		}

		//* Generate token
		const token = await generateJWT(user.id);

		res.status(200).json({
			ok: true,
			user,
			msg: 'todo correcto con la tarea',
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Contact with admin',
		});
	}
};

const renewToken = async (req, res = response) => {

    const {uid} = req

    try {
        const user = await Usuario.findById(uid)

        if(!user){
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            })
        }

        const token = await generateJWT(user.id)

        res.status(200).json({
            ok: true,
            user,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'contact with admin'
        })
    }
};

module.exports = {
	createUser,
	login,
    renewToken, 
};
