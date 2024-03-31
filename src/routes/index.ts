import { Router } from "express";
import { barangRoute } from "./barang.route";

const app = Router();

app.use('/api' , barangRoute)

export default app