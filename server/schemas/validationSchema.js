import Joi from 'joi'

export const RegisterSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/u).required(),
  username: Joi.string().alphanum().min(3).max(30).lowercase().required(),
})

export const DeleteSchema = Joi.object({
  id: Joi.string(),
})
