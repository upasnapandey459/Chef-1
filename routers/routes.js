const router = require("express").Router();
const userController = require("../controllers/controller-users");
const dishController = require("../controllers/controller-dishes");

router.get("/check",(req,res)=>{
    console.log("Check OK");
    return res.send("Check OK")
});

//dishes
router.get("/dish-get",dishController.dishGet);
router.get("/dish-get/id:id" ,dishController.dishGetByID);
router.post('/dish-add',dishController.dishadd);

// Users
router.post("/signUp",userController.signUp);
router.post("/signIn",userController.signIn);
router.post("/autoSignIn",userController.autoSignIn);
router.get("/getUserDetailsById:id",userController.getUserDetailsById);

module.exports = router