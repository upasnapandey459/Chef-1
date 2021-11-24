const logger = require('../utils/other/logger').logger;
const errorLogger = require('../utils/other/logger').errorLogger;
const debugLogger = require('../utils/other/logger').debugLogger;
const dbUtil = require('../utils/db_related/dbUtil')
const {
   insertIntoTable,
   selectFromTable,
   updateTable
} = require('../utils/db_related/queryUtil');
const fileName = 'locationModel.js';

module.exports.updateLocation = async (id,lat,lan)=>
{
    logger.info(`${fileName} updateLocation() called`);
    let sqlQuery = `insert into "Locations" (user_id,lat,lan) values ($1,$2,$3) ON CONFLICT (user_id) DO UPDATE SET lat=$2, lan=$3 returning *`;
    let data = [id,lat,lan];
    let client = await dbUtil.getTransaction();
    try
    {
        let result = await dbUtil.sqlExecSingleRow(client,sqlQuery,data);
        await dbUtil.commit(client);
        return result;
    }
    catch(error)
    {
        logger.error(`${fileName} updateLocation() ${error.message}`);
        await dbUtil.rollback(client);
        throw new Error(error.message);
    }
}

module.exports.getLocation = async (id)=>
{
    logger.info(`${fileName} getLocation() called`)
    let sqlQuery = `select * from "Locations" where user_id=$1`;
    let data = [id];
    let client = await dbUtil.getTransaction();
    try
    {
        let result = await dbUtil.sqlExecSingleRow(client,sqlQuery,data);
        await dbUtil.commit(client);
        return result;
    }
    catch(error)
    {
        logger.error(`${fileName} getLocation() ${error.message}`);
        await dbUtil.rollback(client);
        throw new Error(error.message);
    }
}