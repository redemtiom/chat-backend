const mongoose = require('mongoose');
const uriDb = process.env.DB_CNN;

//* user: redemtiom
//* password: ZvxCmm6r2uoZAjQr

const dbConnection = async () => {
	try {
		await mongoose.connect(uriDb, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			//useCreateIndex: true,
		});
        console.log('Db online')
	} catch (error) {
		console.log(error);
		throw Error('Database error - pls contact with admin');
	}
};

module.exports = { dbConnection };
