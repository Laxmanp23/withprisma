import {Request, Response} from "express";
import { createProductUnitService,getProductUnitService } from "./productUnit.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { apiResponse } from "../../utils/apiResponse";
import { AuthRequest } from "../../types/request.types";

export const createProductUnit = asyncHandler(async(req:AuthRequest,res:Response) => {
    const {name} = req.body;
    const shopId = req.user?.shopId;
    console.log("User:", req.user);
    const result = await createProductUnitService(name,shopId!);
    apiResponse(res,201,true,"product Unit Created",result)
    
})

export const getProductUnit = asyncHandler(async(req:any, res:Response)=>{
    const shopId = req.user.shopId
    const result = await getProductUnitService(shopId);
    apiResponse(res,200,true,"Products Unit List",result)
})