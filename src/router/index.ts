import { Router } from "express";

import notice from "./notice/notice.router";

const router = Router();

router.use("/notice", notice);

export default router;