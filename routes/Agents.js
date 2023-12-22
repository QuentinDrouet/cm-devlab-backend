const express = require("express");
const router = express.Router();
const agentsController = require('../controllers/agentsController');


router.get('/', agentsController.getAgents);

router.get('/:id', agentsController.getAgentById);

router.post('/', agentsController.createAgent);

router.put('/:id', agentsController.modifyAgent);

router.delete('/:id', agentsController.deleteAgent);


module.exports = router;