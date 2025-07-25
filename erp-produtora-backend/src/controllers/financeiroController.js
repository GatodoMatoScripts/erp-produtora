
const financeiroModel = require('../models/financeiroModel');

exports.criarContaBancaria = async (req, res) => {
    try {
        const novaConta = await financeiroModel.criarConta(req.body);
        res.status(201).json({ mensagem: "Conta bancária criada com sucesso!", conta: novaConta });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro no servidor ao criar conta.", erro: error.message });
    }
};

exports.listarContasBancarias = async (req, res) => {
    try {
        const contas = await financeiroModel.listarContas();
        res.status(200).json(contas);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro no servidor ao listar contas.", erro: error.message });
    }
};

exports.criarLancamentoFinanceiro = async (req, res) => {
    try {
        await financeiroModel.criarLancamento(req.body);
        res.status(201).json({ mensagem: "Lançamento financeiro criado com sucesso!" });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro no servidor ao criar lançamento.", erro: error.message });
    }
};

exports.listarLancamentos = async (req, res) => {
    const { contaId } = req.params;
    try {
        const lancamentos = await financeiroModel.listarLancamentosPorConta(contaId);
        res.status(200).json(lancamentos);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro no servidor ao listar lançamentos.", erro: error.message });
    }
};