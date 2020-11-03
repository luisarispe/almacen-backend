import { Router } from "express";
import UsuarioRouter from "./usuario";
const router = Router();

router.use("/usuario", UsuarioRouter);

export default router;
