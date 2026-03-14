import { Request, Response } from "express";
import { UserService } from "./user.service";
import { AuthRequest } from "../../types/request.types";
import { apiResponse } from "../../utils/apiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

const userService = new UserService();

export class UserController {

  createStaff = asyncHandler(async (req: AuthRequest, res: Response) => {

    const result = await userService.createStaff(req.user, req.body);

    apiResponse(res, 201, true, "user created successfully", result)
  })

  getUsers = asyncHandler(async (req: AuthRequest, res: Response) =>{

    const users = await userService.getUsers(req.user);

    apiResponse(res,200,true,"User Fetched",users)
  })

  getUser = asyncHandler (async(req: AuthRequest, res: Response) =>{

    const id = Number(req.params.id);

    const user = await userService.getUserById(req.user, id);

    apiResponse(res,200,true,"User Fetched",user)
  })

 updateUser = asyncHandler( async (req: AuthRequest, res: Response) => {

    const id = Number(req.params.id);

    const user = await userService.updateUser(req.user, id, req.body);

    apiResponse(res,200,true,"User Updated",user)

  })

  deleteUser = asyncHandler(async (req: AuthRequest, res: Response) => {

    const id = Number(req.params.id);

    await userService.deleteUser(req.user, id);

    apiResponse(res,200,true,"User Deleted")
  })
}