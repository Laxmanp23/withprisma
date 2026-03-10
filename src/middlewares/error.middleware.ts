import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  // Prisma duplicate error
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      const field = err.meta?.target;

      return res.status(409).json({
        success: false,
        message: `${field} already exists`
      });
    }
  }

  // default error
  return res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
};