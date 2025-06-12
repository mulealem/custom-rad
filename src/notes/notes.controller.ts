import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UsePipes,
  ValidationPipe,
  Query,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NotesService, ExternalApiResponse } from './notes.service';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { console } from 'inspector';

interface RequestWithUser extends Request {
  user: { userId: number };
}

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(
    @Body() createNoteDto: CreateNoteDto,
    @Request() req: RequestWithUser,
  ) {
    return this.notesService.create(createNoteDto, req.user.userId);
  }

  @Get()
  findAll(@Request() req: RequestWithUser) {
    return this.notesService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: RequestWithUser) {
    console.log('Finding note with id:', id);
    return this.notesService.findOne(Number(id));
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @Request() req: RequestWithUser,
  ) {
    return this.notesService.update(Number(id), updateNoteDto, req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.notesService.remove(Number(id), req.user.userId);
  }

  @Post('orthanc/search')
  searchExternal(@Body() query: any): any {
    console.log('Searching external API with Orthanc');
    return this.notesService.queryExternalApiWithOrthanc(query);
  }

  @Get('studies/:referenceId')
  getNoteByReferenceId(@Param('referenceId') referenceId: string): any {
    return this.notesService.findByReferenceId(referenceId);
  }

  // get Orthanic Study By ID
  @Get('orthanc/studies/:studyId')
  getOrthancStudyById(@Param('studyId') studyId: string): any {
    return this.notesService.getOrthanicStudyByID(studyId);
  }

  // Upload zip file to Orthanc
  @Post('orthanc/upload')
  handleFileUpload(@Body() fileBuffer: Buffer): any {
    console.log('Received file buffer for upload:', fileBuffer);
    try {
      // Ensure the fileBuffer is a valid Buffer
      if (!Buffer.isBuffer(fileBuffer)) {
        console.error('Invalid file data received:', fileBuffer);
        // throw new HttpException('Invalid file data. Expected a ZIP file buffer.', HttpStatus.BAD_REQUEST);
        return Promise.resolve();
      }

      console.log(
        'Received file buffer for upload:',
        fileBuffer.length,
        'bytes',
      );

      // Configure the external endpoint request
      // const externalEndpoint = 'http://external-service:8080/upload'; // Replace with actual endpoint
      // const config = {
      //   method: 'post',
      //   url: externalEndpoint,
      //   headers: {
      //     'Content-Type': 'application/zip',
      //   },
      //   data: fileBuffer,
      //   maxBodyLength: Infinity,
      // };

      // // Forward the file to the external endpoint
      // const response = await axios.request(config);

      // Return the external service's response
      return Promise.resolve();
    } catch (error) {
      console.error('Error during file upload:', error);
      if (error instanceof HttpException) {
        throw error;
      }
      // Handle axios or other errors
      // throw new HttpException(
      //   error.response?.data?.message || 'Failed to forward file to external service',
      //   error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      // );
      return Promise.reject();
    }
  }
  // async uploadZipToOrthanc(@Req() request: Request): Promise<any> {
  //   // console.log('Uploading zip file to Orthanc:', zipFile);
  //   // return this.notesService.uploadOrthanicStudy(zipFile);
  //   try {
  //     // Ensure the request has the correct Content-Type
  //     if (request.headers['content-type'] !== 'application/zip') {
  //       console.error('Invalid content type:', request.headers['content-type']);
  //       return Promise.reject(
  //         new HttpException(
  //           'Invalid content type, expected application/zip',
  //           HttpStatus.BAD_REQUEST,
  //         ),
  //       );
  //     }

  //     // Collect the raw buffer data from the incoming request
  //     const chunks: Buffer[] = [];
  //     for await (const chunk of request) {
  //       chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  //     }
  //     const fileBuffer = Buffer.concat(chunks);

  //     return null;

  //     // return this.notesService.uploadOrthancStudy(fileBuffer);

  //     // // Configure the external endpoint request
  //     // const externalEndpoint = 'http://external-service:8080/upload'; // Replace with actual endpoint
  //     // const config = {
  //     //   method: 'post',
  //     //   url: externalEndpoint,
  //     //   headers: {
  //     //     'Content-Type': 'application/zip',
  //     //   },
  //     //   data: fileBuffer,
  //     //   maxBodyLength: Infinity,
  //     // };

  //     // // Forward the file to the external endpoint
  //     // const response = await axios.request(config);

  //     // Return the external service's response
  //     // return response.data;
  //   } catch (error) {
  //     if (error instanceof HttpException) {
  //       throw error;
  //     }
  //     // Handle axios or other errors
  //     throw new HttpException(
  //       error.response?.data?.message ||
  //         'Failed to forward file to external service',
  //       error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }
}
