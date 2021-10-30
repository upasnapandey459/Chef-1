const router = require("express").Router();
const userController = require("../controllers/controller-users");
const dishController = require("../controllers/controller-dishes");
const requestController = require("../controllers/controller-requests");

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
router.post("/signOut",userController.signOut);
router.post("/autoSignIn",userController.autoSignIn);
router.get("/getUserDetailsById",userController.getUserDetailsById);



// Requests 
router.post("/requestAdd",requestController.requestAdd);
router.delete('/requestDelete',requestController.deleteRequestById)
router.get('/getRequestById',requestController.getRequestbyID)


module.exports = router