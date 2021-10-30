const router = require("express").Router();
const userController = require("../controllers/controller-users");
const dishController = require("../controllers/controller-dishes");

router.get("/check",(req,res)=>{
    console.log("Check OK");
    return res.send("Check OK")
});

router.get("/dish-get",dishController.dishGet);

router.get("/dish-get/id:id" ,dishController.dishGetByID);

router.post("/signUp",userController.signUp);

router.post('/dish-add',dishController.dishadd);



module.exports = router