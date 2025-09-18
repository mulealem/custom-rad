import { Injectable } from '@nestjs/common';

@Injectable()
export class HelpersService {
	buildPaginationAndSort(filters: any) {
		const take = filters?.take ? Number(filters.take) : undefined;
		const skip = filters?.skip ? Number(filters.skip) : undefined;
		let orderBy: any = undefined;

		if (filters?.orderBy && filters?.order) {
			orderBy = { [filters.orderBy]: filters.order };
		}

		return { take, skip, orderBy };
	}
}
