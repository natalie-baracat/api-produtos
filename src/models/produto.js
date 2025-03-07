import {BD} from "../../db.js"

class Produto {
    static async novoProduto(nome, preco, imagem, linkproduto, categoria, fretegratis) {
        const resultado = await BD.query(`
            INSERT INTO prod_produtos(nome, preco, imagem, linkproduto, categoria, fretegratis)
                VALUES($1, $2, $3, $4, $5, $6)`, [nome, preco, imagem, linkproduto, categoria, fretegratis]
        )
        return resultado.rows[0]
    }
}

export default Produto