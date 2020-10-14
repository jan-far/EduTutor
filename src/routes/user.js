import { Router } from "express";
import { Auth } from "../controller";
import { checkEmailExist, ValidateBody } from "../middlewares";

const router = Router();

router.post("/signup", ValidateBody, Auth.register);
router.post("/signin", Auth.login);

export default router;
