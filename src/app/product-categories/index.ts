import express from "express"
import { verfyToken } from "../middleware/token"
import { deleteCategoryProduct, getCategories, getCategoriesById, postCategoryProduct, updateCategoryProduct } from "./controller"

const app = express()

app.route("/")
    .get(getCategories)
    .post(verfyToken, postCategoryProduct)

app.route("/:id")
    .get(getCategoriesById)
    .put(verfyToken, updateCategoryProduct)
    .delete(verfyToken, deleteCategoryProduct)




export default app