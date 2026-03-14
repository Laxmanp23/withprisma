import dotenv from "dotenv"
dotenv.config()

import { Worker } from "bullmq"
import { redisConfig } from "../config/redis"
import { sendEmail } from "../utils/sendEmail"

const emailWorker = new Worker(
  "emailQueue",
  async (job) => {

    console.log("JOB RECEIVED:", job.id, job.name)

    const { email, subject, html } = job.data

    await sendEmail(email, subject, html)

  },
  {
    connection: redisConfig
  }
)

emailWorker.on("completed", (job) => {
  console.log("EMAIL JOB COMPLETED:", job.id)
})

emailWorker.on("failed", (job, err) => {
  console.error("EMAIL JOB FAILED:", job?.id, err.message)
})

emailWorker.on("error", (err) => {
  console.error("EMAIL WORKER ERROR:", err.message)
})