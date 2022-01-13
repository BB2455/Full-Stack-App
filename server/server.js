import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/usersRoute.js';
import adminRoutes from './routes/adminRoute.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);

export default app;
