import Joi from 'joi';

export const RegisterSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).lowercase().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  email: Joi.string().email().lowercase().required(),
});

export const DeleteSchema = Joi.object({
  id: Joi.string(),
});
