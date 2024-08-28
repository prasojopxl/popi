import express from "express"
import { verfyToken } from "../middleware/token"
import { deleteProduct, getProducts, getProductsById, postProduct, updateProduct } from "./controller"

const app = express()

app.route("/")
    .get(getProducts)
    .post(verfyToken, postProduct)

app.route("/:id")
    .get(getProductsById)
    .put(verfyToken, updateProduct)
    .delete(verfyToken, deleteProduct)

export default app
