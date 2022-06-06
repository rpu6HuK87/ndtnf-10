import * as Joi from 'joi'

const createBookSchema = Joi.object().keys({
	title: Joi.string().required(),
	description: Joi.string(),
	authors: Joi.string(),
	favorite: Joi.string(),
	fileCover: Joi.string(),
	fileName: Joi.string(),
	fileBook: Joi.string()
})

export { createBookSchema }