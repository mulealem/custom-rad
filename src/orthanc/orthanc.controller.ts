import { Body, Controller, Post } from '@nestjs/common';
import { OrthancService } from './orthanc.service';

@Controller('orthanc')
export class OrthancController {
  constructor(private readonly orthancService: OrthancService) {}
  @Post('extract')
  extract(@Body() study: any) {
    return this.orthancService.extract(study);
  }
}
