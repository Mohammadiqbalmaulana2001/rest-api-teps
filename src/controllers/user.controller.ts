import { NextFunction , Request , Response } from "express";
import { registerUserValidation } from "../validations/user.validation";
import { registerUserService } from "../services/user.service";
import { encript } from "../utils/bcrypt";

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