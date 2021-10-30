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
            "reset_token",
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
        ];
        if(role=="chef" && req.body.dishes!= undefined && req.body.dishes.length>0){
            let dishes = req.body.dishes;
            const columns = [
                "user_id",
                "dish_id"
            ];
            let values = [];
            for(let i=0;i<dishes.length;i++)
            {
                values.push([id,dishes[i]]);
            }
            let result = await userModels.addChefDishes(columns,values);
            if(result.rowCount<1)
            {
                return res.status(400).json({
                    status:`error`,
                    message:"Something went wrong while adding dishes",
                    statusCode:400,
                    data:[]
                })
            }
        }
        let details = await userModels.signUp(columns,values);
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

module.exports.signIn = async (req,res)=>
{
    try
    {
        logger.info(`${fileName} signIn() called`);
        let email = req.body.email;
        let password = req.body.password;
        let emailExistence = await userModels.checkUserExistence(email);
        if(emailExistence.rowCount<1)
        {
            return res.status(400).json({
                status:`error`,
                message:"Email not found",
                statusCode:400,
                data:[]
            })
        }
        console.log("Data : ",emailExistence.rows[0]);
        let passwordValidate = await passwordHandler.checkPassword(password,emailExistence.rows[0].password);
        console.log("Password : ",passwordValidate);
        if(!passwordValidate)
        {
            return res.status(400).json({
                status:`error`,
                message:"Incorrect password",
                statusCode:400,
                data:[]
            })
        }
        let access_token = await token.generateToken(email);
        let reset_token = await token.generateRefreshToken(email);
        const columns = [
            "access_token",
            "reset_token"
        ];
        const values = [
            access_token,
            reset_token,
            emailExistence.rows[0].id
        ]
        let details = await userModels.updateUserDetails(columns,values);
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
        logger.error(`${fileName} signIn() ${error.message}`);
        return res.status(500).json({
            statusCode:500,
            status:`error`,
            message:error.message
        })
    }
}

module.exports.autoSignIn = async (req,res)=>
{
    try
    {
        let accessToken = req.headers["authorization"];
        accessToken = accessToken.split(" ")[1];
        let isVerified = await token.validateToken(accessToken);
        if(isVerified)
        {
            let details = await userModels.getUserDetailsByToken(accessToken);
            if(details.rowCount>0)
            {
                let email = details.rows[0].email;
                let newAccessToken = await token.generateToken(email);
                let newRefreshToken = await token.generateRefreshToken(email);
                const columns = [
                    "access_token",
                    "reset_token"
                ];
                const values = [
                    newAccessToken,
                    newRefreshToken,
                    details.rows[0].id
                ] 
                let result = await userModels.updateUserDetails(columns,values);
                return res.status(200).json({
                    status:`success`,
                    message:`Successfully Done!`,
                    statusCode:200,
                    data:result.rows[0]
                })
            }
            else
            {
                return res.status(400).json({
                    status:`error`,
                    message:`No User Found`,
                    statusCode:400,
                    data:[]
                })
            }
        }
        else
        {
            let details = await userModels.getUserDetailsByToken(accessToken);
            if(details.rowCount>0)
            {
                let refreshToken = details.rows[0].reset_token;
                let email = details.rows[0].email;
                let isVerified = await token.validateRefreshToken(refreshToken);
                if(isVerified)
                {
                    let newAccessToken = await token.generateToken(email);
                    let newRefreshToken = await token.generateRefreshToken(email);
                    const columns = [
                        "access_token",
                        "reset_token"
                    ];
                    const values = [
                        newAccessToken,
                        newRefreshToken,
                        details.rows[0].id
                    ]
                    let result = await userModels.updateUserDetails(columns,values);
                    if(result.rowCount>0)
                    {
                        return res.status(200).json({
                            status:`success`,
                            message:`Successfully Done!`,
                            statusCode:200,
                            data:result.rows[0]
                        })
                    }
                }
                else
                {
                    return res.status(400).json({
                        status:`error`,
                        message:`Unauthorized`,
                        statusCode:400,
                        data:isVerified
                    })
                }
            }
            return res.status(400).json({
                status:`error`,
                message:`Unauthorized Access`,
                statusCode:400,
                data:[]
            })
        }
    }
    catch(error)
    {
        logger.error(`controller-user autoSignIn() ${error.message}`);
        return res.status(500).json({
            statusCode:500,
            status:`error`,
            message:error.message
        })
    }
}

module.exports.getUserDetailsById = async (req,res)=>
{
    try
    {
        logger.info(`${fileName} getUserDetailsById() called`);
        let id = req.query.id;
        let details = await userModels.getUserDetailsById(id);
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
                message:`No user found`,
                statusCode:200,
                data:[]
            })
        }
    }
    catch(error)
    {
        logger.error(`${fileName} getUserDetailsById() ${error.message}`);
        return res.status(500).json({
            statusCode:500,
            status:`error`,
            message:error.message
        })
    }
}

module.exports.signOut = async (req,res)=>
{
    try
    {
        logger.info(`${fileName} signOut() called`)
        let id = req.body.id;
        const columns = [
            "access_token",
            "reset_token"
        ];
        const values = [
            null,
            null,
            id
        ]
        let details = await userModels.updateUserDetails(columns,values);
        if(details.rowCount>0)
        {
            return res.status(200).json({
                status:`success`,
                message:`Successfully Done!`,
                statusCode:200,
                data:[]
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
        logger.error(`${fileName} signOut() ${error.message}`);
        return res.status(500).json({
            statusCode:500,
            status:`error`,
            message:error.message
        })
    }
}