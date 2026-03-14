import { Router } from "express";
import { UserController } from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireShop } from "../../middlewares/shop.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createUserSchema, updateUserSchema, idParamSchema } from "../../validators/user.validator";

const router = Router();
const controller = new UserController();

router.post("/cusers", validate(createUserSchema), authMiddleware, controller.createStaff);
router.get("/gusers", authMiddleware, requireShop, controller.getUsers);
router.get("/users/:id", authMiddleware, validate(idParamSchema), controller.getUser);
router.put("/users/:id", authMiddleware, validate(updateUserSchema), controller.updateUser);
router.delete("/users/:id", authMiddleware, validate(idParamSchema, "params"), controller.deleteUser
);

export default router;