const logger = require('../utils/other/logger')
const dbUtil = require('../utils/db_related/dbUtil')
const {
    insertIntoTable,
 } = require('../utils/db_related/queryUtil');
const fileName = 'dishModels';


module.exports.dish = async (columns,values)=>
{
    logger.info(`${fileName} signUp() called`);
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
        logger.error(`${fileName} signUp() ${error.message}`);
        await dbUtil.rollback(client);
        throw new Error(error.message);
    }
}