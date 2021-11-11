const fileName = `controller-requests.js`;
const logger = require('../utils/other/logger');
const requestModel = require('../models/requestModel');
const errMessage  = 'Something went wrong';
const successMessage = 'Successfully Done!';
const uniqueId = require("../utils/auth_related/uniqueId");



module.exports.requestAdd = async (req,res)=>
{
    try
    {
        logger.info(`${fileName} requestAdd called`);
        let id =await uniqueId.generateConflictHandlingId();
        let userid = req.body.userid
        let chefid = req.body.chefid
        let dishid = req.body.dishid
        let charges= req.body.charges
        let status = req.body.status


        const columns = [
            "id",
            "userid",
            "chefid",
            "dishid",
            "status",
            "charges"
            
        ];
        const values = [
            id,
            userid,
            chefid,
            dishid,
            status,
            charges
        ]
        let details = await requestModel.requestAdd(columns,values);
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
        logger.error(`${fileName} requestadd ${error.message}`);
        return res.status(500).json({
            statusCode:500,
            status:`error`,
            message:error.message
        })
    }
}

module.exports.getRequestbyID = async (req,res)=>
{
    try
    {
        logger.info(`${fileName} getRequestbyID called`);
        let id = req.query.id;
        let details = await requestModel.getRequestbyID(id);
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
        logger.error(`${fileName} getRequestId ${error.message}`);
        return res.status(500).json({
            statusCode:500,
            status:`error`,
            message:error.message
        })
    }
}


module.exports.deleteRequestById = async (req,res)=>
{
    try
    {
        logger.info(`${fileName} getid called`);
        let id = req.query.id;

        let details = await requestModel.deleteRequestById(id);
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
        logger.error(`${fileName} deleteRequestById ${error.message}`);
        return res.status(500).json({
            statusCode:500,
            status:`error`,
            message:error.message
        })
    }
}

module.exports.getRequestsByChefId = async (req,res)=>
{
    try
    {
        logger.info(`${fileName} getRequestsByChefId() called`);
        let id = req.query.id;
        let details = await requestModel.getRequestsByChefId(id);
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
            return res.status(400).json({
                status:`success`,
                message:`Successfully Done!`,
                statusCode:400,
                data:[]
            })
        }
    }
    catch(error)
    {
        logger.error(`${fileName} getRequestsByChefId() ${error.message}`);
        return res.status(500).json({
            statusCode:500,
            status:`error`,
            message:error.message
        })
    }
}


module.exports.getRequestsByUserId = async (req,res)=>
{
    try
    {
        logger.info(`${fileName} getRequestsByUserId() called`);
        let id = req.query.id;
        let details = await requestModel.getRequestsByUserId(id);
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
            return res.status(400).json({
                status:`success`,
                message:`Successfully Done!`,
                statusCode:400,
                data:[]
            })
        }
    }
    catch(error)
    {
        logger.error(`${fileName} getRequestsByUserId() ${error.message}`);
        return res.status(500).json({
            statusCode:500,
            status:`error`,
            message:error.message
        })
    }
}