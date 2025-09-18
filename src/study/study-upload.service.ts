import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as FormData from 'form-data';
import { createReadStream } from 'fs';

@Injectable()
export class StudyUploadService {
  private readonly logger = new Logger(StudyUploadService.name);

  private getEndpoint(studyOrthancId: string | number) {
    const base = process.env.REPLY_PDF_ENDPOINT || 'http://75.119.148.56:5000/api/studies';
    return `${base}/${studyOrthancId}/reply`;
  }

  async sendPdf(studyOrthancId: string | number, filePath: string, originalFileName: string) {
    try {
      const endpoint = this.getEndpoint(studyOrthancId);
      const form = new FormData();
      form.append('file', createReadStream(filePath), {
        filename: originalFileName,
        contentType: 'application/pdf'
      });

      this.logger.log(`Uploading PDF for study ${studyOrthancId} to ${endpoint}`);

      const res = await axios.post(endpoint, form, {
        headers: {
          ...form.getHeaders(),
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
        timeout: 20000,
      });

      this.logger.log(`Upload success (status ${res.status}) for study ${studyOrthancId}`);
      return { ok: true, status: res.status, data: res.data };
    } catch (error: any) {
      this.logger.error(`Upload failed for study ${studyOrthancId}: ${error.message}`);
      return { ok: false, error: error.message };
    }
  }
}
