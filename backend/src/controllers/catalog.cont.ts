import { Request, Response } from "express";
import { ALL_CATALOG, PRODUCTS, SERVICES } from "../core/data/catalog";

class CatalogController {
    public getAllCatalog(req: Request, res: Response) {
        res.status(200).json(ALL_CATALOG);
    }

    public getProducts(req: Request, res: Response) {
        res.status(200).json(PRODUCTS);
    }

    public getServices(req: Request, res: Response) {
        res.status(200).json(SERVICES);
    }
}

export default new CatalogController();