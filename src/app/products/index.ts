import express from "express"
import { verfyToken } from "../middleware/token"
import { getProducts, getProductsById, postProduct, updateProduct } from "./controller"

const app = express()

app.route("/")
    .get(getProducts)
    .post(verfyToken, postProduct)

app.route("/:id")
    .get(getProductsById)
    .put(updateProduct)

export default app
