import {BD} from "../../db.js"

class Usuario {
    // funcao estatica para novo usuario
    static async novoUsuario(nome, email, senha) {
        const resultado = await BD.query(`
            INSERT INTO prod_usuarios(nome, email, senha)
                VALUES($1, $2, $3)`, [nome, email, senha]
        )
        return resultado.rows[0]
    }
    static async listarUsuarios() {
        const resultado = await BD.query("SELECT * FROM prod_usuarios")
        return resultado.rows // retorna todas as linhas de dados
    }
    static async deletarUsuario() {
        const { id } = req.params
        const resultado =  await BD.query("DELETE FROM prod_usuarios WHERE id = $1", [id])
        return resultado
    }
}

export default Usuario