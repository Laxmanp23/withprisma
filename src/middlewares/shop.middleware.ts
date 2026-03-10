import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/request.types";

export const requireShop = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => 
    
    {

  if (!req.user?.shopId) {
    return res.status(400).json({
      message: "Shop not created"
    });
  }

  next();
};