const jwt = require("jsonwebtoken");
const config = require("../config");
const { mongoClient } = require("../lib/mongodb");
const bcrypt = require("bcrypt");
const bd = "jwtEjercicio";
const userColl = "usuarios";

class HandlerGenerator {
  login = async (req, res) => {
    let username = req.body.usuario;
    let password = req.body.clave;

    if (username && password) {
      const usuario = await mongoClient
        .db(bd)
        .collection(userColl)
        .findOne({ usuario: req.body.usuario });

      if (!usuario) {
        res
          .status(403)
          .send({ success: false, message: "Usuario o clave incorrectos" });
      }
      const compClave = await bcrypt.compare(password, usuario.clave);
      //let compClave = true;
      console.log(compClave);
      if (username === usuario.usuario && compClave) {
        let token = jwt.sign(
          { username: usuario.usuario, rol: usuario.rol },
          config.secret,
          {
            expiresIn: "24h",
          }
        );

        res.send({
          success: true,
          message: "Authentication successful!",
          token: token,
        });
      } else {
        res.status(403).send({
          success: false,
          message: "Incorrect username or password",
        });
      }
    } else {
      res.status(400).send({
        success: false,
        message: "Authentication failed! Please check the request",
      });
    }
  };

  index(req, res) {
    res.json({
      success: true,
      message: "Index page",
    });
  }
}
module.exports = HandlerGenerator;
