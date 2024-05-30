import express from "express";
import { googleAuth, outlookAuth} from "../controllers/auth.controller";

const router = express.Router();

router.get("/google", googleAuth);
router.get("/outlook", outlookAuth);

export default router;