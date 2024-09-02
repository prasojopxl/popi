import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from 'express';
import joi from "joi";
import logger from "../../lib/logger";

const prisma = new PrismaClient()

export function postVariantProducts(req: Request, res: Response, next: NextFunction) {
    const checkVariant = async () => {
        const category = await prisma.product_variants.findUnique({
            where: {
                title: req.body.title
            }
        })
        return category
    }
    checkVariant().then((item: any) => {
        if (item) {
            return res.status(400).send({
                message: `Variant ${req.body.title} already exists`
            })
        }
    })

    async function main() {
        try {
            await prisma.product_variants.create({
                data: {
                    title: req.body.title,
                    status: req.body.status
                }
            })
            res.send({
                message: `Variant ${req.body.title} created successfully`
            })
        } catch (error) {
            logger.error(error)
        }
    }
    main()
}

export function getAllVariants(req: Request, res: Response, next: NextFunction) {
    async function main() {
        try {
            try {
                const status: boolean | null = req.query.status === 'true' ? true : req.query.status === 'false' ? false : null;
                if (status !== null) {
                    const variants = await prisma.product_variants.findMany({
                        where: {
                            status,
                        },
                        include: {
                            products: true,
                        }
                    });
                    res.json({
                        total: variants.length,
                        data: variants
                    });
                }
                else {
                    res.json(await prisma.product_variants.findMany({
                        include: {
                            products: true
                        }
                    }))
                }

            } catch (error) {
                logger.error(error)
            }
        } catch (error) {
            logger.error(error)
        }
    }
    main()
}

export function getVariantsById(req: Request, res: Response, next: NextFunction) {
    async function main() {
        try {
            const variants = await prisma.product_variants.findUnique({
                where: {
                    id: req.params.id
                }
            })
            res.json({
                data: variants
            })
        } catch (error) {
            logger.error(error)
        }
    }

    main()
}
