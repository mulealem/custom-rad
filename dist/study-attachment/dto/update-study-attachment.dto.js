"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStudyAttachmentDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_study_attachment_dto_1 = require("./create-study-attachment.dto");
class UpdateStudyAttachmentDto extends (0, mapped_types_1.PartialType)(create_study_attachment_dto_1.CreateStudyAttachmentDto) {
}
exports.UpdateStudyAttachmentDto = UpdateStudyAttachmentDto;
//# sourceMappingURL=update-study-attachment.dto.js.map