import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from 'express';
import joi from "joi"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken";

const prisma = new PrismaClient()

export function postCategoryProduct(req: Request, res: Response, next: NextFunction) {
    const shcema = joi.object().keys({
        title: joi.string().required(),
        status: joi.boolean().required(),
    })
    const { error } = shcema.validate(req.body)
    if (error) {
        return res.status(400).send({
            message: error.message
        })
    }

    // const checkCategory = async () => {
    //     const category = await prisma.product_categories.findUnique({
    //         where: {
    //             title: req.body.title
    //         }
    //     })
    // }
}