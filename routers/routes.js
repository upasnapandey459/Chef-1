const router = require("express").Router();
const userController = require("../controllers/controller-users");
const dishController = require("../controllers/controller-dishes");
const ordersController = require("../controllers/controller-orders");
const requestController = require("../controllers/controller-requests");
const locationController = require("../controllers/controller-location");

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
router.get("/getChefByDishAndLocation",userController.getChefByDishAndLocation);

// Orders
router.post("/addOrder",ordersController.addOrder);
router.get("/getOrdersByChefId",ordersController.getOrdersByChefId);
router.post("/updateOrderDetails",ordersController.updateOrderDetails);
router.get("/getOrderDetailsById",ordersController.getOrderDetailsById);
router.get("/getOrderDetailsByRequestId",ordersController.getOrderDetailsByRequestId);

// Requests 
router.post("/requestAdd",requestController.requestAdd);
router.delete('/requestDelete',requestController.deleteRequestById);
router.get('/getRequestById',requestController.getRequestbyID);
router.get('/getRequestsByChefId',requestController.getRequestsByChefId);
router.get('/getRequestsByUserId',requestController.getRequestsByUserId);

// Location
router.get("/getLocation",locationController.getLocation);
router.post("/updateLocation",locationController.updateLocation);

module.exports = router