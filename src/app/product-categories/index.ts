import express from "express"
import { verfyToken } from "../middleware/token"
import {  deleteCategoryProduct, getCategories, postCategoryProduct, updateCategoryProduct } from "./controller"

const app = express()

app.route("/")
    .get(getCategories)
    .post(verfyToken, postCategoryProduct)

app.route("/:id")
    .get(getCategories)
    .put(verfyToken, updateCategoryProduct)
    .delete(verfyToken, deleteCategoryProduct)



    
export default app