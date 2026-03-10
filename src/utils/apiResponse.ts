import {Response} from "express";
export const apiResponse = (
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data: any = null
) => {
  return res.status(statusCode).json({
    success,
    message,
    data
  });
};