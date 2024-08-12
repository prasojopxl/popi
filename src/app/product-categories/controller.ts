import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from 'express';
import joi from "joi"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken";
import logger from "../../lib/logger";

const prisma = new PrismaClient()

export function postCategoryProduct(req: Request, res: Response, next: NextFunction) {
    const schema = joi.object().keys({
        title: joi.string().required(),
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
                title: req.body.title,
            }
        })
        return category
    }

    checkCategory().then((cat)=> {
        if(cat) {
            return res.status(400).send({
                message: "Category already exists"
            })
        }
    })



    async function main() {
        try {
            await prisma.product_categories.create({
                data: {
                    title: req.body.title,
                    status: req.body.status,
                    products:{}                    
                }
            })

            res.send({
                message: `Category ${req.body.title} created successfully`,
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
            return res.json(await prisma.product_categories.findMany())
        } catch (error) {
            logger.error(error)
        }
    }
    main()
}