import {prisma} from "../../config/prisma";

export const createProductUnitRepo = (name:string,shopId:number) => {
    return prisma.productUnit.create({
        data:{name, shopId}
    })
}

export const getProductUnitRepo = (shopId:number) => {

    return prisma.productUnit.findMany({
        where:{shopId},
        orderBy:{createdAt:"desc"}
    })
}