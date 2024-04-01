import { Router } from "express";
import { loginUserController, refreshTokenController, registerUserController } from "../controllers/user.controller";

export const userRoute = Router()

userRoute.post('/register', registerUserController)
userRoute.post('/login', loginUserController)
userRoute.get('/refresh', refreshTokenController)