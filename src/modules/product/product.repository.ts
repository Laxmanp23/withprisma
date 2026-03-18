// product.repository.ts

import { prisma } from "../../config/prisma";

export class ProductRepository {

  create(data: any) {
    return prisma.product.create({ data });
  }

  findAll(shopId: number) {
    return prisma.product.findMany({
      where: { shopId, isDeleted: false }
    });
  }

  findById(id: number, shopId: number) {
    return prisma.product.findFirst({
      where: { id, shopId, isDeleted: false }
    });
  }

  update(id: number, shopId: number, data: any) {
    return prisma.product.updateMany({
      where: { id, shopId },
      data
    });
  }

  softDelete(id: number, shopId: number) {
    return prisma.product.updateMany({
      where: { id, shopId },
      data: {
        isDeleted: true,
        deletedAt: new Date()
      }
    });
  }
}