const logger = require('../utils/other/logger')
const dbUtil = require('../utils/db_related/dbUtil')
const { insertIntoTable,
    selectFromTable,
    updateTable
 } = require('../utils/db_related/queryUtil');
const fileName = 'requestModel';



module.exports.requestAdd = async (columns,values)=>
{
    logger.info(`${fileName} requestModel called`);
    let sqlQuery = insertIntoTable("Requests",columns);
    let client = await dbUtil.getTransaction();
    try
    {
        let result = await dbUtil.sqlExecSingleRow(client,sqlQuery,values);
        await dbUtil.commit(client);
        return result;
        
    }
    catch(error)
    {
        logger.error(`${fileName} requestMode ${error.message}`);
        await dbUtil.rollback(client);
        throw new Error(error.message);
    }
}



module.exports.getRequestbyID = async (id)=>
{
    logger.info(`${fileName} dishgetid called`)
    let sqlQuery = `select * from "Requests" where id = $1`;
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

module.exports.deleteRequestById = async (id)=>
{
    logger.info(`${fileName} deleteRequestById called`)
    let sqlQuery = `delete from "Requests" where id = $1`;
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
        logger.error(`${fileName} deleteRequestById ${error.message}`);
        await dbUtil.rollback(client);
        throw new Error(error.message);
    }
}