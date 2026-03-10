import { prisma } from "../../config/prisma"

export const createShopRepo = (data:any)=>{
  return prisma.shop.create({
    data
  })
}

export const updateUserShopRepo = (userId:number,shopId:number)=>{
  return prisma.user.update({
    where:{id:userId},
    data:{shopId}
  })
}

export const getUserByIdRepo = (userId:number) => {
  return prisma.user.findUnique({
    where:{id:userId}
  })
}