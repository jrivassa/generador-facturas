import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { routeBackendCatalog } from '../routes/routesCatalog';
import { routeBackendServices } from '../routes/routesServices';

const app = express();
app.use(cors());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api',[
    routeBackendCatalog,
    routeBackendServices
  ]);
  
export default app;