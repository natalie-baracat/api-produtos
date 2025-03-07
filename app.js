import express from "express"
import { testarConexao } from "./db.js"
import bodyParser from "body-parse"
import cors from "cors"
import usuarioRoutes from "./src/routes/usuarioRoutes.js"

const app = express() // criar instancia do express

testarConexao()
app.use(cors())
// middleware. uso do body parser para receber os valores do corpo na requisiçao json
app.use(bodyParser.json())
// definir as rotas de usuario importadas no arquivo
app.use(usuarioRoutes)

const port = 3000
app.listen(port, () => {
    console.log(`Servidor rodadndo na porta http://localhost:${port}`);
    
})