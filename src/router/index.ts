import { Router } from "express";

import notice from "./notice/notice.router";
import auth from "./auth/auth.router"

import ErrorHandler from "./Handler";

const router = Router()

router.use("/notice", notice)
router.use("/auth", auth)

// 404 처리
router.use(ErrorHandler.notFoundHandler);

// 에러 핸들러
router.use(ErrorHandler.errorHandler);

export default router;