import express from "express"
import { verfyToken } from "../middleware/token"
import { getAllVariants, getVariantsById, postVariantProducts, updateVariantsProduct } from "./controller"


const app = express()

app.route("/")
    .get(getAllVariants)
    .post(verfyToken, postVariantProducts)

app.route("/:id")
    .get(getVariantsById)
    .put(verfyToken, updateVariantsProduct)

export default app
