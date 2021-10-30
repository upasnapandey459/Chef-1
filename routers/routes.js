const router = require("express").Router();
const userController = require("../controllers/controller-users");
const dishController = require("../controllers/controller-dishes");
const ordersController = require("../controllers/controller-orders");

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

// Orders
router.post("/addOrder",ordersController.addOrder);
router.post("/getOrdersByChefId",ordersController.getOrdersByChefId);
router.post("/updateOrderDetails",ordersController.updateOrderDetails);
router.post("/getOrderDetailsById",ordersController.getOrderDetailsById);

module.exports = router