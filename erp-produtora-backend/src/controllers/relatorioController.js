
const relatorioModel = require('../models/relatorioModel');

exports.getFaturamentoPorAgencia = async (req, res) => {
    try {
        // Os filtros virão da URL como query params (ex: ?data_inicio=2025-01-01)
        const filtros = req.query;
        const relatorio = await relatorioModel.faturamentoPorAgencia(filtros);
        res.status(200).json(relatorio);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no servidor ao gerar relatório.', erro: error.message });
    }
};

exports.getLucratividadePorJob = async (req, res) => {
    try {
        const filtros = req.query;
        const relatorio = await relatorioModel.lucratividadePorJob(filtros);
        res.status(200).json(relatorio);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no servidor ao gerar relatório de lucratividade.', erro: error.message });
    }
};