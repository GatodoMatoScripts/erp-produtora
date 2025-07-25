
const tarefaModel = require('../models/tarefaModel');

exports.criarTarefa = async (req, res) => {
    const { jobId } = req.params;
    try {
        const novaTarefa = await tarefaModel.criar(jobId, req.body);
        res.status(201).json({ mensagem: "Tarefa criada com sucesso!", tarefa: novaTarefa });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro no servidor ao criar tarefa.", erro: error.message });
    }
};

exports.listarTarefasDoJob = async (req, res) => {
    const { jobId } = req.params;
    try {
        const tarefas = await tarefaModel.listarPorJob(jobId);
        res.status(200).json(tarefas);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro no servidor ao listar tarefas.", erro: error.message });
    }
};

exports.mudarStatusTarefa = async (req, res) => {
    const { tarefaId } = req.params;
    const { status } = req.body;
    const statusPermitidos = ['Pendente', 'Em Andamento', 'Para Revisão', 'Concluída'];
    if (!status || !statusPermitidos.includes(status)) {
        return res.status(400).json({ mensagem: 'Status inválido.' });
    }
    try {
        const atualizado = await tarefaModel.atualizarStatus(tarefaId, status);
        if (!atualizado) {
            return res.status(404).json({ mensagem: 'Tarefa não encontrada.' });
        }
        res.status(200).json({ mensagem: `Status da tarefa alterado para "${status}" com sucesso.` });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro no servidor ao atualizar status da tarefa.", erro: error.message });
    }
};

exports.removerTarefa = async (req, res) => {
    const { tarefaId } = req.params;
    try {
        const removido = await tarefaModel.remover(tarefaId);
        if (!removido) {
            return res.status(404).json({ mensagem: 'Tarefa não encontrada.' });
        }
        res.status(200).json({ mensagem: "Tarefa removida com sucesso." });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro no servidor ao remover tarefa.", erro: error.message });
    }
};