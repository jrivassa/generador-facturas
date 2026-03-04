import { Request, Response } from "express";
import { CalculationService } from "../core/services/calculation.service";
import { createInvoiceSchema } from "../core/utils/validation";
import { PdfService } from "../core/services/pdf.services";
import { R2Service } from "../core/services/r2.services";
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
    public generate(req: Request, res: Response) {
        const result = createInvoiceSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
              success: false,
              errors: result.error.errors.map(e => ({ path: e.path.join('.'), message: e.message }))
            });
            return;
          }
          const invoiceData = result.data;
          const calculation = new CalculationService();
          const calculate = calculation.calculate(invoiceData.items);
          const pdfService = new PdfService();
          const r2Service = new R2Service();          
          try{
            const pdfBuffer =  pdfService.generatePdf(invoiceData as any, calculate);
            pdfBuffer.then((data) => {
                r2Service.uploadPdf(data).then((url) => {
                    res.status(200).send([{
                        success: true,
                        data:{pdfUrl: url}
                    }]);
                });
            });
          }catch(e){
            res.status(500).json({ success: false, message: 'Error generando el PDF', error: e });
          }
    }

}

export default new ServicesController();