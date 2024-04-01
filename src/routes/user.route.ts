import { Router } from "express";
import { registerUserController } from "../controllers/user.controller";

export const userRoute = Router()

userRoute.post('/register', registerUserController)