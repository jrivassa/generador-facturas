import express from "express";
const api = express.Router();
import ServicesController  from "../controllers/services.cont";

api.post('/calculate', ServicesController.calculate);

export { api as routeBackendServices };