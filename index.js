import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import goncarBackendRoute from './server/routes/goncarBackendRoute.js';



dotenv.config();

const port = process.env.PORT||5000;
const app = express();

app.use(cors);
app.use(express.json());
app.use(goncarBackendRoute);

app.listen(port,  () =>
  console.log(`Server Running at: ${port}`),
)