// Import all routes folders here, so as to import from the root by other folder
import { Router } from "express";
import userRouter from "./user";

const router = Router();

router.use(userRouter)

export default router;
