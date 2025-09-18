import { Injectable } from '@nestjs/common';
import * as pdf from 'html-pdf';

@Injectable()
export class PdfService {
  async generatePdfFromHtml(htmlContent: string): Promise<Buffer> {
    const options: pdf.CreateOptions = {
      format: 'A4',
      border: {
        top: '10mm',
        right: '10mm',
        bottom: '10mm',
        left: '10mm',
      },
      // Allow user to supply PHANTOM_PATH via env if bundled PhantomJS missing
      phantomPath: process.env.PHANTOM_PATH,
    };

    return new Promise((resolve, reject) => {
      pdf.create(htmlContent, options).toBuffer((err, buffer) => {
        if (err) return reject(err);
        resolve(buffer);
      });
    });
  }
}
