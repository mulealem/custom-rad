"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const axios_1 = require("@nestjs/axios");
const axios = require('axios');
let NotesService = class NotesService {
    prisma;
    httpService;
    constructor(prisma, httpService) {
        this.prisma = prisma;
        this.httpService = httpService;
    }
    async create(createNoteDto, userId) {
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
    async findAll(userId) {
        return this.prisma.note.findMany({
            where: { userId },
        });
    }
    async findOne(id) {
        const note = await this.prisma.note.findUnique({
            where: { id },
        });
        return note;
    }
    async findByReferenceId(referenceId) {
        const note = await this.prisma.note.findFirst({
            where: { referenceId },
        });
        console.log('Finding note by referenceId:', note);
        if (!note) {
            return null;
        }
        return note;
    }
    async update(id, updateNoteDto, userId) {
        const note = await this.prisma.note.findUnique({
            where: { id },
        });
        if (!note || note.userId !== userId) {
            throw new common_1.UnauthorizedException('Note not found or access denied');
        }
        return this.prisma.note.update({
            where: { id },
            data: {
                ...updateNoteDto,
            },
        });
    }
    async remove(id, userId) {
        const note = await this.prisma.note.findUnique({
            where: { id },
        });
        if (!note || note.userId !== userId) {
            throw new common_1.UnauthorizedException('Note not found or access denied');
        }
        return this.prisma.note.delete({
            where: { id },
        });
    }
    queryExternalApiWithOrthanc(query) {
        console.log('Querying external API with Orthanc...', query);
        return axios
            .post('http://75.119.148.56:8042/tools/find', {
            Level: 'Study',
            Query: query,
            Expand: true,
        }, {
            auth: { username: 'orthanc', password: 'orthanc' },
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then((response) => {
            console.log('Received response from Orthanc:');
            return Promise.all(response.data.map((study) => {
                return axios
                    .get(`http://75.119.148.56:8042/studies/${study.ID}/series`, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Access-Control-Allow-Origin': '*',
                    },
                })
                    .then((seriesRes) => {
                    console.log('Received series from Orthanc: [2]');
                    const seriesId = seriesRes?.data[0]?.ID;
                    return axios
                        .get(`http://75.119.148.56:8042/series/${seriesId}/instances`, {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8',
                            'Access-Control-Allow-Origin': '*',
                        },
                    })
                        .then((instanceRes) => {
                        console.log('Received instances from Orthanc: [3]');
                        const instanceIds = instanceRes?.data.map((instance) => instance.ID) ||
                            [];
                        study.previewUrls = instanceIds.map((id) => `http://75.119.148.56:8042/instances/${id}/preview?format=jpg&height=100`);
                        return study;
                    })
                        .catch((error) => {
                        return Promise.reject({
                            message: 'Failed to fetch instances from Orthanc',
                        });
                    });
                })
                    .catch((error) => {
                    return Promise.reject({
                        message: 'Failed to fetch series or instances from Orthanc',
                    });
                });
            }));
        })
            .catch((error) => {
            return Promise.reject({
                message: 'Failed to fetch studies from Orthanc',
            });
        });
    }
    getOrthanicStudyByID(studyId) {
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
            .catch((error) => {
            console.error('Failed to fetch study from Orthanc:', error);
            return Promise.reject({
                message: 'Failed to fetch study from Orthanc',
                error: error.message,
            });
        });
    }
};
exports.NotesService = NotesService;
exports.NotesService = NotesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        axios_1.HttpService])
], NotesService);
//# sourceMappingURL=notes.service.js.map