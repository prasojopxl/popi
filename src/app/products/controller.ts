import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from 'express';
import joi from "joi"
import logger from "../../lib/logger";
import _ from "lodash"

const prisma = new PrismaClient()

export function postProduct(req: Request, res: Response, next: NextFunction) {
    const schema = joi.object().keys({
        title: joi.string().required(),
        status: joi.boolean().required(),
        description: joi.string().required(),
        price: joi.number().required(),
        stock: joi.number().required(),
        recommended: joi.boolean().required(),
        rate_count: joi.number().required()
    })

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).send({
            message: error.message
        })
    }

    const checkProduct = async () => {
        const product = await prisma.products.findFirst({
            where: {
                title: req.body.title
            }
        })
        return product
    }
    checkProduct().then((product) => {
        if (product) {
            return res.status(400).send({
                message: "Product already exists"
            })
        }
    })

    async function main() {
        try {
            await prisma.products.create({
                data: {
                    title: req.body.title,
                    status: req.body.status,
                    description: req.body.description,
                    price: req.body.price,
                    stock: req.body.stock,
                    recommended: req.body.recommended,
                    rate_count: req.body.rate_count                    
                }
            })
            res.send({
                message: `Product ${req.body.title} created successfully`,
            })
        } catch (error) {
            logger.error(error)
        }
    }
    main()
}

export function getProducts(req: Request, res: Response, next: NextFunction) {
    async function main() {
        try {
            const products = await prisma.products.findMany({
                include: {
                    category: true
                }
            })
            const data = _.orderBy(products, ['updated_at'], ['desc'])
            res.json(data)
        } catch (error) {
            logger.error(error)
        }
    }
    main()
}