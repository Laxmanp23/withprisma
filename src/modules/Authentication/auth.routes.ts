import express from "express";
import { singnUpUserSchema} from "../../validators/auth.validator";
import { validate } from "../../middlewares/validate.middleware";
import { signup,login,verifyOtp,resendOtp } from "./auth.controller";

const router = express.Router();

router.post('/signup',validate(singnUpUserSchema),signup);
router.post("/login",login);
router.post("/verify-otp",verifyOtp)
router.post("/resend-otp", resendOtp)

export default router;