var express = require("express");
var router = express.Router();
const { checkToken } = require("../middleware");
const usuarios = require("../controllers/usuarios.js");

router.post("/nuevo", checkToken, usuarios.crearUsuario);
router.get("/", checkToken, usuarios.getUsuarios);
router.post("/", checkToken, usuarios.crearDoc);
module.exports = router;
