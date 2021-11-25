const logger = require('../utils/other/logger').logger;
const errorLogger = require('../utils/other/logger').errorLogger;
const debugLogger = require('../utils/other/logger').debugLogger;
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
    let sqlQuery = `select o.*, u.name as username, d.name as dishname, d.picture as dishpicture from "Orders" as o, "Dishes" as d, "Users" as u where o.chef_id = $1 and o.dish_id = d.id and u.id = o.user_id order by time desc`;
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

module.exports.getOrdersByUserId = async (id)=>
{
    logger.info(`${fileName} getOrdersByUserId() called`)
    let sqlQuery = `select o.*, u.name as chefname, d.name as dishname, d.picture as dishpicture from "Orders" as o, "Dishes" as d, "Users" as u where o.user_id = $1 and o.dish_id = d.id and u.id = o.chef_id order by time desc`;
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
        logger.error(`${fileName} getOrdersByUserId() ${error.message}`);
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

module.exports.getOrderDetailsByRequestId = async (id)=>
{
    logger.info(`${fileName} getOrderDetailsByRequestId() called`)
    let sqlQuery = `select * from "Orders" where request_id = $1`;
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
        logger.error(`${fileName} getOrderDetailsByRequestId() ${error.message}`);
        await dbUtil.rollback(client);
        throw new Error(error.message);
    }
}

