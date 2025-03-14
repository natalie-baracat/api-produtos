import { BD } from "../../db.js"
import Produto from "../models/produto.js"

class produtoController {
    static async novoProduto(req, res) {
        const { nome, preco, imagem, linkproduto, categoria, fretegratis } = req.body

        //validando dados
        if (!nome || !preco || !categoria || !fretegratis) {
            return res.send(400).json({message: "Faltam campos obrigatórios a serem preenchidos."})
        } 
        try {
            const produto = await Produto.metNovoProduto(nome, preco, imagem, linkproduto, categoria, fretegratis)
            res.status(201).json(produto) // retorna o produto criado juntamente a mensagem de sucesso
        } catch (error) {
            console.error("Erro ao criar o produto — ", error)
            res.status(500).json({message: "Erro ao criar o produto", error: error.message})
        }
    }

    static async listarProdutos(req, res) {
        try {
            const produtos = await Produto.metListarProdutos() // chama o metodo listar da  model (classe) usuario
            res.status(201).json(produtos)
        } catch (error) {
            res.status(500).json({message:
                "Erro ao listar produtos — ", error: error.message
            })            
        }
    }

    //tentei utilizar o metodo das models mas nao consegui

    // static async deletarProduto(req, res) { 
    //     try {
    //         const produto = await Produto.metDeletarProduto()
    //         return res.status(200).json({message: "Produto deletado com sucesso!"})
    //     } catch (error) {
    //         res.status(500).json({message: "Erro ao deletar produto", error: error.message})
            
    //     }
    // }

    // static async consultaPorId(req, res) {
    //     const { id } = req.params
    //     try {
    //         const usuario = await Produto.metConsultaPorId()
    //     } catch (error) {
    //         res.status(500).json({message: "Erro ao consultar usuário", error: error.message})
    //     }
    // }

    static async deletarProduto(req, res) { 
        const { id } = req.params
        try {
            const produto = await BD.query("DELETE FROM prod_produtos WHERE id = $1", [id])
            return res.status(200).json({message: "Produto deletado com sucesso!"})
        } catch (error) {
            res.status(500).json({message: "Erro ao deletar produto", error: error.message})
            
        }
    }

    static async consultaPorId(req, res) {
        const { id } = req.params
        try {
            const produto = await BD.query("SELECT * FROM prod_produtos WHERE id = $1", [id])
            return res.status(200).json(produto.rows)
        } catch (error) {
            res.status(500).json({message: "Erro ao consultar produto", error: error.message})
        }
    }

    static async atualizarProduto(req, res) {
        const { id } = req.params
        const { nome, preco, imagem, linkproduto, categoria, fretegratis} = req.body
        try {
            const produto = await BD.query(`
                UPDATE prod_produtos SET nome = $1, preco = $2, imagem = $3, linkproduto = $4, categoria = $5, fretegratis = $6
                    WHERE id = $7 RETURNING *`, [nome, preco, imagem, linkproduto, categoria, fretegratis, id]
            )
            res.status(200).json(produto.rows)
        } catch (error) {
            res.status(500).json({message: "Erro ao atualizar produto", error: error.message})
        }
    }
}

export default produtoController