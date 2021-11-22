const config = require('../../config/config');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
// const { add } = createLogger;
// const winstonRotator = require('winston-daily-rotate-file');

const loggerFormat = printf(info => {
    return `${info.timestamp} | ${info.level}: ${info.message}`;
});
 
const logger = createLogger({
    level: config.loggerLevel || "debug",
    format: combine(
        format.colorize(),
        timestamp(),
        loggerFormat
    ),
    transports: [
        new transports.Console()
    ]
});

// const successLogger = logger;
// successLogger.add(new winstonRotator({
//   'name': 'success-file',
//   'level': 'info',
//   'filename': '../../logs/success.log',
//   'json': false,
//   'datePattern': 'yyyy-MM-dd-',
//   'prepend': true
// }));

// const errorLogger = logger;
// errorLogger.add(new winstonRotator({
//   'name': 'error-file',
//   'level': 'error',
//   'filename': "../../logs/error.log",
//   'json': false,
//   'datePattern': 'yyyy-MM-dd-',
//   'prepend': true
// }));

module.exports = logger;