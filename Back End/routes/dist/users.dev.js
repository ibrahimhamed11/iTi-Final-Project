"use strict";

var express = require("express");

var path = require("path");

var authMiddleware = require("../controllers/auth");

var controllers = require("../controllers/userController");

var loginAuth = require("../controllers/loginAuth");

var router = express.Router();
router.post("/register", controllers.upload.single("image"), controllers.createUser);
router.post("/login", controllers.loginUser); // Define a route for the login page

router.get("/login", controllers.getlogin);
router.get("/register", controllers.getRegister); // router.use(loginAuth);
// router.use(authMiddleware);

router.get("/getallusers", controllers.getAllUsers);
router.get("/getallmothers", controllers.getAllMothers); // add route for pregnants

router.get("/getallpregnants", controllers.getAllPregnants);
router.get("/getalladmins", controllers.getAllAdmins);
router.get("/getallseller", controllers.getAllSeller);
router.get("/getallsellernum", controllers.getNumberOfSellers);
router.get("/getallmothernum", controllers.getNumberOfMothers);
router.get("/getallpregnantnum", controllers.getNumberOfPregnant);
router.get("/getallusersnum", controllers.getNumberOfUsers);
router.get("/:userId", controllers.getUser);
router["delete"]("/:userId", controllers.deleteUser);
router.put("/:userId", controllers.updateUser);
router.patch("/:id", controllers.addBaby);
router.get("/baby/:id", controllers.getBaby);
router.use(express["static"](path.join(__dirname, "./../public")));
module.exports = router;