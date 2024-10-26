const express = require("express");
const { ping } = require('../controllers/pingController');
const router = express.Router();


// GET
router.get("/ping", ping);

  
module.exports = router;