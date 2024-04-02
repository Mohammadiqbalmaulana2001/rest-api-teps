import "dotenv/config";
import web from "./middleware/web.middleware";

const  port:number = parseInt(process.env.PORT as string)

web.listen(port, () => {
    console.log(`server berjalan pada http://localhost:${port}`)
})