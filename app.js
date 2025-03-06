import express from "express"
import { testarConexao } from "./db.js"

const app = express() // criar instancia do express

testarConexao()

const port = 3000
app.listen(port, () => {
    console.log(`Servidor rodadndo na porta http://localhost:${port}`);
    
})