const fileName = `controller-dishes.js`;
const logger = require('../utils/other/logger').logger;
const errorLogger = require('../utils/other/logger').errorLogger;
const debugLogger = require('../utils/other/logger').debugLogger;
const dishModel = require('../models/dishModels');
const errMessage  = 'Something went wrong';
const successMessage = 'Successfully Done!';
const uniqueId = require("../utils/auth_related/uniqueId");



module.exports.dishadd = async (req,res)=>
{
    try
    {
        logger.info(`${fileName} dishadd called`);
        let id =await uniqueId.generateConflictHandlingId();
        let name = req.body.name;
        let picture = req.body.picture;
        const columns = [
            "id",
            "name",
            "picture",
        ];
        const values = [
            id,
            name,
            picture
        ]
        let details = await dishModel.dishadd(columns,values);
      
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
        logger.error(`${fileName} dishadd ${error.message}`);
        return res.status(500).json({
            statusCode:500,
            status:`error`,
            message:error.message
        })
    }
}



module.exports.dishGet = async (req,res)=>
{
    try
    {
        debugLogger.info(`${fileName} dishget called`);
        let details = await dishModel.dishGet();
        // console.log(details)
        if(details.rowCount>0)
        {
            logger.info("Success");
            return res.status(200).json({
                status:`success`,
                message:`Successfully Done!`,
                statusCode:200,
                data:details.rows
            })
        }
        else
        {
            errorLogger.error("Error");
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
        errorLogger.error(`${fileName} dishget ${error.message}`);
        return res.status(500).json({
            statusCode:500,
            status:`error`,
            message:error.message
        })
    }
}

module.exports.dishGetByID = async (req,res)=>
{
    try
    {
        logger.info(`${fileName} dishgetid called`);
        let id = req.query.id;

        let details = await dishModel.dishGetByID(id);
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
        logger.error(`${fileName} dishgetid ${error.message}`);
        return res.status(500).json({
            statusCode:500,
            status:`error`,
            message:error.message
        })
    }
}