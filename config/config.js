// const PORT = process.env.PORT || 5000;
// module.exports = PORT;
 
// const { config } = require("dotenv/types");
require("dotenv").config();
const PROD = process.env.PROD;
// console.log("PROD :", PROD);
config = {
    serviceName: process.env.SERVICENAME || 'PostgresDB',
    port: process.env.PORT || 4000,
    loggerLevel: process.env.LOGGERLEVEL || 'debug',
    db: (PROD== "true") ? {
        user: process.env.DB_USER || '',
        database: process.env.DB || '',
        password: process.env.DB_PASS || '',
        host: process.env.DB_HOST || '',
        port: parseInt(process.env.DB_PORT) || 5432,
        max: parseInt(process.env.DB_MAX_CLIENTS) || 75000,
        idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT_MS) || 30000
    } : {
        user: process.env.HEROKU_USER || '',
        database: process.env.HEROKU_DB || '',
        password: process.env.HEROKU_DB_PASS || '',
        host: process.env.HEROKU_DB_HOST || '',
        port: parseInt(process.env.DB_PORT) || 5432,
        url: process.env.HEROKU_DB_URL || '',
        ssl: { rejectUnauthorized: false },
        max: parseInt(process.env.DB_MAX_CLIENTS) || 20,
        idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT_MS) || 30000
    }
}

module.exports = config;