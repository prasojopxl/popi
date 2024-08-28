import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from 'express';
import joi from "joi"
import logger from "../../lib/logger";

const prisma = new PrismaClient()

export function postCategoryProduct(req: Request, res: Response, next: NextFunction) {
    const checkCategory = async () => {
        const category = await prisma.product_categories.findUnique({
            where: {
                title: req.body.title
            }
        })
        return category
    }
    checkCategory().then((item: any) => {
        if (item) {
            return res.status(400).send({
                message: `Category ${req.body.title} already exists`
            })
        }
    })

    async function main() {
        try {
            await prisma.product_categories.create({
                data: {
                    title: req.body.title,
                    status: req.body.status
                }
            })
            res.send({
                message: `Category ${req.body.title} created successfully`
            })
        } catch (error) {
            logger.error(error)
        }
    }
    main()

}

export function getCategories(req: Request, res: Response, next: NextFunction) {
    async function main() {
        try {
            const status: boolean | null = req.query.status === 'true' ? true : req.query.status === 'false' ? false : null;
            if (status !== null) {
                const categories = await prisma.product_categories.findMany({
                    where: {
                        status,
                    },
                    include: {
                        products: true,
                    }
                });
                res.json({
                    total: categories.length,
                    data: categories
                });
            }
            else {
                res.json(await prisma.product_categories.findMany({
                    include: {
                        products: true
                    }
                }))
            }

        } catch (error) {
            logger.error(error)
        }
    }
    main()
}

export function getCategoriesById(req: Request, res: Response, next: NextFunction) {
    async function main() {
        try {
            const category = await prisma.product_categories.findUnique({
                where: {
                    id: req.params.id
                }
            })
            res.json({
                data: category
            })
        } catch (error) {
            logger.error(error)
        }
    }

    main()
}

export async function updateCategoryProduct(req: Request, res: Response, next: NextFunction) {
    const schema = joi.object().keys({
        title: joi.string(),
        status: joi.boolean(),
    })
    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).send({
            message: error.message
        })
    }

    const checkCategory = async () => {
        const category = await prisma.product_categories.findFirst({
            where: {
                id: req.params.id
            }
        })
        return category
    }


    const category = await checkCategory()

    if (category === null) {
        return res.status(400).send({
            message: `Category ${req.params.id} not found`
        })
    } else {
        async function main() {
            try {
                const category = await prisma.product_categories.update({
                    where: {
                        id: req.params.id
                    },
                    data: {
                        status: req.body.status,
                        title: req.body.title
                    }
                })
                res.json({
                    message: "Category has been update",
                    category
                })
            } catch (error) {
                logger.error(error)
            }

        }
        main()

    }


}

export async function deleteCategoryProduct(req: Request, res: Response, next: NextFunction) {
    async function main() {
        const checkCategory = await prisma.product_categories.findUnique({
            where: {
                id: req.params.id
            }
        })
        if (!checkCategory) {
            return res.status(400).send({
                message: "Category not found"
            })
        }

        try {
            const category = await prisma.product_categories.delete({
                where: {
                    id: req.params.id
                }
            })
            res.json({
                message: `Category ${req.params.id} deleted successfully`
            })
        } catch (error) {
            logger.error(error)
        }
    }
    main()
}