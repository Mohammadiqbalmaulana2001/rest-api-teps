import { Router , Request, Response} from "express";
import { barangValidation } from "../validations/barang.validation";

export const barangRoute = Router();

barangRoute.get("/barang", (req: Request, res: Response) => {
    res.json({
        message: "Hello World"
    })
})

barangRoute.post("/barang", (req: Request, res: Response) => {
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
})