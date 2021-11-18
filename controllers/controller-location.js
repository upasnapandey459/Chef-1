const fileName = `controller-location`;
const logger = require('../utils/other/logger');
const locationModel = require('../models/locationModel');
const errMessage  = 'Something went wrong';
const successMessage = 'Successfully Done!';

module.exports.updateLocation = async (req,res)=>
{
    try
    {
        logger.info(`${fileName} updateLocation() called`)
        let id = req.body.id;
        let lat = req.body.lat;
        let lan = req.body.lan;
        let details = await locationModel.updateLocation(id,lat,lan);
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
        logger.error(`${fileName} updateLocation() ${error.message}`);
        return res.status(500).json({
            statusCode:500,
            status:`error`,
            message:error.message
        })
    }
}

module.exports.getLocation = async (req,res)=>
{
    try
    {
        logger.info(`${fileName} getLocation() called`)
        let id = req.query.id;
        let details = await locationModel.getLocation(id);
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
            return res.status(200).json({
                status:`success`,
                message:`No data found`,
                statusCode:200,
                data:[]
            })
        }
    }
    catch(error)
    {
        logger.error(`${fileName} getLocation() ${error.message}`);
        return res.status(500).json({
            statusCode:500,
            status:`error`,
            message:error.message
        })
    }
}