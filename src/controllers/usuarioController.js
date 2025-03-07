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
}

export default usuarioController