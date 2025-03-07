import pkg from "pg"
import dotenv from "dotenv"

const { Pool } = pkg
dotenv.config()

// nao vamos mais usar o bd online

// const BD = new Pool({
//     connectionString: process.env.DATABASE_URL
// })

const BD = new Pool ({
    user: "postgres",
    host: "localhost",
    password: "admin",
    database: "bd_financeiro",
    port: 5432

})

const testarConexao = async () => {
    try {
        const client = await BD.connect() // tenta estabelecer a conexao com o banco de dados
        console.log("✔ Conexão com o banco de dados estabelecida");
        client.release() // libera o cliente
    } catch (error) {
        console.error("Erro ao conectar banco de dados — ", error.message)
    }
}

export {BD, testarConexao}