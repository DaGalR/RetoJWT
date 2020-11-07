const { mongoClient } = require("../lib/mongodb");
const bcrypt = require("bcrypt");
const bd = "jwtEjercicio";
const userColl = "usuarios";
const prodColl = "productos";
module.exports.getUsuarios = async (req, res) => {
  if (req.decoded.rol === "admin" || req.decoded.rol === "listar") {
    const usuarios = await mongoClient
      .db(bd)
      .collection(userColl)
      .find({})
      .toArray();
    res.send(usuarios);
  } else {
    res.status(401).send({ success: false, message: "Sin autorizacion" });
    return;
  }
};

module.exports.crearDoc = async (req, res) => {
  if (req.decoded.rol === "admin") {
    const nuevo = await mongoClient.db(bd).collection(prodColl).insertOne({
      nombre: req.body.nombre,
      precio: req.body.precio,
    });
    res.send("Producto creado");
  } else {
    res.status(401).send({ success: false, message: "Sin autorizacion" });
    return;
  }
};

module.exports.crearUsuario = async (req, res) => {
  if (req.decoded.rol === "admin" || req.decoded.rol === "crear") {
    let claveSinCifrar = req.body.clave;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(claveSinCifrar, salt);
    const nuevo = await mongoClient.db(bd).collection(userColl).insertOne({
      usuario: req.body.usuario,
      clave: hashPassword,
      rol: req.body.rol,
    });
    res.send("Usuario creado");
  } else {
    res.status(401).send({ success: false, message: "Sin autorizacion" });
    return;
  }
};
