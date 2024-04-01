import { NextFunction , Request , Response } from "express";
import { loginUserValidation, registerUserValidation } from "../validations/user.validation";
import { loginUserService, registerUserService } from "../services/user.service";
import { compare, encript } from "../utils/bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import jsonwebtoken from "jsonwebtoken";


export const registerUserController = async(req: Request, res: Response , next : NextFunction) => {
    try {
        const {error , value} = registerUserValidation(req.body)

        if (error != null) {
            return res.status(400).json({
                error : error.details[0].message,
                message: "User gagal ditambahkan",
                data: value
            })
        }
        value.password = encript(value.password)
        delete value.confirmPassword
        const user = await registerUserService({...value})
        return res.status(201).json({
            error : null,
            message: "User berhasil ditambahkan",
            data: user
        })
    } catch (error) {
        next(
            new Error(
                'Error pada file src/controllers/user.controller.ts : insertDataUser - ' +
                String((error as Error).message)
            )
        )
    }
}

export const loginUserController = async(req: Request, res: Response , next : NextFunction) => {
    try {
        const {error , value} = loginUserValidation(req.body)

        if(error != null) {
            return res.status(400).json({
                error : error.details[0].message,
                message: "Login gagal",
                data: value
            })
        }

        const user = await loginUserService({...value})
        
        if(user == null) {
            return res.status(404).json({
                error : null,
                message: "email tidak ditemukan",
                data: null
            })
        }
        if(!compare(value.password , user.password)) {
            return res.status(400).json({
                error : 'Password tidak sesuai',
                message: "Login gagal",
                data: null
            })
        }

        const accesToken = generateAccessToken(user)
        const refresToken = generateRefreshToken(user)
        return res.status(200).json({
            error : null,
            message: "Login berhasil",
            data: user,
            accesToken,
            refresToken
        })
    } catch (error) {
        next(
            new Error(
                'Error pada file src/controllers/user.controller.ts : loginUser - ' +
                String((error as Error).message)
            )
        )
    }
}