const express = require("express");
const router = express.Router();
const verifyLib = require("../utils/verifyToken");
const usersControllers = require("../controllers/UsersControllers");


router.get("/", usersControllers.getUsers);
router.get("/byEmail/:mail", usersControllers.getUserEmail);

// routes authentication
router.post("/signup", usersControllers.createUser);
router.post("/login", usersControllers.authenticationUser);

//modify user infos
router.put("/:id", usersControllers.modifyUser);

router.delete("/:id",verifyLib.verify, usersControllers.deleteUser);











module.exports = router;