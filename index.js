import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import goncarBackendRoute from './server/routes/goncarBackendRoute.js';

dotenv.config();

const app = express();

app.use(cors);
app.use(express.json());
app.use(goncarBackendRoute);

app.listen(process.env.BACKEND_PORT||3000,  () =>
  console.log('Server Running'),
)