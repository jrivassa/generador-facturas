import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { routeBackend } from '../routes/routesCatalog';

const app = express();
app.use(cors());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api',[
    routeBackend
  ]);
  
export default app;