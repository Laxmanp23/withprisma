import { Request,Response } from "express"
import { asyncHandler } from "../../utils/asyncHandler"
import { apiResponse } from "../../utils/apiResponse"
import { AuthRequest } from "../../types/request.types"
import { createShopService } from "./shop.service"

export const createShop = asyncHandler(async (req: AuthRequest, res: Response) => {

  const userId = req.user!.id;
  const data = req.body;
  const user = await createShopService(userId,data)
  apiResponse(res, 201, true, "Shop created successfully",user)
})