import mongoose, { Schema } from "mongoose";
import usuario from "../controllers/usuario";

const usuarioSchema = new Schema({
  nombre: { type: String, maxlength: 100, required: true },
  correo: { type: String, maxlength: 100, required: true, unique: true },
  contrasena: { type: String, maxlength: 100, required: true },
  estado: { type: Number, default: 1 },
  fecha_creado: { type: Date, default: Date.now },
});

usuarioSchema.method("toJSON", function () {
  const { __v, _id, contrasena, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Usuario = mongoose.model("usuario", usuarioSchema);
export default Usuario;
