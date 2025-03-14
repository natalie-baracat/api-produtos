import { BD } from "../../db.js";
import Usuario from "../models/usuario.js";


class usuarioController {
    static async novoUsuario(req, res) {
        const { nome , email, senha } = req.body

        //validando dados
        if (!nome || !email || !senha) {
            return res.send(400).json({message: "Nome, email, e senha são obrigatórios"})
        } 
        
        try {
            // chama o metodo na classe usuario para criar um novo usuario
            const usuario = await Usuario.novoUsuario(nome, email, senha)
            res.status(201).json(usuario) // retorna o usuario criado juntamente a mensagem de sucesso
        } catch (error) {
            console.error("Erro ao criar o usuário — ", error)
            res.status(500).json({message: "Erro ao criar o usuário", error: error.message})
        }
    }

    // funçao para listar todos os usuários
    static async listarUsuarios(req, res) {
        try {
            const usuarios = await Usuario.listarUsuarios() // chama o metodo listar da  model (classe) usuario
            res.status(201).json(usuarios)
        } catch (error) {
            res.status(500).json({message:
                "Erro ao listar usuários — ", error: error.message
            })            
        }
    }
    // essa faz a mesma coisa que a de cima, porém é mais direta; nao precisa da model
    static async listarTodos(req, res) {
        try {
            // const usuarios = await Usuario.listarUsuarios() // chama o metodo listar da  model (classe) usuario
            const usuarios = await BD.query("SELECT * FROM prod_usuarios") //buscando direto do banco sem usar o metodo da model 
            return res.status(200).json(usuarios.rows) // retorno aqui pois nao estou mais usando a model (ll ja listava e retornava entao aqui orecisa ser manual)
        } catch (error) {
            res.status(500).json({message:
                "Erro ao listar usuários — ", error: error.message
            })            
        }
    }
    static async deletarUsuario(req, res) { 
        try {
            const usuario = await Usuario.deletarUsuario()
            return res.status(200).json({message: "Usuário deletado com sucesso!"})
        } catch (error) {
            res.status(500).json({message: "Erro ao deletar usuário", error: error.message})
            
        }
    }
    static async consultaPorId(req, res) {
        const { id } = req.params
        try {
            const usuario = await BD.query("SELECT * FROM prod_usuarios WHERE id = $1", [id])
            return res.status(200).json(usuario.rows)
        } catch (error) {
            res.status(500).json({message: "Erro ao consultar usuário", error: error.message})
        }
    }

    static async atualizarUsuario(req, res) {
        const { id } = req.params
        const { nome, email, senha} = req.body
        try {
            const usuario = await BD.query(`
                UPDATE prod_usuario SET nome = $1, email = $2
                    WHERE id = $4 RETURNING`, [nome, email, senha, id]
            )
            res.status(200).json(usuario.rows)
        } catch (error) {
            res.status(500).json({message: "Erro ao atualizar usuário", error: error.message})
        }
    }
}

export default usuarioController