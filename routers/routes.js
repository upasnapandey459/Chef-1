const router = require("express").Router();
const userController = require("../controllers/controller-users");

router.get("/check",(req,res)=>{
    console.log("Check OK");
    return res.send("Check OK")
});

// Users
router.post("/signUp",userController.signUp);
router.post("/signIn",userController.signIn);


module.exports = router