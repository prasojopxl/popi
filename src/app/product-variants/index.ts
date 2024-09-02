import express from "express"
import { verfyToken } from "../middleware/token"
import { getAllVariants, getVariantsById, postVariantProducts } from "./controller"


const app = express()

app.route("/")
    .get(getAllVariants)
    .post(verfyToken, postVariantProducts)

app.route("/:id")
    .get(getVariantsById)

export default app
