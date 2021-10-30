const router = require("express").Router();
const userController = require("../controllers/controller-users");
const dishController = require("../controllers/controller-dishes");

router.get("/check",(req,res)=>{
    console.log("Check OK");
    return res.send("Check OK")
});

//dishes
router.get("/getDish",dishController.dishGet);
router.get("/getDishByID" ,dishController.dishGetByID);
router.post('/dish-add',dishController.dishadd);



// Users
router.post("/signUp",userController.signUp);
router.post("/signIn",userController.signIn);
router.post("/autoSignIn",userController.autoSignIn);
router.get("/getUserDetailsById",userController.getUserDetailsById);


module.exports = router