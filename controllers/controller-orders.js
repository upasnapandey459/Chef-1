const fileName = `controller-orders`;
const logger = require('../utils/other/logger');
const ordersModel = require('../models/ordersModel');
const errMessage  = 'Something went wrong';
const successMessage = 'Successfully Done!';
const uniqueId = require("../utils/auth_related/uniqueId");

module.exports.addOrder = async (req,res)=>
{
    try
    {
        logger.info(`${fileName} addOrder() called`);
        let id = uniqueId.generateConflictHandlingId();
        req.body["status"] = "Ongoing";
        req.body["id"]=id;
        const columns = Object.keys(req.body);
        const values = Object.values(req.body);
        let details = await ordersModel.addOrder(columns,values);
        if(details.rowCount>0)
        {
            return res.status(200).json({
                status:`success`,
                message:`Successfully Done!`,
                statusCode:200,
                data:details.rows[0]
            })
        }
        else
        {
            return res.status(400).json({
                status:`error`,
                message:errMessage,
                statusCode:400,
                data:[]
            })
        }
    }
    catch(error)
    {
        logger.error(`${fileName} addOrder() ${error.message}`);
        return res.status(500).json({
            statusCode:500,
            status:`error`,
            message:error.message
        })
    }
}

module.exports.getOrdersByChefId = async (req,res)=>
{
    try
    {
        logger.info(`${fileName} getOrdersByChefId() called`);
        let id = req.query.id;
        let details = await ordersModel.getOrdersByChefId(id);
        if(details.rowCount>0)
        {
            return res.status(200).json({
                status:`success`,
                message:`Successfully Done!`,
                statusCode:200,
                data:details.rows
            })
        }
        else
        {
            return res.status(200).json({
                status:`success`,
                message:`No orders found`,
                statusCode:200,
                data:[]
            })
        }
    }
    catch(error)
    {
        logger.error(`${fileName} getOrdersByChefId() ${error.message}`);
        return res.status(500).json({
            statusCode:500,
            status:`error`,
            message:error.message
        })
    }
}

module.exports.updateOrderDetails = async (req,res)=>
{
    try
    {
        logger.info(`${fileName} updateOrderDetails() called`);
        let id = req.body.id;
        let status = req.body.status;
        let details = await ordersModel.updateOrderDetails(id,status);
        if(details.rowCount>0)
        {
            return res.status(200).json({
                status:`success`,
                message:`Successfully Done!`,
                statusCode:200,
                data:details.rows[0]
            })
        }
        else
        {
            return res.status(400).json({
                status:`error`,
                message:errMessage,
                statusCode:400,
                data:[]
            })
        }
    }
    catch(error)
    {
        logger.error(`${fileName} updateOrderDetails() ${error.message}`);
        return res.status(500).json({
            statusCode:500,
            status:`error`,
            message:error.message
        })
    }
}

module.exports.getOrderDetailsById = async (req,res)=>
{
    try
    {
        logger.info(`${fileName} getOrderDetailsById() called`);
        let id = req.id;
        let details = await ordersModel.getOrderDetailsById(id);
        if(details.rowCount>0)
        {
            return res.status(200).json({
                status:`success`,
                message:`Successfully Done!`,
                statusCode:200,
                data:details.rows
            })
        }
        else
        {
            return res.status(200).json({
                status:`success`,
                message:`No orders found`,
                statusCode:200,
                data:[]
            })
        }
    }
    catch(error)
    {
        logger.error(`${fileName} getOrderDetailsById() ${error.message}`);
        return res.status(500).json({
            statusCode:500,
            status:`error`,
            message:error.message
        })
    }
}