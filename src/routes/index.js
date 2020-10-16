// Import all routes folders here, so as to import from the root by other folder
import { Router } from "express";
import userRouter from "./user";
import subjectRouter from "./subject";

const router = Router();

router.use(userRouter);
router.use(subjectRouter);


export default router;
