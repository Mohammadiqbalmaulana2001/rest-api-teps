import { Router } from "express";
import { deleteBarang, getBarang, getBarangById, postBarang, updateBarang } from "../controllers/barang.controller";
import { auntenticate } from "../controllers/error.controller";

export const barangRoute = Router();

barangRoute.get("/barang",auntenticate, getBarang)
barangRoute.get("/barang/:id", getBarangById)
barangRoute.post("/barang", postBarang)
barangRoute.put("/barang/:id", updateBarang)
barangRoute.delete("/barang/:id", deleteBarang)