export declare class Study {
    id: number;
    studyId?: string;
    studyDIACOMReferenceObject?: string;
    patientId?: number;
    modality?: string;
    referringPhysicianId?: number;
    assignedDoctorId?: number;
    status?: string;
    content: string;
    institutionId?: number;
    uploadedById?: number;
    createdAt: Date;
    updatedAt: Date;
}
