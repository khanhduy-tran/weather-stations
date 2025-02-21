import {Request} from 'express';
import * as util from 'util';
import * as winston from 'winston';

const ERROR_STASHES: string[] = [];

const enumerateErrorFormat = winston.format((info) => {
    if (info instanceof Error) {
        return Object.assign(
            {
                message: info.message,
                stack: info.stack,
            },
            info,
        );
    }
    return info;
});

export function getLogger(name: string) {
    const has = winston.loggers.has(name);
    if (!has) {
        const transports: any[] = [];
        transports.push(
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                    winston.format.printf((info) => {
                        const {timestamp, level, message, ...extra} = info;
                        return `${timestamp} [${name}][${level}]: ${message} ${
                            Object.keys(extra).length ? util.inspect(extra) : ''
                        }`;
                    }),
                ),
                stderrLevels: ['error'],
            }),
        );

        winston.loggers.add(name, {
            level: process.env.LOG_LEVEL || 'debug',
            format: winston.format.combine(enumerateErrorFormat()),
            transports,
        });
    }

    // return winston.loggers.get(name);
    return {
        debug(msg: any) {
            return winston.loggers.get(name).debug(msg);
        },
        info(msg: any) {
            return winston.loggers.get(name).info(msg);
        },
        warn(msg: any) {
            return winston.loggers.get(name).warn(msg);
        },
        error(msg: any) {
            ERROR_STASHES.push(`[ERROR] ${msg}`);
            return winston.loggers.get(name).error(msg);
        },
        fatal(msg: any) {
            // Setup error
            ERROR_STASHES.push(`[ERROR] ${msg}`);
            return winston.loggers.get(name).error(msg);
        },
        async notifyErrorsImmediately() {
            try {
                // await notifyErrors();
            } catch (err) {
                console.error(`======= UNCAUGHT ERROR NOTIFYING BEGIN =======`);
                console.error(err);
                console.error(`======= UNCAUGHT ERROR NOTIFYING END =======`);
            }
        },
    };
}

export function logger(req: Request, res: any, next: any) {
    const log = getLogger('BaseLogger');
    if (req && req.url && !req.url.includes('/health')) log.debug(`${req.method} ${req.url}`);
    next();
}

export function debugLog(log: any) {
    // TODO: implement me
    console.log(log);
}

export function errorLog(log: any) {
    // TODO: implement me
    console.error(log);
}