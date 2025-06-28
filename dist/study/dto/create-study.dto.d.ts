export declare class CreateStudyDto {
    studyId: string;
    modality: string;
    status: string;
    content: string;
    patientId?: number;
    referringPhysicianId?: number;
    assignedDoctorId?: number;
    institutionId?: number;
    uploadedById?: number;
    studyDIACOMReferenceObject?: string;
}
