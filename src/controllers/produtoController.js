import Produto from "../models/produto.js"

class produtoController {
    static async novoProduto(req, res) {
        const { nome, preco, imagem, linkproduto, categoria, fretegratis } = req.body

        //validando dados
        if (!nome || !preco || !categoria || !fretegratis) {
            return res.send(400).json({message: "Faltam campos obrigatórios a serem preenchidos."})
        } 
        try {
            const produto = await Produto.novoProduto(nome, preco, imagem, linkproduto, categoria, fretegratis)
            res.status(201).json(produto) // retorna o produto criado juntamente a mensagem de sucesso
        } catch (error) {
            console.error("Erro ao criar o produto — ", error)
            res.status(500).json({message: "Erro ao criar o produto", error: error.message})
        }
    }
}

export default produtoController