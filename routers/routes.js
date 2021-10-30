const router = require("express").Router();
const userController = require("../controllers/controller-users");
const dishController = require("../controllers/controller-dishes");

router.get("/check",(req,res)=>{
    console.log("Check OK");
    return res.send("Check OK")
});

// Users
router.post("/signUp",userController.signUp);
router.post("/signIn",userController.signIn);

router.post('/dish-add',dishController.dishadd);


module.exports = router