import { createProductUnitRepo,getProductUnitRepo } from "./productUnit.repository"

export const createProductUnitService = async(name: string,shopId:number) =>{

const unit = await createProductUnitRepo(name,shopId);
    return {
        message:"Product Unit Created Successfully",
        data: unit
    }   
}

export const getProductUnitService = async(shopId:number) => {

    const unit = await getProductUnitRepo(shopId);
    return { data: unit};
}