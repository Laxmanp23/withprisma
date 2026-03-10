import { Request, Response } from "express";
import { UserService } from "./user.service";
import { AuthRequest } from "../../types/request.types";

const userService = new UserService();

export class UserController {

  async createStaff(req: AuthRequest, res: Response) {
    try {

      const result = await userService.createStaff(req.user, req.body);

      res.status(201).json(result);

    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getUsers(req: AuthRequest, res: Response) {

     if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    })
  }
    const users = await userService.getUsers(req.user);
    res.json(users);
  }

  async getUser(req: AuthRequest, res: Response) {

    const id = Number(req.params.id);

    const user = await userService.getUserById(req.user, id);

    res.json(user);
  }

  async updateUser(req: AuthRequest, res: Response) {

    const id = Number(req.params.id);

    const user = await userService.updateUser(req.user, id, req.body);

    res.json(user);
  }

  async deleteUser(req: AuthRequest, res: Response) {

    const id = Number(req.params.id);

    await userService.deleteUser(req.user, id);

    res.json({ message: "User deleted" });
  }
}