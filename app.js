import express from "express"
import { testarConexao } from "./db.js"
import bodyParser from "body-parser"
import cors from "cors"

import usuarioRoutes from "./src/routes/usuarioRoutes.js"
import produtoRoutes from "./src/routes/produtoRoutes.js"

import usuarioController from "./src/controllers/usuarioController.js"


const app = express() // criar instancia do express

testarConexao()
app.use(cors())
// middleware. uso do body parser para receber os valores do corpo na requisiçao json
app.use(bodyParser.json())

// definir as rotas importadas no arquivo
app.use(usuarioRoutes)
app.use(produtoRoutes)

// APENAS PARA DEMONSTRAR: rotas diretas da controller, ao inves de antes passar pelas routes
// app.get("/usuarios/listarTodos", usuarioController.listarTodos)

const port = 3000
app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
    
})