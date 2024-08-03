import express from "express"
import { createImage, deleteImage, getImageID, getImages } from "./controller"

const app = express()

app.route("/")
    .get(getImages)
    .post(createImage)

app.route("/:id")
    .get(getImageID)
    .delete(deleteImage)

export default app