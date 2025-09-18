export class CreateStudyAttachmentDto {
  studyId: number;
  studyTag?: string | null;
  fileName: string;
  filePath: string;
  fileType: string;
  fileSize: number;
}
