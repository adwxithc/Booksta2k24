import 'dotenv/config'

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler from '../../usecase/handler/errorHandler';

export const app = express();

app.use(cookieParser());

app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))

app.use(cors({credentials: true}))

app.use(morgan('combined'));


// Use error handler
app.use(errorHandler);