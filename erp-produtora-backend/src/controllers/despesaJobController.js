
const despesaModel = require('../models/despesaJobModel');

exports.adicionarDespesa = async (req, res) => {
    const { jobId } = req.params;
    try {
        const novaDespesa = await despesaModel.adicionar(jobId, req.body);
        res.status(201).json({ mensagem: "Despesa adicionada com sucesso!", despesa: novaDespesa });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro no servidor ao adicionar despesa.", erro: error.message });
    }
};

exports.listarDespesasDoJob = async (req, res) => {
    const { jobId } = req.params;
    try {
        const despesas = await despesaModel.listarPorJob(jobId);
        res.status(200).json(despesas);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro no servidor ao listar despesas.", erro: error.message });
    }
};

exports.mudarStatusPagamento = async (req, res) => {
    const { despesaId } = req.params;
    const { status } = req.body;
     if (!status) {
        return res.status(400).json({ mensagem: 'O novo status de pagamento é obrigatório.' });
    }
    try {
        const atualizado = await despesaModel.mudarStatus(despesaId, status);
        if (!atualizado) {
            return res.status(404).json({ mensagem: 'Despesa não encontrada.' });
        }
        res.status(200).json({ mensagem: `Status da despesa alterado para "${status}" com sucesso.` });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro no servidor ao mudar status da despesa.", erro: error.message });
    }
};

exports.removerDespesa = async (req, res) => {
    const { despesaId } = req.params;
    try {
        const removido = await despesaModel.remover(despesaId);
        if (!removido) {
            return res.status(404).json({ mensagem: 'Despesa não encontrada.' });
        }
        res.status(200).json({ mensagem: "Despesa removida com sucesso." });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro no servidor ao remover despesa.", erro: error.message });
    }
};

// Novo controller para a ação de registrar pagamento da despesa
exports.registrarPagamentoDespesa = async (req, res) => {
    try {
        await despesaModel.registrarPagamento(req.params.despesaId, req.body);
        res.status(200).json({ mensagem: "Pagamento de despesa registrado e lançamento financeiro criado com sucesso!" });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no servidor ao registrar pagamento de despesa.', erro: error.message });
    }
};