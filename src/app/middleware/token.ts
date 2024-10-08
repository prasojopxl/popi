import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client'
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import logger from "../../lib/logger";

const prisma = new PrismaClient()
dotenv.config()

export const verfyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers ? req.headers?.authorization : null
    if (!token || token === undefined) {
        return res.status(401).send({
            message: "Forbidden Access"
        });
    }

    //token expired        
    const jwtToken = token?.split(" ").pop();

    try {
        const dataJwt: any = jwt.verify(`${jwtToken}`, `${process.env.JWT_SECRET}`);
        const user = await prisma.users.findUnique({
            where: {
                id: dataJwt.data.id
            }
        })
        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }
        next();
    } catch (error) {
        logger.error(error)
        res.status(401).send({
            message: "Unauthorized"
        });
    } finally {
        await prisma.$disconnect();
    }
}
