const sequelizeDb = require('../../models/sequelize')
const Customer = sequelizeDb.Customer
const Op = sequelizeDb.Sequelize.Op

exports.create = async (req, res, next) => {
	try {
		const data = await Customer.create(req.body)

		await req.redisClient.publish(
			'new-customer',
			JSON.stringify(data)
		)

		res.status(200).send(data)
	} catch (err) {
		if (err.name === 'SequelizeValidationError') {
			err.statusCode = 422
		}
		next(err)
	}
}