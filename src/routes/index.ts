import { Router } from "express";
import { barangRoute } from "./barang.route";
import { errorHandler, notFound } from "../controllers/error.controller";
import { userRoute } from "./user.route";

const app = Router();

app.use('/api' , barangRoute)
app.use('/api' , userRoute)

app.use('*', errorHandler)
app.use('*', notFound)

export default app