import { Router } from "express";
import noticeController from "./notice.controller";

const router = Router();

router.get("/", noticeController.notices)

export default router;