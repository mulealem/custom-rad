import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
const axios = require('axios');

export interface ExternalApiResponse {
  result: unknown;
  meta: unknown;
}

@Injectable()
export class NotesService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) {}

  async create(createNoteDto: CreateNoteDto, userId: number) {
    return this.prisma.note.create({
      data: {
        title: createNoteDto.title,
        content: createNoteDto.content,
        referenceId: createNoteDto.referenceId,
        userId,
        metadata: createNoteDto.metadata,
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.note.findMany({
      where: { userId },
    });
  }

  async findOne(id: number) {
    const note = await this.prisma.note.findUnique({
      where: { id },
    });
    // if (!note || note.userId !== userId) {
    //   throw new UnauthorizedException('Note not found or access denied');
    // }
    return note;
  }

  async findByReferenceId(referenceId: string) {
    const note = await this.prisma.note.findFirst({
      where: { referenceId },
    });
    console.log('Finding note by referenceId:', note);
    if (!note) {
      return null;
    }
    return note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto, userId: number) {
    const note = await this.prisma.note.findUnique({
      where: { id },
    });
    if (!note || note.userId !== userId) {
      throw new UnauthorizedException('Note not found or access denied');
    }
    return this.prisma.note.update({
      where: { id },
      data: {
        ...updateNoteDto,
      },
    });
  }

  async remove(id: number, userId: number) {
    const note = await this.prisma.note.findUnique({
      where: { id },
    });
    if (!note || note.userId !== userId) {
      throw new UnauthorizedException('Note not found or access denied');
    }
    return this.prisma.note.delete({
      where: { id },
    });
  }

  queryExternalApiWithOrthanc(query: any): any[] {
    console.log('Querying external API with Orthanc...', query);
    // return [
    //   {
    //     Level: 'Study',
    //     Query: {},
    //     Expand: true,
    //   },
    // ];
    return axios
      .post(
        'http://75.119.148.56:8042/tools/find',
        {
          Level: 'Study',
          Query: query,
          Expand: true,
        },
        {
          auth: { username: 'orthanc', password: 'orthanc' },
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
          },
        },
      )
      .then((response) => {
        console.log('Received response from Orthanc:');
        // return response.data;
        return Promise.all(
          response.data.map((study: any) => {
            return axios
              .get(`http://75.119.148.56:8042/studies/${study.ID}/series`, {
                // auth: { username: 'orthanc', password: 'orthanc' },
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8',
                  'Access-Control-Allow-Origin': '*',
                },
              })
              .then((seriesRes: any) => {
                console.log('Received series from Orthanc: [2]');
                // return seriesRes?.data[0];
                const seriesId = seriesRes?.data[0]?.ID;
                return axios
                  .get(
                    `http://75.119.148.56:8042/series/${seriesId}/instances`,
                    {
                      // auth: { username: 'orthanc', password: 'orthanc' },
                      headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Access-Control-Allow-Origin': '*',
                      },
                    },
                  )
                  .then((instanceRes: any) => {
                    console.log('Received instances from Orthanc: [3]');
                    // return instanceRes?.data;
                    const instanceIds =
                      instanceRes?.data.map((instance: any) => instance.ID) ||
                      [];
                    study.previewUrls = instanceIds.map(
                      (id: string) =>
                        `http://75.119.148.56:8042/instances/${id}/preview?format=jpg&height=100`,
                    );
                    return study;
                  })
                  .catch((error: any) => {
                    // console.error('Failed to fetch instances:', error);
                    return Promise.reject({
                      message: 'Failed to fetch instances from Orthanc',
                      // error: error.message,
                    });
                  });
              })
              .catch((error: any) => {
                // console.error('Failed to fetch series or instances:', error);
                return Promise.reject({
                  message: 'Failed to fetch series or instances from Orthanc',
                  // error: error.message,
                });
              });
          }),
        );
      })
      .catch((error: any) => {
        // console.error('Failed to fetch studies:', error);
        // throw error;
        return Promise.reject({
          message: 'Failed to fetch studies from Orthanc',
          // error: error.message,
        });
      });
  }

  getOrthanicStudyByID(studyId: string): any {
    console.log('Querying Orthanc for study ID:', studyId);
    return axios
      .get(`http://75.119.148.56:8042/studies/${studyId}`, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((response) => {
        console.log('Received study from Orthanc:');
        return response.data;
      })
      .catch((error: any) => {
        console.error('Failed to fetch study from Orthanc:', error);
        return Promise.reject({
          message: 'Failed to fetch study from Orthanc',
          error: error.message,
        });
      });
  }

  uploadOrthanicStudy(studyFile: any): any {
    console.log('Uploading study to Orthanc:', studyFile);

    return;
    return axios
      .post('http://75.119.148.56:8042/instances', studyFile, {
        headers: {
          'Content-Type': 'application/zip',
          'Access-Control-Allow-Origin': '*',
        },
        auth: {
          username: 'orthanc',
          password: 'orthanc',
        },
      })
      .then((response: any) => {
        console.log('Study uploaded successfully:', response.data);
        return response.data;
      })
      .catch((error: any) => {
        console.error('Failed to upload study:', error);
        return Promise.reject({
          message: 'Failed to upload study to Orthanc',
          error: error.message,
        });
      });
  }
}
