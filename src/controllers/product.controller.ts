import { NextFunction, Request, Response } from "express";
import { deleteProductService, getProductByIdService, getProductService, postProductService, updateProductService } from "../services/product.service";
import { productValidation } from "../validations/product.validation";

export const getProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await getProductService()
        if (data == null || data.length == 0) {
            return res.status(404).json({
                error : null,
                message: "data tidak ditemukan",
                data
            })
        }
        res.status(200).json({
            error : null,
            message: "data berhasil diambil",
            data
        })
    } catch (error) {
        next(
            new Error(
                'Error pada file src/controllers/product.controller.ts : getProductController - ' +
                String((error as Error).message)
            )
        )
    }
}

export const getProductByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const data = await getProductByIdService(parseInt(id))

        if(data){
            return res.status(200).json({
                error : null,
                message: "data berhasil diambil",
                data
            })
        }else if(!data){
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
                'Error pada file src/controllers/product.controller.ts : getProductByIdController - ' +
                String((error as Error).message)
            )
        )
    }
}

export const postProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error, value } = productValidation(req.body)
        if(error != null) {
            return res.status(400).json({
                error : error.details[0].message,
                message: "data gagal ditambahkan",
                data: value
            })
        }

        const data = await postProductService(value)
        
        return res.status(201).json({
            error : null,
            message: "data berhasil ditambahkan",
            data
        })
    } catch (error) {
        next(
            new Error(
                'Error pada file src/controllers/product.controller.ts : postProductController - ' +
                String((error as Error).message)
            )
        )
    }
}

export const updateProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const { error, value } = productValidation(req.body)
        if(error != null) {
            return res.status(400).json({
                error : error.details[0].message,
                message: "data gagal diubah",
                data: value
            })
        }
        const dataProduct = await updateProductService({...value, id : parseInt(id)})
        res.status(200).json({
            error : null,
            message: "data berhasil diubah",
            data : dataProduct
        })
    } catch (error) {
        next(
            new Error(
                'Error pada file src/controllers/product.controller.ts : updateProductController - ' +
                String((error as Error).message)
            )
        )
    }
}

export const deleteProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const data = await getProductByIdService(parseInt(id))
        if(data) {
            await deleteProductService(data)
            res.status(200).json({
                error : null,
                message: "data berhasil di hapus",
                data
            })
        }else if(!data){
            res.status(404).json({
                error : null,
                message: "data tidak ditemukan",
                data
            })
        }else {
            res.status(500).json({
                error : null,
                message: "data gagal di hapus",
                data
            })
        }
            
    } catch (error) {
        next(
            new Error(
                'Error pada file src/controllers/product.controller.ts : deleteProductController - ' +
                String((error as Error).message)
            )
        )
    }
}