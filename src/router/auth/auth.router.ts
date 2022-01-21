import { Router } from "express";
import Controller from "../Controller";
import AuthController from "./auth.controller"

const router = Router()

router.post("/login", AuthController.login)

router.post("/register", AuthController.register)

router.get("/profile", Controller.authenticate, AuthController.getProfile)

router.post("/profile-image", Controller.authenticate, AuthController.setProfileImage)

export default router