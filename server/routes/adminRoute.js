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
import authJWT from '../utils/authJWT.js'

const router = express.Router()

router.post('/login', login)
router.post('/register', register)
router.patch('/changePassword', authJWT, changePassword)
router.put('/changePassword', authJWT, changePassword)
router.post('/logout', logout)
router.post('/refreshToken', refresh_token)
router.post('/forgotPassword', forgotPassword)
router.get('/verifyEmail/:token', verifyEmail)
router.delete('/id/:id', authJWT, deleteAdmin)

export default router
