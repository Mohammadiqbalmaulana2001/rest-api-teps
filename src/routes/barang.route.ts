import { Router } from "express";
import { getBarang, postBarang } from "../controllers/barang.controller";

export const barangRoute = Router();

barangRoute.get("/barang", getBarang)
barangRoute.post("/barang", postBarang)