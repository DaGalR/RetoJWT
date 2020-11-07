var express = require("express");
var router = express.Router();
var HandlerGenerator = require("../controllers/auth.js");

HandlerGenerator = new HandlerGenerator();

router.post("/login", HandlerGenerator.login);

module.exports = router;
