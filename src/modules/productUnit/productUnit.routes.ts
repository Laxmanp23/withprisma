import {Router} from "express"
import { createProductUnit,getProductUnit } from "./productUnit.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
router.post("/createproduct",authMiddleware,createProductUnit);
router.get("/getproductunit",authMiddleware,getProductUnit);

export default router;