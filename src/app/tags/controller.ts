import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from 'express';
import joi from "joi"
import logger from "../../lib/logger";

const prisma = new PrismaClient()

export function postTags(req: Request, res: Response, next: NextFunction) {
    const schema = joi.object().keys({
        title: joi.string().required()
    })
    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).send({
            message: error.message
        })
    }

    const checkTags = async () => {
        const tag = await prisma.tags.findUnique({
            where: {
                title: req.body.title
            }
        })
        return tag
    }
    checkTags().then((item: any) => {
        if (item) {
            return res.status(400).send({
                message: `Tag ${req.body.title} already exists`
            })
        }
    })

    async function main() {
        try {
            await prisma.tags.create({
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

export function getAllTags(req: Request, res: Response, next: NextFunction) {
    async function main() {
        try {
            const status: boolean | null = req.query.status === 'true' ? true : req.query.status === 'false' ? false : null;
            if (status !== null) {
                const tags = await prisma.tags.findMany({
                    where: {
                        status,
                    },
                    include: {
                        products: true,
                    }
                });
                res.json({
                    total: tags.length,
                    data: tags
                });
            }
            else {
                res.json(await prisma.tags.findMany({
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

export function getTagById(req: Request, res: Response, next: NextFunction) {
    async function main() {
        try {
            const category = await prisma.tags.findUnique({
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

export async function updateTag(req: Request, res: Response, next: NextFunction) {
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

    const checkTag = async () => {
        const tag = await prisma.tags.findFirst({
            where: {
                id: req.params.id
            }
        })
        return tag
    }


    const tag = await checkTag()

    if (tag === null) {
        return res.status(400).send({
            message: `Tag ${req.params.id} not found`
        })
    } else {
        async function main() {
            try {
                const tag = await prisma.tags.update({
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
                    tag
                })
            } catch (error) {
                logger.error(error)
            }

        }
        main()

    }


}

export async function deleteTag(req: Request, res: Response, next: NextFunction) {
    async function main() {
        const checkTag = await prisma.tags.findUnique({
            where: {
                id: req.params.id
            }
        })
        if (!checkTag) {
            return res.status(400).send({
                message: "Tag not found"
            })
        }

        try {
            const tag = await prisma.tags.delete({
                where: {
                    id: req.params.id
                }
            })
            res.json({
                message: `Tag ${req.params.id} deleted successfully`
            })
        } catch (error) {
            logger.error(error)
        }
    }
    main()
}