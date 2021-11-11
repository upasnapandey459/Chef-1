const logger = require('../utils/other/logger')
const dbUtil = require('../utils/db_related/dbUtil')
const {
   insertIntoTable,
   selectFromTable,
   updateTable
} = require('../utils/db_related/queryUtil');
const fileName = 'ordersModel.js';

module.exports.addOrder = async (columns,values,requestId)=>
{
    logger.info(`${fileName} addOrder() called`);
    let sqlQuery = insertIntoTable("Orders",columns);
    sqlQuery += ` returning *`;
    let deleteQuery = `delete from "Requests" where id = $1`
    let client = await dbUtil.getTransaction();
    try
    {
        let result = await dbUtil.sqlExecSingleRow(client,sqlQuery,values);
        await dbUtil.sqlExecSingleRow(client,deleteQuery,[requestId]);
        await dbUtil.commit(client);
        return result;
    }
    catch(error)
    {
        logger.error(`${fileName} addOrder() ${error.message}`);
        await dbUtil.rollback(client);
        throw new Error(error.message);
    }
}

module.exports.getOrdersByChefId = async (id)=>
{
    logger.info(`${fileName} getOrdersByChefId() called`)
    let sqlQuery = `select * from "Orders" where chef_id = $1`;
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
        logger.error(`${fileName} getOrdersByChefId() ${error.message}`);
        await dbUtil.rollback(client);
        throw new Error(error.message);
    }
}

module.exports.updateOrderDetails = async (id,status)=>
{
    logger.info(`${fileName} updateOrderDetails() called`)
    let sqlQuery = `update "Orders" set status = $1 where id = $2`;
    let data = [status,id];
    let client = await dbUtil.getTransaction();
    try
    {
        let result = await dbUtil.sqlExecSingleRow(client,sqlQuery,data);
        await dbUtil.commit(client);
        return result;
    }
    catch(error)
    {
        logger.error(`${fileName} updateOrderDetails() ${error.message}`);
        await dbUtil.rollback(client);
        throw new Error(error.message);
    }
}

module.exports.getOrderDetailsById = async (id)=>
{
    logger.info(`${fileName} getOrderDetailsById() called`)
    let sqlQuery = `select * from "Orders" where id = $1`;
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
        logger.error(`${fileName} getOrderDetailsById() ${error.message}`);
        await dbUtil.rollback(client);
        throw new Error(error.message);
    }
}