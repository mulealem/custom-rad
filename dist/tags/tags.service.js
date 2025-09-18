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
exports.TagsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let TagsService = class TagsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTagDto) {
        return this.prisma.tag.create({
            data: createTagDto,
        });
    }
    async findAll() {
        return this.prisma.tag.findMany();
    }
    async findOne(id) {
        return this.prisma.tag.findUnique({
            where: { id },
        });
    }
    async update(id, updateTagDto) {
        return this.prisma.tag.update({
            where: { id },
            data: updateTagDto,
        });
    }
    async delete(id) {
        return this.prisma.tag.delete({
            where: { id },
        });
    }
    async search(filters) {
        const where = {};
        if (filters.Ids)
            where.id = { in: filters.Ids };
        if (filters.name)
            where.name = { contains: filters.name, mode: 'insensitive' };
        if (filters.createdAtStart || filters.createdAtEnd) {
            where.createdAt = {};
            if (filters.createdAtStart)
                where.createdAt.gte = new Date(filters.createdAtStart);
            if (filters.createdAtEnd)
                where.createdAt.lte = new Date(filters.createdAtEnd);
        }
        const take = filters?.take ? Number(filters.take) : undefined;
        const skip = filters?.skip ? Number(filters.skip) : undefined;
        const orderBy = filters?.orderBy && filters?.order ? { [filters.orderBy]: filters.order } : undefined;
        return this.prisma.tag.findMany({ where, take, skip, orderBy });
    }
};
exports.TagsService = TagsService;
exports.TagsService = TagsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TagsService);
//# sourceMappingURL=tags.service.js.map