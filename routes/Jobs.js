const express = require("express");
const router = express.Router();
const verifyLib = require("../utils/verifyToken");
const jobsControllers = require("../controllers/JobsControllers");


router.get("/", jobsControllers.getJobs);

router.post("/", jobsControllers.createJob);

//modify job infos
router.put("/:id", jobsControllers.modifyJob);

router.delete("/:id", jobsControllers.deleteJob);

module.exports = router;