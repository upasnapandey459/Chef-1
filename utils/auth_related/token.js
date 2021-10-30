require('dotenv').config()
const jwt = require('jsonwebtoken');
// const {createError} = require('create-error');

module.exports.generateToken  = async function(email)
{
    console.log("generateToken() called");
    // let secret = process.env.ACCESS_TOKEN_SECRET;
    let payload = {};
    let options ={
        issuer:"namla.com",
        audience: email,
        expiresIn:'7d'
    };
    let access_token = await jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,options);
    // console.log(access_token);
    return access_token
}

module.exports.generateRefreshToken = async(email)=>
{
    console.log("generateRefreshToken() called")

    let payload = {};
    let options ={
        issuer:"namla.com",
        audience: email,
        expiresIn:'1y'
    };
    let refreshToken=jwt.sign(payload,process.env.REFERESH_TOKEN_SECRET,options);
    return refreshToken;
}

module.exports.validateToken = async function(token)
{
    console.log("validateToken() called")
    // console.log("Token")
    let isValid = await new Promise((resolve, reject) =>{
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,async(err,decoded)=>
        {
            if(err)
            {
                // console.log("Token Expired | ",err);
                // reject(false);
                resolve(false);
            }
            else
            {
                // console.log("Token Valid | ",decoded);
                resolve(true);
            }
        })
    })
    // console.log("isValid : ",isValid);
    return isValid;
}

module.exports.validateRefreshToken = async function(token)
{
    console.log("validateRefreshToken() called")
    let isValid = await new Promise((resolve, reject) =>{
        jwt.verify(token,process.env.REFERESH_TOKEN_SECRET,async(err,valid)=>
        {
            if(err)
            {
                // console.log("Token Expired | ",err);
                // reject(false);
                resolve(false);
            }
            else
            {
                // console.log("Token Valid | ",valid);
                resolve(true);
            }
        })
    })
    return isValid;
}

