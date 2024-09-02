import express from "express"
import { verfyToken } from "../middleware/token"
import { getAllVariants, postVariantProducts } from "./controller"


const app = express()

app.route("/")
    .get(getAllVariants)
    .post(verfyToken, postVariantProducts)

export default app
