import bcrypt from "bcrypt"
import { Role } from "@prisma/client"
import {
  createUserRepo, findUserByEmail,
  findOtpRepo, verifyOtpRepo, updateOtpRepo,
  createOtpRepo, deleteMetaData
} from "./auth.repository"
import jwt from "jsonwebtoken"
import { generateOtp } from "../../utils/otp"
import { sendEmail } from "../../utils/sendEmail"
import { getOtpEmailTemplate } from "../../utils/emailTemplate"
import dotenv from "dotenv"

dotenv.config()

export const signupService = async (data: any) => {

  const existingUser = await findUserByEmail(data.email)

  if (existingUser) {
    throw new Error("Email already exists")
  }

  const existingOtp = await findOtpRepo(data.email, "EMAIL_VERIFY")

  if (existingOtp && existingOtp.expiresAt > new Date()) {
    throw new Error("OTP already sent. Please wait 5 minuits before requesting again");
  }

  const otp = generateOtp()

  const expires = new Date(Date.now() + 5 * 60 * 1000)

  await createOtpRepo({
    email: data.email,
    otp,
    type: "EMAIL_VERIFY",
    expiresAt: expires,
    meta: JSON.stringify(data)
  })

  const html = getOtpEmailTemplate(data.name, otp)

  sendEmail(
    data.email,
    "Verify your email address – OTP Code",
    html
  )

  return {
    message: "User created. OTP sent to email"
  }
}

export const loginService = async (data: any) => {

  const user = await findUserByEmail(data.email)

  if (!user) {
    throw new Error("Invalid credentials")
  }
  if (!user.isVerified) {
    throw new Error("Email not verified")
  }


  const match = await bcrypt.compare(data.password, user.password)

  if (!match) {
    throw new Error("Invalid credentials")
  }

  const token = jwt.sign(
    { id: user.id, role: user.role, shopId: user.shopId },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );
  const { password, ...safeUser } = user

  return {
    user: safeUser,
    token
  }
};

export const verifyOtpService = async (email: string, otp: string) => {

  const record = await findOtpRepo(email, otp)

  if (!record) {
    throw new Error("Invalid OTP")
  }

  if (record.expiresAt < new Date()) {
    throw new Error("OTP expired")
  }

  if (!record.meta) {

    throw new Error("Signup data missing")
  }

  const data = JSON.parse(record.meta)

  const hashedPassword = await bcrypt.hash(data.password, 10)

  await createUserRepo({
    ...data,
    password: hashedPassword,
    role: Role.ADMIN
  })

  await verifyOtpRepo(record.id)
  await deleteMetaData(record.id)

  return {
    message: "Email verified successfully"
  }
}

export const resendOtpService = async (email: string) => {

  const user = await findUserByEmail(email)

  if (user) {
    throw new Error("User already registered")
  }

  const existingOtp = await findOtpRepo(email, "EMAIL_VERIFY")

  if (!existingOtp) {
    throw new Error("No signup request found")
  }

  if (existingOtp.expiresAt > new Date()) {
    throw new Error("Please wait before requesting a new OTP")
  }

  const otp = generateOtp()

  const expires = new Date(Date.now() + 5 * 60 * 1000)

  const updatedOtp = await updateOtpRepo(existingOtp.id, otp, expires)

  const data = JSON.parse(existingOtp.meta!)

  const html = getOtpEmailTemplate(data.name, otp)

  await sendEmail(
    email,
    "Resend OTP – Verify your email",
    html
  )

  return {
    message: "New OTP sent successfully"
  }
}