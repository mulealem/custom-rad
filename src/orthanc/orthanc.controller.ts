import { Body, Controller, Post, Req } from '@nestjs/common';
import { OrthancService } from './orthanc.service';

import { createWriteStream } from 'fs';
import { join } from 'path';

@Controller('orthanc')
export class OrthancController {
  constructor(private readonly orthancService: OrthancService) {}
  @Post('extract')
  extract(@Body() study: any) {
    return this.orthancService.extract(study);
  }

  // upload binary data (post)
  @Post('upload')
  upload(@Body() data: any) {
    return this.orthancService.upload(data);
  }

  @Post('binary')
  async uploadBinary(@Req() req: Request) {
    const fileName = `binary-${Date.now()}.bin`;
    const filePath = join(__dirname, '..', '..', 'uploads', fileName);
    const writeStream = createWriteStream(filePath);

    return new Promise((resolve, reject) => {
      console.log('Received binary data upload request');
      console.log('Uploading binary data to Orthanc:', fileName);

      const content = req.body;
      if (!content) {
        console.error('No content received in the request body');
        return reject(new Error('No content received'));
      }
    });
  }
}
