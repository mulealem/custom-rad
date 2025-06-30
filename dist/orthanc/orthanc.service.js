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
exports.OrthancService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const axios_1 = require("axios");
let OrthancService = class OrthancService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    extract(study) {
        const orthancUrl = 'http://75.119.148.56:8042';
        const client = axios_1.default.create({
            baseURL: orthancUrl,
        });
        const seriesInstanceUID = study?.seriesInstanceUID;
        console.log('Extracting DICOM info for SeriesInstanceUID:', seriesInstanceUID);
        return (client
            .post('/tools/lookup', seriesInstanceUID)
            .then((response) => {
            console.log("'/tools/lookup', seriesInstanceUID", response.data);
            const seriesData = response.data.find((item) => item.Type === 'Series');
            if (!seriesData) {
                throw new Error(`No series found for SeriesInstanceUID: ${seriesInstanceUID}`);
            }
            const seriesId = seriesData.ID;
            return client
                .get(`/series/${seriesId}`)
                .then((seriesResponse) => {
                console.log(`'/series/${seriesId}'`, seriesResponse.data);
                const modality = seriesResponse.data.MainDicomTags.Modality || null;
                const studyId = seriesResponse.data.ParentStudy;
                if (!studyId) {
                    throw new Error('No parent study found for the series');
                }
                return client
                    .get(`/studies/${studyId}`)
                    .then((studyResponse) => {
                    console.log(`'/studies/${studyId}'`, studyResponse.data);
                    const institutionName = studyResponse.data.MainDicomTags.InstitutionName || null;
                    const patientId = studyResponse.data.ParentPatient;
                    if (!patientId) {
                        throw new Error('No parent patient found for the study');
                    }
                    return client
                        .get(`/patients/${patientId}`)
                        .then((patientResponse) => {
                        console.log(`'/patients/${patientId}'`, patientResponse.data);
                        const patientID = patientResponse.data.MainDicomTags.PatientID || null;
                        const patientName = patientResponse.data.MainDicomTags.PatientName || null;
                        const instanceId = seriesResponse?.data?.Instances?.[0];
                        if (!instanceId) {
                            throw new Error('No instance ID found for the patient');
                        }
                        return client
                            .get(`/instances/${instanceId}/tags`)
                            .then(async (instanceTagsResponse) => {
                            console.log(`'/instances/${instanceId}'`, instanceTagsResponse.data);
                            const studyExists = await this.prisma.study.findUnique({
                                where: { studyId: studyId },
                            });
                            if (!studyExists) {
                                await this.prisma.study
                                    .create({
                                    data: {
                                        studyId: studyId,
                                        status: 'pending',
                                        studyDIACOMReferenceObject: JSON.stringify({
                                            seriesResponse: seriesResponse.data,
                                            studyResponse: studyResponse.data,
                                            patientResponse: patientResponse.data,
                                            instanceTagsResponse: instanceTagsResponse.data,
                                        }),
                                        modality: modality
                                            ? modality
                                            : 'Unknown Modality',
                                        institution: {
                                            connectOrCreate: {
                                                where: {
                                                    slung: institutionName
                                                        ? institutionName
                                                            .replace(/\s+/g, '-')
                                                            .toLowerCase()
                                                        : 'unknown-institution',
                                                },
                                                create: {
                                                    slung: institutionName
                                                        ? institutionName
                                                            .replace(/\s+/g, '-')
                                                            .toLowerCase()
                                                        : 'unknown-institution',
                                                    title: institutionName
                                                        ? institutionName
                                                        : 'Unknown Institution',
                                                },
                                            },
                                        },
                                        patient: {
                                            connectOrCreate: {
                                                where: { id: 0 },
                                                create: {
                                                    name: patientName
                                                        ? patientName
                                                        : 'Unknown Patient',
                                                    dateOfBirth: patientResponse.data
                                                        ? patientResponse.data?.MainDicomTags
                                                            ?.DateOfBirth || null
                                                        : null,
                                                    gender: patientResponse.data
                                                        ? patientResponse.data?.MainDicomTags
                                                            ?.Gender || null
                                                        : null,
                                                },
                                            },
                                        },
                                    },
                                })
                                    .then((dbRes) => {
                                    console.log('Study created:', dbRes);
                                })
                                    .catch((error) => {
                                    console.error('Error creating study:', error);
                                });
                                return {
                                    seriesResponse: seriesResponse.data,
                                    studyResponse: studyResponse.data,
                                    patientResponse: patientResponse.data,
                                    instanceTagsResponse: instanceTagsResponse.data,
                                };
                            }
                            else {
                                console.log('Study already exists:', studyExists);
                                return {
                                    seriesResponse: seriesResponse.data,
                                    studyResponse: studyResponse.data,
                                    patientResponse: patientResponse.data,
                                    instanceTagsResponse: instanceTagsResponse.data,
                                };
                            }
                        })
                            .catch((error) => {
                            if (axios_1.default.isAxiosError(error)) {
                                console.error(`Error fetching instance data: ${error.message}`);
                            }
                            throw new Error('Failed to fetch instance data');
                        });
                        return {
                            seriesResponse: seriesResponse.data,
                            studyResponse: studyResponse.data,
                            patientResponse: patientResponse.data,
                        };
                    })
                        .catch((error) => {
                        if (axios_1.default.isAxiosError(error)) {
                            console.error(`Error fetching patient data: ${error.message}`);
                        }
                        throw new Error('Failed to fetch patient data');
                    });
                })
                    .catch((error) => {
                    if (axios_1.default.isAxiosError(error)) {
                        console.error(`Error fetching study data: ${error.message}`);
                    }
                    throw new Error('Failed to fetch study data');
                });
            })
                .catch((error) => {
                if (axios_1.default.isAxiosError(error)) {
                    console.error(`Error fetching series data: ${error.message}`);
                }
                throw new Error('Failed to fetch series data');
            });
        })
            .catch((error) => {
            if (axios_1.default.isAxiosError(error)) {
                throw new Error(`Failed to retrieve DICOM info: ${error.response?.data || error.message}`);
            }
            throw new Error(`Failed to retrieve DICOM info: ${error.message}`);
        }));
        return axios_1.default
            .post(`http://75.119.148.56:8042/tools/lookup`, study?.seriesInstanceUID)
            .then((response) => {
            const seriesLookup = response.data;
            return axios_1.default
                .post(`http://75.119.148.56:8042/tools/find`, {
                Level: 'Study',
                Query: {},
                Expand: true,
            })
                .then((response) => response.data)
                .catch((error) => {
                console.error('Error querying Orthanc for instances:', error);
                throw new Error('Failed to query Orthanc for instances');
            });
        })
            .catch((error) => {
            console.error('Error querying Orthanc:', error);
            throw new Error('Failed to query Orthanc');
        });
        return {
            message: 'Data extracted successfully',
            study,
        };
    }
};
exports.OrthancService = OrthancService;
exports.OrthancService = OrthancService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrthancService);
//# sourceMappingURL=orthanc.service.js.map