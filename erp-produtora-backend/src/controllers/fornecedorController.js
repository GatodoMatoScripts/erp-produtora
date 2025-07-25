
const fornecedorModel = require('../models/fornecedorModel');

exports.criarFornecedor = async (req, res) => {
    try {
        const novoFornecedor = await fornecedorModel.criar(req.body);
        res.status(201).json({ mensagem: 'Fornecedor criado com sucesso!', fornecedor: novoFornecedor });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ mensagem: 'Erro: O CPF/CNPJ informado já está cadastrado.' });
        }
        res.status(500).json({ mensagem: 'Erro no servidor ao criar fornecedor.', erro: error.message });
    }
};

exports.listarFornecedores = async (req, res) => {
    try {
        const fornecedores = await fornecedorModel.listarTodos();
        res.status(200).json(fornecedores);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no servidor ao listar fornecedores.', erro: error.message });
    }
};

exports.obterFornecedor = async (req, res) => {
    try {
        const fornecedor = await fornecedorModel.buscarPorId(req.params.id);
        if (!fornecedor) {
            return res.status(404).json({ mensagem: 'Fornecedor não encontrado.' });
        }
        res.status(200).json(fornecedor);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no servidor ao obter fornecedor.', erro: error.message });
    }
};

exports.atualizarFornecedor = async (req, res) => {
    try {
        const atualizado = await fornecedorModel.atualizar(req.params.id, req.body);
        if (!atualizado) {
            return res.status(404).json({ mensagem: 'Fornecedor não encontrado para atualização.' });
        }
        res.status(200).json({ mensagem: 'Fornecedor atualizado com sucesso.' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ mensagem: 'Erro: O CPF/CNPJ informado já pertence a outro fornecedor.' });
        }
        res.status(500).json({ mensagem: 'Erro no servidor ao atualizar fornecedor.', erro: error.message });
    }
};

exports.desativarFornecedor = async (req, res) => {
    try {
        const desativado = await fornecedorModel.desativar(req.params.id);
        if (!desativado) {
            return res.status(404).json({ mensagem: 'Fornecedor não encontrado para desativação.' });
        }
        res.status(200).json({ mensagem: 'Fornecedor desativado com sucesso.' });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no servidor ao desativar fornecedor.', erro: error.message });
    }
};