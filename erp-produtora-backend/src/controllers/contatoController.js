
const contatoModel = require('../models/contatoModel');

exports.criarContatoCompleto = async (req, res) => {
    try {
        const { perfil, cargo } = req.body;
        if (!perfil || !cargo || !perfil.nome || !cargo.id_agencia || !cargo.cargo) {
            return res.status(400).json({ mensagem: 'Dados insuficientes. É necessário o perfil do contato e os dados do cargo inicial.' });
        }

        const novoContato = await contatoModel.criar(req.body);
        res.status(201).json({ mensagem: 'Contato e cargo inicial criados com sucesso!', contato: novoContato });
    } catch (error) {
        console.error("Erro ao criar contato:", error);
        res.status(500).json({ mensagem: 'Erro no servidor ao criar contato.', erro: error.message });
    }
};

exports.listarContatosAtuais = async (req, res) => {
    try {
        const contatos = await contatoModel.listarTodos();
        res.status(200).json(contatos);
    } catch (error) {
        console.error("Erro ao listar contatos:", error);
        res.status(500).json({ mensagem: 'Erro no servidor ao listar contatos.', erro: error.message });
    }
};

exports.obterPerfilCompleto = async (req, res) => {
    try {
        const perfilCompleto = await contatoModel.buscarPerfilCompletoPorId(req.params.id);
        if (!perfilCompleto) {
            return res.status(404).json({ mensagem: 'Contato não encontrado.' });
        }
        res.status(200).json(perfilCompleto);
    } catch (error) {
        console.error("Erro ao obter perfil:", error);
        res.status(500).json({ mensagem: 'Erro no servidor ao obter perfil do contato.', erro: error.message });
    }
};