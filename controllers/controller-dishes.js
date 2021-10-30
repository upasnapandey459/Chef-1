const fileName = `controller-dishes.js`;
const logger = require('../utils/other/logger');
const dishModel = require('../models/dishModels');
const errMessage  = 'Something went wrong';
const successMessage = 'Successfully Done!';
const uniqueId = require("../utils/auth_related/uniqueId");



module.exports.dishadd = async (req,res)=>
{
    try
    {
        logger.info(`${fileName} signUp() called`);
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
        let details = await dishModel.dish(columns,values);
      
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
        logger.error(`${fileName} signUp() ${error.message}`);
        return res.status(500).json({
            statusCode:500,
            status:`error`,
            message:error.message
        })
    }
}
