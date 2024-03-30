import express, { Application ,Request ,Response , NextFunction} from "express";
import dotenv from "dotenv";

const app:Application = express();
dotenv.config();

app.get('/', (req : Request, res : Response, next : NextFunction) => {
    res.json({message:"Hello World"})
})
const  port:number = parseInt(process.env.PORT as string)
app.listen(port, () => {
    console.log(`server berjalan pada http://localhost:${port}`)
})