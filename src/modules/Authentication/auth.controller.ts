import { Request, Response } from "express";
import { signupService, loginService ,verifyOtpService,resendOtpService} from "./auth.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { apiResponse } from "../../utils/apiResponse";

export const signup = asyncHandler(async (req: Request, res: Response) => {

    const user = await signupService(req.body)
    console.log(req.body);
    
    apiResponse(res, 201, true, "User Created Sucessfully", user)
})

export const login = asyncHandler(async (req: Request, res: Response) => {

    const result = await loginService(req.body)

    apiResponse(res, 200, true, "User LogedIn Successfully", result)
});

export const verifyOtp = asyncHandler(async (req: Request, res: Response) => {

  const result = await verifyOtpService(req.body.email,req.body.otp);

  apiResponse(res, 200, true, "Email Verified Successfully", result);

});

export const resendOtp = asyncHandler(async (req: Request, res: Response) => {

  const result = await resendOtpService(req.body.email)

  apiResponse(res,200,true,result.message)

})