import { Injectable } from '@nestjs/common';
import * as pdf from 'html-pdf';
let phantomBinary: string | undefined;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const phantom = require('phantomjs-prebuilt');
  phantomBinary = phantom.path;
} catch (_) {
  // fallback: rely on system or env PHANTOM_PATH
}

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
      phantomPath: process.env.PHANTOM_PATH || phantomBinary,
    };

    return new Promise((resolve, reject) => {
      pdf.create(htmlContent, options).toBuffer((err, buffer) => {
        if (err) return reject(err);
        resolve(buffer);
      });
    });
  }
}
