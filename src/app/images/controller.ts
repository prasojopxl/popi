import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client'
import imageSize from "image-size";
import joi from "joi"
import _ from "lodash";

const path = require('path');
const prisma = new PrismaClient()

export function createImage(req: Request, res: Response, next: NextFunction) {
    const files: any = req.files
    const schema = joi.object().keys({
        files: joi.array().items(joi.object({
            fieldname: joi.string().required(),
            originalname: joi.string().required(),
            encoding: joi.string().required(),
            mimetype: joi.string().required(),
            destination: joi.string().required(),
            filename: joi.string().required(),
            path: joi.string().required(),
            size: joi.number().max(1000000).required(),
        })).required(),
    })
    const { error } = schema.validate({ files })
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        })
    }

    async function main() {
        try {
            const images = await Promise.all(files.map(async (file: any) => {
                return await prisma.images.create({
                    data: {
                        title: file.originalname,
                        url: `/public/${file.filename}`,
                        size: parseInt(file.size),
                        width: parseInt(`${imageSize(file.path).width}`),
                        height: parseInt(`${imageSize(file.path).height}`),
                        mimetype: file.mimetype
                    }
                })
            }))
            res.status(201).send({
                message: "Images upload successfully",
                data: images?.map((image: any) => ({
                    title: image.title,
                    url: image.url,
                    mimetype: image.mimetype
                }))
            })
        } catch (error) {
            console.log(error)
        }

    }
    main()
}

export function getImageID(req: Request, res: Response, next: NextFunction) {
    async function main() {
        try {

            const image: any = await prisma.images?.findUnique({
                where: {
                    id: req.params.id
                },

            })
            if (!image) {
                return res.status(400).send({
                    message: "Image not found"
                })
            }
            delete image?.UserId
            res.json(image)
        } catch (error) {
            console.log(error)
        }
    }
    main()
}

export function getImages(req: Request, res: Response, next: NextFunction) {
    async function main() {
        try {
            const images: any = await prisma.images.findMany()
            const imagesData = _.map(images, (image) => _.omit(image, "userId"))
            res.json(imagesData)
        } catch (error) {
            console.log(error)
        }
    }
    main()
}

export function deleteImage(req: Request, res: Response, next: NextFunction) {
    async function main() {
        try {
            const image = await prisma.images.delete({
                where: {
                    id: req.params.id
                }
            })
            res.json({
                message: `Image ${req.params.id} deleted successfully`,
            })
        } catch (error) {
            console.log(error)
        }
    }
    main()
}