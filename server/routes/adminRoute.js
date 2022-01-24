import express from 'express'
import {
  login,
  register,
  changePassword,
  logout,
  logoutAllSessions,
  refresh_token,
  forgotPassword,
  verifyEmail,
  deleteAdmin,
  resetPassword,
  getUsersByToken,
} from '../controllers/adminController.js'
import {
  LoginSchema,
  VerifyEmailSchema,
  RegisterSchema,
  DeleteSchema,
  ForgotPasswordSchema,
  ChangePasswordSchema,
  ResetPasswordSchema,
  GetUsersByTokenSchema,
} from '../schemas/validationSchema.js'
import authJWT from '../utils/authJWT.js'
import validateSchema from '../utils/validateSchema.js'

const router = express.Router()

router.post('/login', validateSchema(LoginSchema), login)
router.post('/register', validateSchema(RegisterSchema), register)
router.delete('/logout', logout)
router.delete('/logoutAllSessions', logoutAllSessions)
router.get(
  '/getUsersByToken/:token',
  validateSchema(GetUsersByTokenSchema, 'params'),
  getUsersByToken
)
router.post('/refreshToken', refresh_token)
router.patch(
  '/resetPassword',
  validateSchema(ResetPasswordSchema),
  resetPassword
)
router.put('/resetPassword', validateSchema(ResetPasswordSchema), resetPassword)
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
