import { Request , Response, NextFunction } from "express";
import { logger } from "../utils/winston";
import { verifyAccessToken } from "../utils/jwt";

export const errorHandler = async (err: Error, req:Request, res: Response, next: NextFunction): Promise<void> => {
    const message = err.message.split(' - ')[1]
    logger.error(err)
    res.status(500).json({
        error: message,
        message: "Terjadi kesalahan pada server",
        data: null
    })
}

export const notFound = async (req:Request, res: Response, next: NextFunction): Promise<void> => {
    res.status(404).json({
        error: "Endpoint Tidak ditemukan",
        message: "Endpoint Tidak ditemukan",
        data: null
    })
}

export const auntenticate = async (req:Request, res: Response, next: NextFunction) => {
    const authHeadder = req.headers.authorization
    const token = authHeadder?.split(' ')[1]
    if(token === undefined){
        return res.status(401).json({
            error: "Unauthorized",
            message: "Verifikasi token gagal",
            data: null
        })
    }

    const user = verifyAccessToken(String(token))
    if (user === null) {
        return res.status(401).json({
            error: "Token tidak valid",
            message: "Verifikasi token gagal",
            data: null
        })
    }
    next()
}