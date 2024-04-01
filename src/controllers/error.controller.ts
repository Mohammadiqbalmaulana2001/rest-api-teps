import { Request , Response, NextFunction } from "express";
import { logger } from "../utils/winston";

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