import express, { Application ,Request ,Response , NextFunction} from "express";
import dotenv from "dotenv";
import appMidleware from "./middleware/index.middleware";

const app:Application = express();
dotenv.config();

app.use(appMidleware)

const  port:number = parseInt(process.env.PORT as string)
app.listen(port, () => {
    console.log(`server berjalan pada http://localhost:${port}`)
})