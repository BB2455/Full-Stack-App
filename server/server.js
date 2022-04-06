import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import adminRoutes from './routes/adminRoute.js'
import userRoutes from './routes/usersRoute.js'

const app = express()

app.use(express.json())
app.use(cors({credentials: true, origin: process.env.BASE_URL}))
app.use(cookieParser())
app.use(helmet())
app.use('/users', userRoutes)
app.use('/admin', adminRoutes)

export default app
