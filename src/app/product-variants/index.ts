import express from "express"
import { verfyToken } from "../middleware/token"
import { deleteVariantProduct, getAllVariants, getVariantsById, postVariantProducts, updateVariantsProduct } from "./controller"


const app = express()

app.route("/")
    .get(getAllVariants)
    .post(verfyToken, postVariantProducts)

app.route("/:id")
    .get(getVariantsById)
    .put(verfyToken, updateVariantsProduct)
    .delete(verfyToken, deleteVariantProduct)


export default app
