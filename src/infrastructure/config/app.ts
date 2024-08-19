import 'dotenv/config'

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler from '../../usecase/handler/errorHandler';
import postRouter from '../routes/postRoute';

export const app = express();

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))

app.use(cors({origin: "*"}))

app.use(morgan('dev'));

app.use("/api", postRouter);

// Use error handler
app.use(errorHandler);