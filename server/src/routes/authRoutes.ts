import { Router } from "express";
import {login,resetPassword,updatePasswordByLinkVerification} from "../controllers/authController"
const router: Router = Router();

router.post("/login", login);
router.post("/resetPassword", resetPassword);
router.post("/update-password-verification", updatePasswordByLinkVerification);

export default router