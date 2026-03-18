import { prisma } from "../../config/prisma"
import {Role} from "@prisma/client"

export const emailExistOtp = (email:string) => {
  return prisma.otp.findFirst({
    where: {email},
    orderBy:{
      createdAt:"desc"
    }
  })
}

export const findOtpRepo = (email: string, otp: string) => {
  return prisma.otp.findFirst({
    where: {
      email,
      otp,
      verified: false
    },
  })
}

export const createOtpRepo = (data:any) => {
  return prisma.otp.create({
    data
  })
}

export const findUserByEmail = (email:string) => {
  return prisma.user.findUnique({
    where:{ email },
     select: userWithPasswordSelect
  })
}


export const createUserAndVerifyOtpRepo = async (
  data: any,
  hashedPassword: string,
  otpId: number
) => {

  return prisma.$transaction([
    prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        // role: "ADMIN",
        role: Role.ADMIN,
        isVerified:true
      }
    }),

    prisma.otp.update({
      where: { id: otpId },
      data: { verified: true,meta: null },
    }),
  ])
};



export const userSelect = {
  id: true,
  name: true,
  email: true,
  phone: true,
  role: true,
  shopId: true,
  createdAt: true,
  isVerified: true
}

export const userWithPasswordSelect = {
  ...userSelect,
  password: true
}

export const updateUserVerified = (email:string) => {
  return prisma.user.update({
    where:{ email },
    data:{ isVerified:true }
  })
}

export const updateOtpRepo = (id:number,otp:string,expiresAt:Date) => {
  return prisma.otp.update({
    where:{ id },
    data:{
      otp,
      expiresAt,
      verified:false
    }
  })
}



export const resendOtpRepo = async(email:string,type:string) => {
  return prisma.otp.findFirst({
    where: {
      email,type,verified:false
    },
    orderBy: {
      createdAt: "desc"
    }
  })
}