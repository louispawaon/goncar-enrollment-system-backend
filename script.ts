import * as express from 'express';
import {PrismaClient} from '@prisma/client';

const app = express();
app.use(express.json());

const router = require('express').Router();
const prisma = new PrismaClient();

app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)