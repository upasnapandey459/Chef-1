const logger = require('../utils/other/logger')
const dbUtil = require('../utils/db_related/dbUtil')
const {
    insertIntoTable,
 } = require('../utils/db_related/queryUtil');
const fileName = 'dishModels';


module.exports.dishadd = async (columns,values)=>
{
    logger.info(`${fileName} dishadd called`);
    let sqlQuery = insertIntoTable("Dishes",columns);
    let client = await dbUtil.getTransaction();
    try
    {
        let result = await dbUtil.sqlExecSingleRow(client,sqlQuery,values);
        await dbUtil.commit(client);
        return result;
        
    }
    catch(error)
    {
        logger.error(`${fileName} dishadd ${error.message}`);
        await dbUtil.rollback(client);
        throw new Error(error.message);
    }
}

module.exports.dishGet = async ()=>
{
    logger.info(`${fileName} dishget called`)
    let sqlQuery = `select * from "Dishes"`;
    let client = await dbUtil.getTransaction();
    try
    {
        let result = await dbUtil.sqlExecSingleRow(client,sqlQuery);
        await dbUtil.commit(client);
        return result;

    }
    catch(error)
    {
        logger.error(`${fileName} dishget ${error.message}`);
        await dbUtil.rollback(client);
        throw new Error(error.message);
    }
}

module.exports.dishGetByID = async (id)=>
{
    logger.info(`${fileName} dishgetid called`)
    let sqlQuery = `select * from "Dishes" where id = $1`;
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
        logger.error(`${fileName} dishgetid ${error.message}`);
        await dbUtil.rollback(client);
        throw new Error(error.message);
    }
}