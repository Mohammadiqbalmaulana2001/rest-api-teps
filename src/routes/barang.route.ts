import { Router } from "express";

export const barangRoute = Router();

barangRoute.get("/barang", (req, res) => {
    res.json({
        message: "Hello World"
    })
})