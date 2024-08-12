import express from "express"
import { verfyToken } from "../middleware/token"
import { getCategories, postCategoryProduct } from "./controller"

const app = express()

app.route("/")
    .get(verfyToken, getCategories)
    .post(verfyToken, postCategoryProduct)

export default app