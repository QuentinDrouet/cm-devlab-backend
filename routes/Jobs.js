const express = require("express");
const router = express.Router();
const verifyLib = require("../utils/verifyToken");
const jobsControllers = require("../controllers/JobsControllers");


router.get("/", jobsControllers.getJobs);

router.get("/:id", jobsControllers.getJobById);

router.post("/", jobsControllers.createJob);

router.put("/:id", jobsControllers.modifyJob);

router.delete("/:id", jobsControllers.deleteJob);

module.exports = router;