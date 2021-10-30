const fileName = `controller-users.js`;
const logger = require('../utils/other/logger');
const userModels = require('../models/userModels');
const errMessage  = 'Something went wrong';
const successMessage = 'Successfully Done!';
const uniqueId = require("../utils/auth_related/uniqueId");
const token = require("../utils/auth_related/token");
const passwordHandler = require("../utils/auth_related/password");

module.exports.signUp = async (req,res)=>
{
    try
    {
        logger.info(`${fileName} signUp() called`);
        let name = req.body.name;
        let email = req.body.email;
        let emailExistence = ((await userModels.checkUserExistence(email)).rowCount>0)?true:false;
        if(emailExistence)
        {
            return res.status(400).json({
                status:`error`,
                message:"Email already exist",
                statusCode:400,
                data:[]
            })
        }
        let password = req.body.password;
        password = await passwordHandler.encodePassword(password);
        let mobile_number = req.body.mobile_number;
        const id = uniqueId.generateConflictHandlingId();
        let role = req.body.role || "user";
        let profile_picture  = req.body.profile_picture || null;
        let charges = req.body.charges || null;
        let access_token = await token.generateToken(email);
        let reset_token = await token.generateRefreshToken(email);
        const columns = [
            "id",
            "name",
            "email",
            "mobile_number",
            "password",
            "profile_picture",
            "role",
            "access_token",
            "refresh_token",
            "charges"
        ];
        const values = [
            id,
            name,
            email,
            mobile_number,
            password,
            profile_picture,
            role,
            access_token,
            reset_token,
            charges
        ]
        let details = await userModels.signUp(columns,values);
        if(details.rowCount>1)
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