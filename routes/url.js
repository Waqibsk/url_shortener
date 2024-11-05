const express = require("express");
const router = express.Router();
const { newurl } = require("../controllers/url");

router.post('/', newurl);

module.exports = router;
