const hashLib = require("../utils/hash");
const jwt = require("jsonwebtoken");
const encryptLib = require("../utils/encrypt");
const { Jobs } = require("../models");


/* get jobs */
exports.getJobs = async (req, res) => {
  const listOfJobs = await Jobs.findAll();
  res.status(200).json(listOfJobs);
};


// create job
exports.createJob = async (req, res) => {
  const jobInfos = req.body;
  try {
      const job = await Jobs.create({
          jobInfos
        });
    res.status(200).json("job created.");

  } catch (error) {
        res.status(400).json("An error occured while creating job ");

  }
  

 
};


// modify job infos
exports.modifyJob = async (req, res) => {
  const id = req.params.id;
  const job = req.body;
  const jobdb = await Jobs.findByPk(id);
  if (jobdb) {
    jobdb.update(job);
    res.status(200).json("job modified successfully");
  } else {
    res.status(400).json("job not found");
  }
};

// Delete job
exports.deleteJob = async (req, res) => {
    const id = req.params;
    const jopToDelete = await Jobs.findByPk(id);
    await jobToDelete.destroy();
    res.status(200).json("job to delete");
};