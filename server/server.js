import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import adminRoutes from './routes/adminRoute.js'
import userRoutes from './routes/usersRoute.js'

const app = express()

app.use(express.json())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(cookieParser())
app.use(helmet())
app.use('/users', userRoutes)
app.use('/admin', adminRoutes)

export default app
