const router = require("express").Router();
const userController = require("../controllers/controller-users");

router.get("/check",(req,res)=>{
    console.log("Check OK");
    return res.send("Check OK")
});

router.post("/signUp",userController.signUp);


module.exports = router