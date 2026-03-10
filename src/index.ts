import express,{Request,Response} from "express";
import authRoutes from "./modules/Authentication/auth.routes";
import shopRoutes from "./modules/Shop/shop.routes";
import userRoutes from "./modules/User/user.routes";
import { errorHandler } from "./middlewares/error.middleware";
import { authMiddleware } from "./middlewares/auth.middleware";
import {requireShop} from "./middlewares/shop.middleware"


const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/shops",authMiddleware,shopRoutes);
app.use("/users",userRoutes);
app.use(errorHandler);

app.get('/',(req:Request,res:Response)=>{
    res.send("This is a localserver!!!!")
})


app.listen(3000, () => {
  console.log(`Server running on port http://localhost:3000`);
});