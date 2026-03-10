import { createShopRepo, updateUserShopRepo,getUserByIdRepo } from "./shop.repository"

export const createShopService = async(userId:number,data:any)=>{

  const user = await getUserByIdRepo(userId)

  if(user?.shopId){
    throw new Error("User already has a shop")
  }
  
  const shop = await createShopRepo({
    name:data.name,
    ownerId:userId
  })

  await updateUserShopRepo(userId,shop.id)

  return shop
}