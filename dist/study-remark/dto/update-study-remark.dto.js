"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStudyRemarkDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_study_remark_dto_1 = require("./create-study-remark.dto");
class UpdateStudyRemarkDto extends (0, mapped_types_1.PartialType)(create_study_remark_dto_1.CreateStudyRemarkDto) {
}
exports.UpdateStudyRemarkDto = UpdateStudyRemarkDto;
//# sourceMappingURL=update-study-remark.dto.js.map