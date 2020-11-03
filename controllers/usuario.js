import modelUsuario from "../models";
import bcryptjs from "bcryptjs";
import Usuario from "../models/usuario";
import helperToken from "../helpers/jwt";

const agregar = async (req, res) => {
  const { correo, contrasena } = req.body;
  try {
    const existeCorreo = await modelUsuario.Usuario.findOne({ correo });
    if (existeCorreo) {
      return res.status(500).json({
        ok: false,
        mensaje: "El correo ya esta registrado.",
      });
    } else {
      const usuario = new modelUsuario.Usuario(req.body);

      //ENCRYPTADO DE CONTRASEÑA
      const salt = bcryptjs.genSaltSync();
      usuario.contrasena = bcryptjs.hashSync(contrasena, salt);

      await usuario.save();

      return res.status(200).json({
        ok: true,
        mensaje: "Usuario creado.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      mensaje: "Hable con el administrador.",
    });
  }
};

const login = async (req, res) => {
  const { correo, contrasena } = req.body;
  try {
    const usuario = await Usuario.findOne({ correo, estado: 1 });
    if (!usuario) {
      return res.status(500).json({
        ok: false,
        mensaje: "Usuario/Contraseña incorrecta.",
      });
    }
    const validaContrasena = await bcryptjs.compare(
      contrasena,
      usuario.contrasena
    );
    if (!validaContrasena) {
      return res.status(500).json({
        ok: false,
        mensaje: "Usuario/Contraseña incorrecta.",
      });
    }

    const token = await helperToken.generarJWT(usuario.id, "24h");
    return res.status(200).json({
      ok: true,
      mensaje: "Usuario y contraseña correctos",
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mensaje: "Hable con el administrador.",
    });
  }
};

const renewToken = async (req, res) => {
  try {
    const id = req.id;
    const token = await helperToken.generarJWT(id, "24h");
    const usuario = await Usuario.findById({ _id: id });
    res.status(200).json({
      ok: true,
      mensaje: "Token refrescado",
      token,
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mensaje: "Hable con el administrador.",
    });
  }
};

export default {
  agregar,
  login,
  renewToken,
};
