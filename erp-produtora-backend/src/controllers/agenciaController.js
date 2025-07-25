
const agenciaModel = require('../models/agenciaModel');

exports.criarAgencia = async (req, res) => {
    try {
        const novaAgencia = await agenciaModel.criar(req.body);
        res.status(201).json({ mensagem: 'Agência criada com sucesso!', agencia: novaAgencia });
    } catch (error) {
        // Código 1062 é erro de entrada duplicada no MySQL (ex: CNPJ já existe)
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ mensagem: 'Erro: O CNPJ informado já está cadastrado.' });
        }
        res.status(500).json({ mensagem: 'Erro no servidor ao criar agência.', erro: error.message });
    }
};

exports.listarAgencias = async (req, res) => {
    try {
        const agencias = await agenciaModel.listarTodas();
        res.status(200).json(agencias);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no servidor ao listar agências.', erro: error.message });
    }
};

exports.obterAgencia = async (req, res) => {
    try {
        const agencia = await agenciaModel.buscarPorId(req.params.id);
        if (!agencia) {
            return res.status(404).json({ mensagem: 'Agência não encontrada.' });
        }
        res.status(200).json(agencia);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no servidor ao obter agência.', erro: error.message });
    }
};

exports.atualizarAgencia = async (req, res) => {
    try {
        const atualizado = await agenciaModel.atualizar(req.params.id, req.body);
        if (!atualizado) {
            return res.status(404).json({ mensagem: 'Agência não encontrada para atualização.' });
        }
        res.status(200).json({ mensagem: 'Agência atualizada com sucesso.' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ mensagem: 'Erro: O CNPJ informado já pertence a outra agência.' });
        }
        res.status(500).json({ mensagem: 'Erro no servidor ao atualizar agência.', erro: error.message });
    }
};

exports.desativarAgencia = async (req, res) => {
    try {
        const desativado = await agenciaModel.desativar(req.params.id);
        if (!desativado) {
            return res.status(404).json({ mensagem: 'Agência não encontrada para desativação.' });
        }
        res.status(200).json({ mensagem: 'Agência desativada com sucesso.' });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no servidor ao desativar agência.', erro: error.message });
    }
};