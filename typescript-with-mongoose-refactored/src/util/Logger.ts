import winston, { format } from "winston";

export const logger : winston.Logger = winston.createLogger({
    level : "debug",
    format : format.combine(format.colorize(), format.simple()),
    transports : [new winston.transports.Console()]
});