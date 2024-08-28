import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from 'express';
import joi, { func } from "joi"
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
        rate_count: joi.number().required(),
        categories: joi.array().required()
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
                    rate_count: req.body.rate_count,
                    categories: {
                        connect: req.body.product_categories.map((categoryId: string) => ({
                            id: categoryId
                        })),
                    }
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
                    images: true,
                    categories: true,
                    variants: true,
                    tags: true,
                    promos: true,
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

export function getProductsById(req: Request, res: Response, next: NextFunction) {
    async function main() {
        try {
            const product = await prisma.products.findUnique({
                where: {
                    id: req.params.id
                },
                include: {
                    images: true,
                    categories: true,
                    variants: true,
                    tags: true,
                    promos: true,
                }
            })
            res.json(product)
        } catch (error) {
            console.log(error)
        }
    }
    main()
}

export async function updateProduct(req: Request, res: Response, next: NextFunction) {
    const schema = joi.object().keys({
        title: joi.string(),
        status: joi.boolean(),
        description: joi.string(),
        price: joi.number(),
        stock: joi.number(),
        recommended: joi.boolean(),
        rate_count: joi.number(),
        categories: joi.array(),
        images: joi.array()
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
                id: req.params.id
            }
        })
        return product
    }
    const product = await checkProduct()

    if (product === null) {
        return res.status(400).send({
            message: `Product ${req.params.id} not found`
        })
    }
    else {
        async function main() {
            try {
                const deleteCategoryProduct: any = req.query.deletecategory ? req.query.deletecategory : false
                const dataProduct: any = await prisma.products.findUnique({
                    where: {
                        id: req.params.id
                    },
                    select: {
                        categories: {
                            select: {
                                id: true
                            }
                        }
                    }
                })


                if (deleteCategoryProduct) {
                    const hasCategory = dataProduct.categories.some((item: any) => item.id === deleteCategoryProduct);
                    if (!hasCategory) {
                        return res.status(400).send({
                            message: "Product category not found"
                        })
                    }
                    else {
                        await prisma.products.update({
                            where: {
                                id: req.params.id
                            },
                            data: {
                                categories: {
                                    delete: {
                                        id: deleteCategoryProduct
                                    }
                                }
                            }
                        })

                    }

                }
                const product = await prisma.products.update({
                    where: {
                        id: req.params.id
                    },
                    data: {
                        title: req.body.title,
                        status: req.body.status,
                        description: req.body.description,
                        price: req.body.price,
                        stock: req.body.stock,
                        recommended: req.body.recommended,
                        rate_count: req.body.rate_count,
                        categories: req.body.categories ? {
                            connect: req.body.categories.map((categoryId: string) => ({
                                id: categoryId
                            })),
                        } : undefined,
                        images: req.body.images ? {
                            connect: req.body.images.map((imageId: string) => ({
                                id: imageId
                            })),
                        } : undefined,
                    }
                })
                res.json({
                    message: "Product has been update"
                })
            } catch (error) {
                console.log(error)
            }
        }
        main()

    }
}

