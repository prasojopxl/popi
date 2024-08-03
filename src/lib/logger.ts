import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file"

const logger = winston.createLogger({
    transports:[
        new winston.transports.Console(),
        new DailyRotateFile({
            filename: "logs/%DATE%.log",
            datePattern: "DDMMMMYYYY",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d",
        })
    ]
});

export default logger

