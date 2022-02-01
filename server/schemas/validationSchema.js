import Joi from 'joi'

export const RegisterSchema = Joi.object({
  confirmPassword: Joi.ref('password'),
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/u).required(),
  username: Joi.string().alphanum().min(3).max(30).lowercase().trim().required(),
})

export const DeleteSchema = Joi.object({
  id: Joi.string(),
})

export const LoginSchema = Joi.object({
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/u).required(),
  username: Joi.string().alphanum().min(3).max(30).lowercase().trim().required(),
})

export const VerifyEmailSchema = Joi.object({
  token: Joi.string().required()
})

export const ForgotPasswordSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required()
})

export const ChangePasswordSchema = Joi.object({
  confirmPassword: Joi.ref('newPassword'),
  newPassword: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/u).required(),
  oldPassword: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/u).required()
})

export const ResetPasswordSchema = Joi.object({
  confirmPassword: Joi.ref('password'),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/u).required(),
})

export const GetUsersByTokenSchema = Joi.object({
  token: Joi.string().required(),
})
