const bcrypt = require('bcrypt');

module.exports.encodePassword = async(password)=>
{
    let salt = await bcrypt.genSalt(10);
    let encodedPassword = await bcrypt.hash(password,salt);
    return encodedPassword
}

module.exports.checkPassword = async(password1, password2)=>
{
    // console.log("P1 : ",password1);
    // console.log("P2 : ",password2);
    let password=await bcrypt.compare(password1,password2)
        // ,async(err,same)=>
    // {
    //     if(err)
    //     {
    //         console.log("not valid");
    //         password = false;
    //     }
    //     if(same)
    //     {
    //         console.log("valid")
    //         // return true;
    //         password=true;
    //     }
    // })
    // console.log(password);
    return password;
}