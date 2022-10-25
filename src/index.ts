/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Express } from 'express';
import dotenv from 'dotenv';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import router from './routes/index';

// eslint-disable-next-line no-var, no-underscore-dangle
global.__basedir = __dirname;

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app: Express = express();
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cors());

const port = process.env.PORT || 5000;

app.use(router);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

export default app;
