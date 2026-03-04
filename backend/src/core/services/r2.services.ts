import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import crypto from "crypto";
import moment from 'moment';
export class R2Service {
    private client: S3Client;
    private bucket: string;
    private publicUrl: string;
    constructor() {
        this.bucket = process.env.R2_BUCKET_NAME!;
        this.publicUrl = process.env.R2_PUBLIC_URL!;
    
        this.client = new S3Client({
          region: 'auto',
          endpoint: process.env.R2_ENDPOINT!,
          credentials: {
            accessKeyId: process.env.R2_ACCESS_KEY_ID!,
            secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!
          }
        });
    }
    async uploadPdf(buffer: Buffer): Promise<string> {
        const hash = crypto.randomUUID();
        const key = `${hash}.pdf`;
        await this.client.send(new PutObjectCommand({
          Bucket: this.bucket,
          Key: key,
          Body: buffer,
          ContentType: 'application/pdf',
          CacheControl: 'public, max-age=31536000'
        }));
    
        // Retorna URL pública directa del bucket R2
        return `${this.publicUrl}/${key}`;
      }
}