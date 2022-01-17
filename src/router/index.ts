import { Router } from "express";

import notice from "./notice/notice.router";
import auth from "./auth/auth.router"

const router = Router()

router.use("/notice", notice)
router.use("/auth", auth)

export default router;