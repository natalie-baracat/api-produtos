import express from "express"
import usuarioController from "../controllers/usuarioController.js"

const router = express.Router()
router.post("/usuarios", usuarioController.novoUsuario)

export default router