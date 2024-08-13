import express from "express"
import { verfyToken } from "../middleware/token"
import { getProducts, postProduct } from "./controller"

const app = express()

app.route("/")
    .get(verfyToken, getProducts)
    .post(verfyToken, postProduct)

export default app
