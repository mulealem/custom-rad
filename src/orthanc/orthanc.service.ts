import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import axios from 'axios';
import { join } from 'path';
import { createWriteStream } from 'fs';

@Injectable()
export class OrthancService {
  constructor(private prisma: PrismaService) {}

  private orthancClient() {
    const baseURL = process.env.ORTHANC_BASE_URL || 'http://109.123.244.17:8042';
    const username = process.env.ORTHANC_USERNAME;
    const password = process.env.ORTHANC_PASSWORD;
    return axios.create({
      baseURL,
      auth: username && password ? { username, password } : undefined,
      timeout: 15000,
    });
  }

  async deleteStudy(studyId: string) {
    const client = this.orthancClient();
    try {
      const res = await client.delete(`/studies/${studyId}`);
      return { ok: true, status: res.status };
    } catch (error: any) {
      return { ok: false, error: error.message, status: error.response?.status };
    }
  }

  extract(tempStudy: any) {
    //     {
    //   "event": "NewInstanceUploaded",
    //   "instanceId": "7daa49bb-831d6aaa-c87e5f33-6cec83cb-81eb38dc",
    //   "patientId": "0",
    //   "seriesInstanceUID": "1.3.6.1.4.1.44316.6.102.2.2023091384336494.575117162211064181910",
    //   "sopInstanceUID": "1.3.6.1.4.1.44316.6.102.3.2023091384336462.235481912497901066478",
    //   "studyInstanceUID": "1.3.6.1.4.1.44316.6.102.1.2023091384336494.746252101381252750643"
    // }

    let study = tempStudy.payload;

    let std: any;
    if (typeof study === 'string') {
      try {
        std = JSON.parse(study);
      } catch (e) {
        throw new Error('Invalid JSON string for study');
      }
    } else {
      std = study;
    }

    // console.log(
    //   'Extracting DICOM info for SeriesInstanceUID [std json]:',
    //   std,
    //   std.seriesInstanceUID,
    // );

    // return axios
    //   .post('http://109.123.244.17:8042/tools/find', {
    //     Level: 'Instance',
    //     Query: {
    //       SOPInstanceUID: study.sopInstanceUID,
    //     },
    //     Expand: true,
    //   })
    //   .then((response) => response.data)
    //   .catch((error) => {
    //     console.error('Error querying Orthanc:', error);
    //     throw new Error('Failed to query Orthanc');
    //   });

    const orthancUrl = 'http://109.123.244.17:8042';

    const client = axios.create({
      baseURL: orthancUrl,
      // headers: { 'Content-Type': 'application/json' },
    });

    console.log('> extract: Received extract request', study, typeof study, tempStudy, typeof tempStudy);

    const seriesInstanceUID = study?.seriesInstanceUID;

    console.log(
      'Extracting DICOM info for SeriesInstanceUID [main]:',
      seriesInstanceUID,
    );

    return (
      client
        .post('/tools/lookup', seriesInstanceUID)
        .then((response) => {
          console.log("'/tools/lookup', seriesInstanceUID", response.data);
          const seriesData = response.data.find(
            (item) => item.Type === 'Series',
          );
          if (!seriesData) {
            throw new Error(
              `No series found for SeriesInstanceUID: ${seriesInstanceUID}`,
            );
          }
          const seriesId = seriesData.ID;
          // return seriesData.ID;

          return client
            .get(`/series/${seriesId}`)
            .then((seriesResponse) => {
              console.log(`'/series/${seriesId}'`, seriesResponse.data);
              const modality =
                seriesResponse.data.MainDicomTags.Modality || null;
              const studyId = seriesResponse.data.ParentStudy;
              if (!studyId) {
                throw new Error('No parent study found for the series');
              }
              return client
                .get(`/studies/${studyId}`)
                .then((studyResponse) => {
                  console.log(`'/studies/${studyId}'`, studyResponse.data);
                  const institutionName =
                    studyResponse.data.MainDicomTags.InstitutionName || null;
                  const patientId = studyResponse.data.ParentPatient;
                  if (!patientId) {
                    throw new Error('No parent patient found for the study');
                  }
                  // return { modality, institutionName, patientId };
                  return client
                    .get(`/patients/${patientId}`)
                    .then((patientResponse) => {
                      console.log(
                        `'/patients/${patientId}'`,
                        patientResponse.data,
                      );
                      const patientID =
                        patientResponse.data.MainDicomTags.PatientID || null;
                      const patientName =
                        patientResponse.data.MainDicomTags.PatientName || null;

                      // for a single instance get the tags
                      const instanceId = seriesResponse?.data?.Instances?.[0];
                      if (!instanceId) {
                        throw new Error('No instance ID found for the patient');
                      }

                      return client
                        .get(`/instances/${instanceId}/tags`)
                        .then(async (instanceTagsResponse) => {
                          console.log(
                            `'/instances/${instanceId}'`,
                            instanceTagsResponse.data,
                          );
                          // const instanceTags =
                          //   instanceTagsResponse.data.MainDicomTags || {};
                          //   instanceResponse.data.MainDicomTags || {};

                          //       //             model Patient {
                          //       //   id          Int       @id @default(autoincrement())
                          //       //   name        String?
                          //       //   dateOfBirth DateTime?
                          //       //   gender      String?
                          //       //   createdById Int?
                          //       //   createdBy   User?     @relation(fields: [createdById], references: [id])
                          //       //   createdAt   DateTime  @default(now())
                          //       //   updatedAt   DateTime  @updatedAt
                          //       // }

                          //       // model Study {
                          //       //   id                         Int          @id @default(autoincrement())
                          //       //   studyId                    String?      @unique
                          //       //   studyDIACOMReferenceObject String?
                          //       //   patientId                  Int?
                          //       //   modality                   String?
                          //       //   referringPhysicianId       Int?
                          //       //   assignedDoctorId           Int?
                          //       //   status                     String?
                          //       //   content                    String?
                          //       //   institutionId              Int?
                          //       //   institution                Institution? @relation(fields: [institutionId], references: [id])
                          //       //   uploadedById               Int?
                          //       //   uploadedBy                 User?        @relation(fields: [uploadedById], references: [id])
                          //       //   createdAt                  DateTime     @default(now())
                          //       //   updatedAt                  DateTime     @updatedAt
                          //       //   StudyTag                   StudyTag[]
                          //       // }

                          //       // check if study exists in the database, if not create it with patient and institution

                          const parentStudyReferenceId =
                            seriesResponse.data.ParentStudy;

                          const studyExists =
                            await this.prisma.study.findUnique({
                              where: {
                                parentStudyReferenceId: parentStudyReferenceId,
                              },
                            });
                          if (!studyExists) {
                            // Create the study if it doesn't exist
                            await this.prisma.study
                              .create({
                                data: {
                                  studyId: seriesInstanceUID,
                                  parentStudyReferenceId:
                                    parentStudyReferenceId,
                                  status: 'pending',
                                  studyDIACOMReferenceObject: JSON.stringify({
                                    seriesResponse: seriesResponse.data,
                                    studyResponse: studyResponse.data,
                                    patientResponse: patientResponse.data,
                                    instanceTagsResponse:
                                      instanceTagsResponse.data,
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
                                        // id: 0,
                                        // title: institutionName
                                        //   ? institutionName
                                        //   : 'Unknown Institution',
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
                                          : null, // Assuming no gender is provided
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
                          } else {
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
                          if (axios.isAxiosError(error)) {
                            console.error(
                              `Error fetching instance data: ${error.message}`,
                            );
                          }
                          throw new Error('Failed to fetch instance data');
                        });

                      // Return the extracted information
                      return {
                        // patientID,
                        // patientName,
                        // institutionName,
                        // modality,
                        // seriesId,
                        // studyId,
                        seriesResponse: seriesResponse.data,
                        studyResponse: studyResponse.data,
                        patientResponse: patientResponse.data,
                      };
                    })
                    .catch((error) => {
                      if (axios.isAxiosError(error)) {
                        console.error(
                          `Error fetching patient data: ${error.message}`,
                        );
                      }
                      throw new Error('Failed to fetch patient data');
                    });
                })
                .catch((error) => {
                  if (axios.isAxiosError(error)) {
                    console.error(
                      `Error fetching study data: ${error.message}`,
                    );
                  }
                  throw new Error('Failed to fetch study data');
                });
            })
            .catch((error) => {
              if (axios.isAxiosError(error)) {
                console.error(`Error fetching series data: ${error.message}`);
              }
              throw new Error(error);
            });
        })
        // .then((seriesId) => {
        //   return client.get(`/series/${seriesId}`).then((seriesResponse) => {
        //     console.log(`'/series/${seriesId}'`, seriesResponse.data);
        //     const modality = seriesResponse.data.MainDicomTags.Modality || null;
        //     const studyId = seriesResponse.data.ParentStudy;
        //     if (!studyId) {
        //       throw new Error('No parent study found for the series');
        //     }
        //     return { seriesId, modality, studyId };
        //   });
        // })
        // .then(({ modality, studyId }) => {
        //   return client.get(`/studies/${studyId}`).then((studyResponse) => {
        //     console.log(`'/studies/${studyId}'`, studyResponse.data);
        //     const institutionName =
        //       studyResponse.data.MainDicomTags.InstitutionName || null;
        //     const patientId = studyResponse.data.ParentPatient;
        //     if (!patientId) {
        //       throw new Error('No parent patient found for the study');
        //     }
        //     return { modality, institutionName, patientId };
        //   });
        // })
        // .then(({ modality, institutionName, patientId }) => {
        //   return client
        //     .get(`/patients/${patientId}`)
        //     .then(async (patientResponse) => {
        //       console.log(`'/patients/${patientId}'`, patientResponse.data);
        //       const patientID =
        //         patientResponse.data.MainDicomTags.PatientID || null;
        //       const patientName =
        //         patientResponse.data.MainDicomTags.PatientName || null;

        //       //             model Patient {
        //       //   id          Int       @id @default(autoincrement())
        //       //   name        String?
        //       //   dateOfBirth DateTime?
        //       //   gender      String?
        //       //   createdById Int?
        //       //   createdBy   User?     @relation(fields: [createdById], references: [id])
        //       //   createdAt   DateTime  @default(now())
        //       //   updatedAt   DateTime  @updatedAt
        //       // }

        //       // model Study {
        //       //   id                         Int          @id @default(autoincrement())
        //       //   studyId                    String?      @unique
        //       //   studyDIACOMReferenceObject String?
        //       //   patientId                  Int?
        //       //   modality                   String?
        //       //   referringPhysicianId       Int?
        //       //   assignedDoctorId           Int?
        //       //   status                     String?
        //       //   content                    String?
        //       //   institutionId              Int?
        //       //   institution                Institution? @relation(fields: [institutionId], references: [id])
        //       //   uploadedById               Int?
        //       //   uploadedBy                 User?        @relation(fields: [uploadedById], references: [id])
        //       //   createdAt                  DateTime     @default(now())
        //       //   updatedAt                  DateTime     @updatedAt
        //       //   StudyTag                   StudyTag[]
        //       // }

        //       // check if study exists in the database, if not create it with patient and institution

        //       // const studyExists = await this.prisma.study.findUnique({
        //       //   where: { studyId: 'studyId' },
        //       // });

        //       // if (!studyExists) {
        //       //   // Create the study if it doesn't exist
        //       //   await this.prisma.study.create({
        //       //     data: {
        //       //       studyId: 'studyId',
        //       //       status: 'pending',
        //       //       studyDIACOMReferenceObject: JSON.stringify(study),
        //       //       modality: modality ? modality : 'Unknown Modality',
        //       //       institution: {
        //       //         connectOrCreate: {
        //       //           where: {
        //       //             id: 0,
        //       //             title: institutionName
        //       //               ? institutionName
        //       //               : 'Unknown Institution',
        //       //           },
        //       //           create: {
        //       //             title: institutionName
        //       //               ? institutionName
        //       //               : 'Unknown Institution',
        //       //           },
        //       //         },
        //       //       },
        //       //       patient: {
        //       //         connectOrCreate: {
        //       //           where: { id: 0 },
        //       //           create: {
        //       //             name: patientName ? patientName : 'Unknown Patient',
        //       //             dateOfBirth: null, // Assuming no DOB is provided
        //       //             gender: null, // Assuming no gender is provided
        //       //           },
        //       //         },
        //       //       },
        //       //     },
        //       //   });
        //       // }

        //       return {
        //         patientID,
        //         patientName,
        //         institutionName,
        //         modality,
        //       };
        //     });
        // })
        .catch((error) => {
          if (axios.isAxiosError(error)) {
            console.error('Error querying Orthanc:', error);
            throw new Error(
              `Failed to retrieve DICOM info: ${error.response?.data || error.message}`,
            );
          }
          throw new Error(error);
        })
    );

    return axios
      .post(`http://109.123.244.17:8042/tools/lookup`, study?.seriesInstanceUID)
      .then((response) => {
        const seriesLookup = response.data;
        return axios
          .post(`http://109.123.244.17:8042/tools/find`, {
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

  async upload(file: Express.Multer.File) {
    console.log('> upload: Received file upload request');
    // save the file to a specific directory
    const uploadPath = join(
      __dirname,
      '..',
      '..',
      'uploads',
      file.originalname,
    );

    if (file.buffer) {
      console.log('> to fs: Received file upload request');
      // MemoryStorage: file.buffer is available
      // const writeStream = createWriteStream(uploadPath);
      // writeStream.write(file.buffer);
      // writeStream.end();

      // upload to Orthanc
      const orthancUrl = 'http://109.123.244.17:8042/instances';
      const response = await axios.post(orthancUrl, file.buffer, {
        headers: {
          'Content-Type': 'application/dicom',
        },
      });

      if (response.status !== 200) {
        throw new Error(
          `Failed to upload file to Orthanc: ${response.statusText}`,
        );
      } else {
        console.log('File uploaded to Orthanc successfully');
      }
    } else if (file.path) {
      console.log('> to disk: Received file upload request');
      // DiskStorage: file.path is available, file already saved
      // Optionally, you could move/rename the file if needed
    } else {
      throw new Error('File buffer and path are both undefined');
    }

    return {
      filename: file.originalname,
      path: uploadPath,
      message: 'File uploaded successfully',
    };
  }

  // getDicomInfo(seriesInstanceUID: any, orthancUrl = 'http://localhost:8042') {
  //   const client = axios.create({
  //     baseURL: orthancUrl,
  //     headers: { 'Content-Type': 'application/json' },
  //   });

  //   return client
  //     .post('/tools/lookup', seriesInstanceUID)
  //     .then((response) => {
  //       const seriesData = response.data.find((item) => item.Type === 'Series');
  //       if (!seriesData) {
  //         throw new Error(
  //           `No series found for SeriesInstanceUID: ${seriesInstanceUID}`,
  //         );
  //       }
  //       return seriesData.ID;
  //     })
  //     .then((seriesId) => {
  //       return client.get(`/series/${seriesId}`).then((seriesResponse) => {
  //         const modality = seriesResponse.data.MainDicomTags.Modality || null;
  //         const studyId = seriesResponse.data.ParentStudy;
  //         if (!studyId) {
  //           throw new Error('No parent study found for the series');
  //         }
  //         return { seriesId, modality, studyId };
  //       });
  //     })
  //     .then(({ modality, studyId }) => {
  //       return client.get(`/studies/${studyId}`).then((studyResponse) => {
  //         const institutionName =
  //           studyResponse.data.MainDicomTags.InstitutionName || null;
  //         const patientId = studyResponse.data.ParentPatient;
  //         if (!patientId) {
  //           throw new Error('No parent patient found for the study');
  //         }
  //         return { modality, institutionName, patientId };
  //       });
  //     })
  //     .then(({ modality, institutionName, patientId }) => {
  //       return client.get(`/patients/${patientId}`).then((patientResponse) => {
  //         const patientID =
  //           patientResponse.data.MainDicomTags.PatientID || null;
  //         const patientName =
  //           patientResponse.data.MainDicomTags.PatientName || null;
  //         return {
  //           patientID,
  //           patientName,
  //           institutionName,
  //           modality,
  //         };
  //       });
  //     })
  //     .catch((error) => {
  //       if (axios.isAxiosError(error)) {
  //         throw new Error(
  //           `Failed to retrieve DICOM info: ${error.response?.data || error.message}`,
  //         );
  //       }
  //       throw new Error(`Failed to retrieve DICOM info: ${error.message}`);
  //     });
  // }
}
