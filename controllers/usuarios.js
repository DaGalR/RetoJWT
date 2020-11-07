const { mongoClient } = require("../lib/mongodb");
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
    const nuevo = await mongoClient.db(bd).collection(userColl).insertOne({
      usuario: req.body.usuario,
      clave: req.body.clave,
      rol: req.body.rol,
    });
    res.send("Usuario creado");
  } else {
    res.status(401).send({ success: false, message: "Sin autorizacion" });
    return;
  }
};
