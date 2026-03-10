import { prisma } from "../../config/prisma"


export const findUserByEmail = (email:string) => {
  return prisma.user.findUnique({
    where:{ email },
     select: userWithPasswordSelect
  })
}

export const createUserRepo = (data:any) => {
  return prisma.user.create({
    data,
    select:{
      id:true,
      name:true,
      email:true,
      phone:true,
      password:false,
      role:true,
      createdAt:false
    }
  })
}

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

//otp section

export const createOtpRepo = (data:any) => {
  return prisma.otp.create({
    data
  })
}

export const findOtpRepo = (email:string,type:string) => {
  return prisma.otp.findFirst({
    where:{
      email,
      type,
      verified:false
    }
  })
}

export const verifyOtpRepo = (id:number) => {
  return prisma.otp.update({
    where:{ id },
    data:{ verified:true }
  })
}

export const updateUserVerified = (email:string) => {
  return prisma.user.update({
    where:{ email },
    data:{ isVerified:true }
  })
}

export const deleteMetaData = (id:number) =>{
  return prisma.otp.delete({
    where:{id}
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