import express from "express"
import produtoController from "../controllers/produtoController.js"
const router = express.Router()
router.post("/produtos", produtoController.novoProduto)

export default router