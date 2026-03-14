import express from "express"
import { createShop } from "./shop.controller"
import { authMiddleware } from "../../middlewares/auth.middleware"

const router = express.Router()

router.post("/",authMiddleware,createShop)

export default router