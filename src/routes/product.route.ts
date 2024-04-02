import { getProductByIdController, getProductController, postProductController, updateProductController, deleteProductController } from "../controllers/product.controller";
import { Router } from "express";
import { auntenticateAdmin ,auntenticateStaf} from "../controllers/error.controller";

export const productRoute = Router()

productRoute.get('/product', auntenticateAdmin, getProductController)
productRoute.get('/product/:id',auntenticateStaf, getProductByIdController)
productRoute.post('/product', postProductController)
productRoute.put('/product/:id', updateProductController)
productRoute.delete('/product/:id', deleteProductController)