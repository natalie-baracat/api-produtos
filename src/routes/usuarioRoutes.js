import express from "express"
import usuarioController from "../controllers/usuarioController.js"

const router = express.Router()
router.post("/usuarios", usuarioController.novoUsuario)
router.get("/usuarios", usuarioController.listarUsuarios)
router.delete("/usuarios/:id", usuarioController.deletarUsuario)
router.get("/usuarios/:id", usuarioController.consultaPorId)
router.put("/usuarios/:id", usuarioController.atualizarUsuario)

export default router