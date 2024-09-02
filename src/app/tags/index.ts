import express from "express"
import { verfyToken } from "../middleware/token"
import { deleteTag, getAllTags, getTagById, postTags, updateTag } from "./controller"

const app = express()

app.route("/")
    .post(verfyToken, postTags)
    .get(getAllTags)

app.route("/:id")
    .get(getTagById)
    .put(verfyToken, updateTag)
    .delete(verfyToken, deleteTag)

export default app
