import {BD} from "../../db.js"

class Produto {
    static async metNovoProduto(nome, preco, imagem, linkproduto, categoria, fretegratis) {
        const resultado = await BD.query(`
            INSERT INTO prod_produtos(nome, preco, imagem, linkproduto, categoria, fretegratis)
                VALUES($1, $2, $3, $4, $5, $6)`, [nome, preco, imagem, linkproduto, categoria, fretegratis]
        )
        return resultado.rows[0]
    }

    static async metListarProdutos() {
        const resultado = await BD.query("SELECT * FROM prod_produtos")
        return resultado.rows // retorna todas as linhas de dados
    }

    // static async metDeletarProduto() {
    //     const { id } = req.params
    //     const resultado =  await BD.query("DELETE FROM prod_produtos WHERE id = $1", [id])
    //     return resultado
    // }

    // static async metConsultaPorId() {
    //     const resultado = await BD.query("SELECT * FROM prod_usuarios WHERE id = $1", [id])
    //     return resultado.rows
    // }

}

export default Produto