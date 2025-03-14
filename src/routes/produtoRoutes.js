import express from "express"
import produtoController from "../controllers/produtoController.js"


const router = express.Router()
router.post("/produtos", produtoController.novoProduto)
router.get("/produtos", produtoController.listarProdutos)
router.delete("/produtos/:id", produtoController.deletarProduto)
router.get("/produtos/:id", produtoController.consultaPorId)
router.put("/produtos/:id", produtoController.atualizarProduto)

export default router