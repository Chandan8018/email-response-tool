import express from "express";
import { googleAuth, outlookAuth} from "../controllers/auth.controller";

const router = express.Router();

router.post("/google", googleAuth);
router.post("/outlook", outlookAuth);

export default router;