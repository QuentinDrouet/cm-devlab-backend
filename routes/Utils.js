const express = require("express");
const router = express.Router();
const utilsController = require('../controllers/UtilsControllers');

router.get('/getcookie', utilsController.getCookies);
