import { NextFunction, Request, Response } from "express";
import { barangValidation } from "../validations/barang.validation";
export const getBarang = (req: Request, res: Response , next : NextFunction) => {
    try {
        const data =[
            {
                id : 1,
                nama : "kursi",
                jumlah : 10,
                harga : 20000
            },
            {
                id : 2,
                nama : "meja",
                jumlah : 5,
                harga : 10000
            },
            {
                id : 3,
                nama : "lemari",
                jumlah : 2,
                harga : 50000
            }
        ]
        res.status(200).json({
            error : null,
            message: "data berhasil diambil",
            data
        })
    } catch (error) {
        res.status(500).json({
            error : error,
            message: "data gagal diambil",
            data: null
        })
    }
}

export const postBarang = (req: Request, res: Response, next: NextFunction) => {
    try {
        const {error , value} = barangValidation(req.body)

        if (error != null) {
            return res.status(400).json({
                error : error.details[0].message,
                message: "Barang gagal ditambahkan",
                data: value
            })
        }
    
        return res.status(201).json({
            error : null,
            message: "Barang berhasil ditambahkan",
            data: value
        })
    } catch (error) {
        next(
            new Error(
                'Error pada file src/controllers/barang.controller.ts : insertDataBarang - ' +
                String((error as Error).message)
            )
        )
    }
}