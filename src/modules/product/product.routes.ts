// product.routes.ts

import { Router } from "express";
import { ProductController } from "./product.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
const router = Router();
const controller = new ProductController();

router.post("/", authMiddleware,controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.patch("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;