import express from "express";
const api = express.Router();
import ServicesController  from "../controllers/services.cont";

api.post('/calculate', ServicesController.calculate);
api.post('/generate', ServicesController.generate);

export { api as routeBackendServices };