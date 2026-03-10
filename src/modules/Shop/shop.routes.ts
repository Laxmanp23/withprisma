import express from "express"
import { createShop } from "./shop.controller"

const router = express.Router()

router.post("/",createShop)

export default router