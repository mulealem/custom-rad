"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePdfDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_pdf_dto_1 = require("./create-pdf.dto");
class UpdatePdfDto extends (0, mapped_types_1.PartialType)(create_pdf_dto_1.CreatePdfDto) {
}
exports.UpdatePdfDto = UpdatePdfDto;
//# sourceMappingURL=update-pdf.dto.js.map