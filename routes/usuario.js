import { Router } from "express";
import UsuarioController from "../controllers/usuario";
import validarCampos from "../middlewares/validar-campos";
import { check } from "express-validator";
import validarJWT from "../middlewares/validar-jwt";
const router = Router();

router.post(
  "/agregar",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "El correo es obligatorio").isEmail(),
    check("contrasena", "La contraseña es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  UsuarioController.agregar
);
router.post(
  "/login",
  [
    check("correo", "El correo es obligatorio").isEmail(),
    check("contrasena", "La contraseña es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  UsuarioController.login
);
router.get("/renewToken", validarJWT, UsuarioController.renewToken);

export default router;
