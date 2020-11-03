import jwt from "jsonwebtoken";
import Usuario from "../models/usuario";

const validarJWT = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(500).json({
      ok: false,
      mensaje: "No hay token en la peticion",
    });
  }
  try {
    const { id } = jwt.verify(token, process.env.JWT);

    const usuario = await Usuario.findOne({ _id: id, estado: 1 });

    if (!usuario) {
      return res.status(500).json({
        ok: false,
        mensaje: "Usuario no autorizado.",
      });
    }
    req.id = id;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      mensaje: "Token no valido",
    });
  }
};

export default validarJWT;
