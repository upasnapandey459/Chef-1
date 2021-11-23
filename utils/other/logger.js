const config = require('../../config/config');
const winston = require("winston")
// const { createLogger, format, transports } = require('winston');
// const { combine, timestamp, printf, colorize } = format;

const loggerFormat = winston.format.printf(info => {
    return `${info.timestamp} | ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        loggerFormat
    ),
    transports: [
        new winston.transports.File({
            level:'info',
            filename:`./logs/info/info-logs-${new Date().getTime()}.json`,
            json:true,
            datePattern:'yyyy-MM-dd',
            prepend:true,
            format:winston.format.json(),
            handleExceptions: true,
            colorize:true
        }),
        // new winston.transports.File({
        //     filename:`./logs/debug/debug-log-${new Date().getTime()}.json`,
        //     level:'debug',
        //     json:true,
        //     datePattern:'yyyy-MM-dd',
        //     prepend:true,
        //     format:winston.format.json(),
        //     handleExceptions: true,
        //     colorize:true
        // }),
        new winston.transports.Console({colorize:true})
        // new winston.transports.File({
        //     filename:`./logs/error/error-log-${new Date().getTime()}.json`,
        //     level:'error',
        //     handleExceptions: true,
        //     colorize:true,
        //     json:true,
        //     datePattern:'yyyy-MM-dd',
        //     prepend:false,
        //     format:winston.format.json(),
        // })
    ],
    exitOnError: false,
});


const errorLogger = winston.createLogger({
    // level: config.loggerLevel || "debug",
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        loggerFormat
    ),
    transports: [
        new winston.transports.Console({colorize:true}),
        new winston.transports.File({
            filename:`./logs/error/error-log-${new Date().getTime()}.json`,
            level:'error',
            handleExceptions: true,
            colorize:true,
            json:true,
            datePattern:'yyyy-MM-dd',
            prepend:false,
            format:winston.format.json(),
        })
    ],
    exitOnError: false,
});


const debugLogger = winston.createLogger({
    // level: config.loggerLevel || "debug",
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        loggerFormat
    ),
    transports: [
        new winston.transports.File({
            filename:`./logs/debug/debug-log-${new Date().getTime()}.json`,
            level:'debug',
            json:true,
            datePattern:'yyyy-MM-dd',
            prepend:true,
            format:winston.format.json(),
            handleExceptions: true,
            colorize:true
        }),
        new winston.transports.Console({colorize:true})
    ],
    exitOnError: false,
});

// logger.log({
//     message: 'Hello, Winston!',
//     level: 'info'
// });

// const consoleConfig = [
//     new transports.Console({
//         'colorize': true
//     })
// ];
// const fileLogger = createLogger({
//     'transports': consoleConfig
// });

// const successLogger = fileLogger;
// successLogger.add(winstonRotator,{
//   'name': 'success-file',
//   'level': 'info',
//   'filename': '../../logs/success.log',
//   'json': false,
//   'datePattern': 'yyyy-MM-dd-',
//   'prepend': true
// });

// const errorLogger = logger;
// errorLogger.add(new winstonRotator({
//   'name': 'error-file',
//   'level': 'error',
//   'filename': "../../logs/error.log",
//   'json': false,
//   'datePattern': 'yyyy-MM-dd-',
//   'prepend': true
// }));

module.exports = {logger,errorLogger,debugLogger};