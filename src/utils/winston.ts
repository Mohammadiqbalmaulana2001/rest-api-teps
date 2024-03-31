import winston from "winston";
import 'winston-daily-rotate-file';

const transport = new winston.transports.DailyRotateFile({
    filename: "./logs/%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    level: "error",
    handleExceptions: true
});

export const logger = winston.createLogger({
    level: "silly",
    format: winston.format.combine(
        winston.format.json({space: 2}),
        winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        winston.format.label({label: '[LOGGER]'}),
        winston.format.printf(
            (info) => `${info.labbel} ${info.timestamp} ${info.level} ${info.message}`
        )
    ),
    transports: [
        new winston.transports.Console({
            level: "silly",
            handleExceptions: true,
            format: winston.format.combine(
                winston.format.colorize({all: true}),
            )
        }),
        transport
    ]
})