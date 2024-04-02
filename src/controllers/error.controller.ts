import { Request , Response, NextFunction } from "express";
import { logger } from "../utils/winston";
import { verifyAccessToken } from "../utils/jwt";
import prisma from "../utils/prismaClient";

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

export const auntenticateAdmin = async (req:Request, res: Response, next: NextFunction) => {
    const authHeadder = req.headers.authorization
    const token = authHeadder?.split(' ')[1]
    if(token === undefined){
        return res.status(401).json({
            error: "Unauthorized",
            message: "Verifikasi token gagal",
            data: null
        })
    }

    const user = verifyAccessToken(token)
    
    if (user === null || typeof user === 'string' || !('email' in user)) {
        return res.status(401).json({
            error: "Unauthorized",
            message: "Token tidak valid",
            data: null
        });
    }

    try {
        const userData = await prisma.user.findUnique({
            where : {email : user.email}
        })
        if(!userData || userData.role !== 'admin') {
            return res.status(401).json({
                error: "Forbidden",
                message: "Amda bukan admin",
                data: null
            });
        }

        next()
    } catch (error) {
        next(error)
    }
}

export const auntenticateStaf = async (req:Request, res: Response, next: NextFunction) => {
    const authHeadder = req.headers.authorization
    const token = authHeadder?.split(' ')[1]
    if(token === undefined){
        return res.status(401).json({
            error: "Unauthorized",
            message: "Verifikasi token gagal",
            data: null
        })
    }

    const user = verifyAccessToken(token)
    
    if (user === null || typeof user === 'string' || !('email' in user)) {
        return res.status(401).json({
            error: "Unauthorized",
            message: "Token tidak valid",
            data: null
        });
    }
    try {
        const userData = await prisma.user.findUnique({
            where : {email : user.email}
        })
        if(!userData || userData.role !== 'staf' && userData.role !== 'admin') {
            return res.status(401).json({
                error: "Forbidden",
                message: "Amda bukan staf",
                data: null
            });
        }

        next()
    } catch (error) {
        next(error)
    }
}