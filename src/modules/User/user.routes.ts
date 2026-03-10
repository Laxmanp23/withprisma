import { Router } from "express";
import { UserController } from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import{requireShop} from "../../middlewares/shop.middleware";
import { validate }  from "../../middlewares/validate.middleware";
import { userResponseSchema } from "../../validators/user.validator";

const router = Router();
const controller = new UserController();

router.post("/users",validate(userResponseSchema),authMiddleware, controller.createStaff);
router.get("/users" ,authMiddleware,requireShop, controller.getUsers);
router.get("/users/:id", authMiddleware, controller.getUser);
router.put("/users/:id", authMiddleware, controller.updateUser);
router.delete("/users/:id", authMiddleware, controller.deleteUser);

export default router;