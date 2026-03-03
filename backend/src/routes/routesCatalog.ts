import express from "express";
const api = express.Router();

import CatalogController  from "../controllers/catalog.cont";

api.get('/getAllCatalog', CatalogController.getAllCatalog);
api.get('/getProducts', CatalogController.getProducts);
api.get('/getServices', CatalogController.getServices);

export { api as routeBackendCatalog };