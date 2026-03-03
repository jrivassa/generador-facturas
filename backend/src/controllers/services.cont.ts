import { Request, Response } from "express";
import { CalculationService } from "../core/services/calculation.service";
import { createInvoiceSchema } from "../core/utils/validation";
class ServicesController {
    public calculate(req: Request, res: Response) {        
        const result = createInvoiceSchema.safeParse(req.body);        
        if (!result.success) {
            res.status(400).json({
              success: false,
              errors: result.error.issues.map(e => ({ path: e.path.join('.'), message: e.message }))
            });
            return;
        }
        const calculation = new CalculationService();
        res.status(200).json(calculation.calculate(result.data.items));
    }
}

export default new ServicesController();