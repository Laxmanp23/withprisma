import { prisma } from "../../config/prisma";

export class UserRepository {

  async create(data: any) {
    return prisma.user.create({ data });
  }

  async findAllByShop(shopId: number) {
    return prisma.user.findMany({
      where: {
        shopId,
        isDeleted: false
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        shopId: true
      }
    });
  }

  async findById(id: number) {
    return prisma.user.findFirst({
      where: {
        id,
        isDeleted: false
      }
    });
  }

  async update(id: number, data: any) {
    return prisma.user.update({
      where: { id },
      data
    });
  }

  async softDelete(id: number) {
    return prisma.user.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date()
      }
    });
  }

  async findByEmail(email:string){
    return prisma.user.findUnique({
      where: {email}, 
       select: {
      id: true,
      name: true,
      email: true,
      password: true,
      role: true,
      shopId: true,
      isVerified: true
    }
    })
  }
}