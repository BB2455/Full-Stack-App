import express from 'express'
import {
  login,
  register,
  changePassword,
  logout,
  refresh_token,
  forgotPassword,
  verifyEmail,
  deleteAdmin,
} from '../controllers/adminController.js'
import {
  LoginSchema,
  VerifyEmailSchema,
  RegisterSchema,
  DeleteSchema,
  ForgotPasswordSchema,
  ChangePasswordSchema,
} from '../schemas/validationSchema.js'
import authJWT from '../utils/authJWT.js'
import validateSchema from '../utils/validateSchema.js'

const router = express.Router()

router.post('/login', validateSchema(LoginSchema), login)
router.post('/register', validateSchema(RegisterSchema), register)
router.delete('/logout', logout)
router.post('/refreshToken', refresh_token)
router.patch(
  '/changePassword',
  authJWT,
  validateSchema(ChangePasswordSchema),
  changePassword
)
router.put(
  '/changePassword',
  authJWT,
  validateSchema(ChangePasswordSchema),
  changePassword
)
router.post(
  '/forgotPassword',
  validateSchema(ForgotPasswordSchema),
  forgotPassword
)
router.patch(
  '/verifyEmail/:token',
  validateSchema(VerifyEmailSchema, 'params'),
  verifyEmail
)
router.put(
  '/verifyEmail/:token',
  validateSchema(VerifyEmailSchema, 'params'),
  verifyEmail
)
router.delete(
  '/id/:id',
  authJWT,
  validateSchema(DeleteSchema, 'params'),
  deleteAdmin
)

export default router
