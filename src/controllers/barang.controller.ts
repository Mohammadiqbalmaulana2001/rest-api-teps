import { NextFunction, Request, Response } from "express";
import { barangValidation } from "../validations/barang.validation";
import { deleteBarangService, getBarangByIdService, getBarangService, postBarangService, updateBarangService } from "../services/barang.services";
export const getBarang = async(req: Request, res: Response , next : NextFunction) => {
    try {
        const data = await getBarangService()
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

export const getBarangById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const data = await getBarangByIdService(parseInt(id))
        if(data) {
            return res.status(200).json({
                error : null,
                message: "data berhasil diambil",
                data
            })
        }else if (!data) {
            return res.status(404).json({
                error : null,
                message: "data tidak ditemukan",
                data
            })
        }else{
            return res.status(500).json({
                error : null,
                message: "data gagal diambil",
                data
            })
        }
        
    } catch (error) {
        next(
            new Error(
                'Error pada file src/controllers/barang.controller.ts : getBarangById - ' +
                String((error as Error).message)
            )
        )
    }
}

export const postBarang = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {error , value} = barangValidation(req.body)

        if (error != null) {
            return res.status(400).json({
                error : error.details[0].message,
                message: "Barang gagal ditambahkan",
                data: value
            })
        }
        const barang = await postBarangService(value)
        return res.status(201).json({
            error : null,
            message: "Barang berhasil ditambahkan",
            data: barang
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

export const updateBarang = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const {error , value} = barangValidation(req.body)

        if (error != null) {
            return res.status(400).json({
                error : error.details[0].message,
                message: "Barang gagal diupdate",
                data: value
            })
        }

        const dataBarang = await updateBarangService({...value, id : parseInt(id)})
        return res.status(200).json({
            error : null,
            message: "Barang berhasil diupdate",
            data: dataBarang
        })
    } catch (error) {
        next(
            new Error(
                'Error pada file src/controllers/barang.controller.ts : updateDataBarang - ' +
                String((error as Error).message)
            )
        )
    }
}

export const deleteBarang = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const data = await getBarangByIdService(parseInt(id))
        if(data) {
            await deleteBarangService(data)
            return res.status(200).json({
                error : null,
                message: "Barang berhasil dihapus",
                data
            })
        }else if (!data) {
            return res.status(404).json({
                error : null,
                message: "Barang tidak ditemukan",
                data
            })
        }else{
            return res.status(500).json({
                error : null,
                message: "Barang gagal dihapus",
                data
            })
        }
    } catch (error) {
        next(
            new Error(
                'Error pada file src/controllers/barang.controller.ts : deleteDataBarang - ' +
                String((error as Error).message)
            )
        )
    }
}