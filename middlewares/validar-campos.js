import { validationResult } from "express-validator";

const validarCampos = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(500).json({
      ok: false,
      errors: errores.mapped(),
    });
  }
  next();
};
export default validarCampos;
