
const alocacaoModel = require('../models/alocacaoModel');

exports.alocarRecurso = async (req, res) => {
    const { tarefaId } = req.params;
    const { tipo_recurso, id_recurso } = req.body;

    if (!tipo_recurso || !id_recurso) {
        return res.status(400).json({ mensagem: 'Tipo e ID do recurso são obrigatórios.' });
    }

    try {
        const novaAlocacao = await alocacaoModel.alocar(tarefaId, tipo_recurso, id_recurso);
        res.status(201).json({ mensagem: 'Recurso alocado com sucesso!', alocacao: novaAlocacao });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no servidor ao alocar recurso.', erro: error.message });
    }
};

exports.listarAlocacoesDaTarefa = async (req, res) => {
    const { tarefaId } = req.params;
    try {
        const alocacoes = await alocacaoModel.listarPorTarefa(tarefaId);
        res.status(200).json(alocacoes);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no servidor ao listar alocações.', erro: error.message });
    }
};

exports.desalocarRecurso = async (req, res) => {
    // Para desalocar, precisamos do ID da alocação em si, não do recurso.
    const { alocacaoId } = req.params;
    const { tipo_recurso } = req.body; // Precisamos saber de qual tabela deletar.

    if (!tipo_recurso) {
        return res.status(400).json({ mensagem: 'O tipo de recurso é obrigatório para desalocar.' });
    }

    try {
        const removido = await alocacaoModel.desalocar(alocacaoId, tipo_recurso);
        if (!removido) {
            return res.status(404).json({ mensagem: 'Alocação não encontrada.' });
        }
        res.status(200).json({ mensagem: "Recurso desalocado com sucesso." });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro no servidor ao desalocar recurso.", erro: error.message });
    }
};