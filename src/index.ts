import express,{Request,Response} from "express";
import cors from "cors";
import rateLimit from "express-rate-limit"
import fs from "fs";
import path from "path";
import morgan from "morgan"
import compression from "compression"
import dotenv from "dotenv";
import helmet from "helmet";
dotenv.config();

import { env } from "./config/env";
import authRoutes from "./modules/Authentication/auth.routes";
import shopRoutes from "./modules/Shop/shop.routes";
import userRoutes from "./modules/User/user.routes";
import productunitRoutes from "./modules/productUnit/productUnit.routes";
import productRoutes from "./modules/product/product.routes";
import { errorHandler } from "./middlewares/error.middleware";
import { serverAdapter } from "./config/bullBoard";


const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
})

app.use(morgan("combined", { stream: accessLogStream }));
app.use(cors({ origin: `http://localhost:${env.PORT}`,credentials: true}))
app.use(express.json());
app.use(compression({level:6,threshold:1024}))
app.use(limiter)
app.use(helmet());



//Routes
app.use("/api/auth", authRoutes);
app.use("/api/shops",shopRoutes);
app.use("/api/users",userRoutes);
app.use("/api/prductunit",productunitRoutes);
app.use("/api/products",productRoutes);

app.use("/admin/queues", serverAdapter.getRouter());
app.get('/',(req:Request,res:Response)=>{
    res.send("This is a localserver!!!!")
})

// api speed test
// app.get("/", (req: Request, res: Response) => {
//   res.json({
//     message: "Server running",
//     data: new Array(4000).fill("test-data")
//   });
// });

//Error Handler
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server running on port http://localhost:3000`);
});