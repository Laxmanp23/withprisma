import fs from "fs"
import path from "path"

export const getOtpEmailTemplate = (name:string, otp:string) => {

  const filePath = path.join(__dirname,"../templates/otpEmail.html")

  let html = fs.readFileSync(filePath,"utf8")

  html = html.replace("{{name}}",name)
  html = html.replace("{{otp}}",otp)

  return html
}