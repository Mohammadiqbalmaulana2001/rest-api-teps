import { Router } from "express";
import { loginUserController, registerUserController } from "../controllers/user.controller";

export const userRoute = Router()

userRoute.post('/register', registerUserController)
userRoute.post('/login', loginUserController)