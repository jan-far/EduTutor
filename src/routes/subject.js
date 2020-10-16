import { Router } from "express";
import { SubControl, } from "../controller";
import {
  checkRole,
  checkToken,
  ValidateSubjectBody
} from "../middlewares/auth";

const router = Router();

router.post("/subject", ValidateSubjectBody, checkToken, SubControl.create);
router.get("/subject", checkToken, SubControl.findAllSubject)
router.delete("/subject/:id", SubControl.deleteOne)
router.delete("/subject", SubControl.deleteAll)

export default router;