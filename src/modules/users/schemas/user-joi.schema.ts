import * as Joi from 'joi'

const createUserSchema = Joi.object().keys({
	email: Joi.string().required(),
	password: Joi.string().required(),
	firstName: Joi.string(),
	lastName: Joi.string()
})

export { createUserSchema }