import express from "express";
require("dotenv").config();
import db from "./database/config";
import router from "./routes";
import cors from "cors";
import morgan from "morgan";
import path from "path";
//Conexión de base de datos
db();

//app express
const app = express();

//Para ver las rutas
app.use(morgan("dev"));

app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use("/api", router);

//Ruta Publica
app.use(express.static(path.join(__dirname, "public")));

app.set("port", process.env.PUERTO || 3000);
app.listen(app.get("port"), (err) => {
  if (err) throw new Error(err);
  console.log("Servidor corriendo en el puerto: " + app.get("port"));
});
