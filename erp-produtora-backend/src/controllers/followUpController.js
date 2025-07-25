
const followUpModel = require('../models/followUpModel');

exports.agendarFollowUp = async (req, res) => {
    const { jobId } = req.params;
    const id_usuario_responsavel = req.usuario.id; // Usuário logado é o responsável
    try {
        const novoFollowUp = await followUpModel.agendar(jobId, id_usuario_responsavel, req.body);
        res.status(201).json({ mensagem: "Follow-up agendado com sucesso!", follow_up: novoFollowUp });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro no servidor ao agendar follow-up.", erro: error.message });
    }
};

exports.listarFollowUpsDoJob = async (req, res) => {
    const { jobId } = req.params;
    try {
        const followUps = await followUpModel.listarPorJob(jobId);
        res.status(200).json(followUps);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro no servidor ao listar follow-ups.", erro: error.message });
    }
};

exports.mudarStatusFollowUp = async (req, res) => {
    const { followUpId } = req.params;
    const { status } = req.body;
    if (!status || !['Concluído', 'Cancelado', 'Pendente'].includes(status)) {
        return res.status(400).json({ mensagem: 'Status inválido.' });
    }
    try {
        const atualizado = await followUpModel.marcarStatus(followUpId, status);
        if (!atualizado) {
            return res.status(404).json({ mensagem: 'Tarefa de follow-up não encontrada.' });
        }
        res.status(200).json({ mensagem: `Status do follow-up alterado para "${status}" com sucesso.` });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro no servidor ao atualizar follow-up.", erro: error.message });
    }
};

exports.removerFollowUp = async (req, res) => {
    const { followUpId } = req.params;
    try {
        const removido = await followUpModel.remover(followUpId);
        if (!removido) {
            return res.status(404).json({ mensagem: 'Tarefa de follow-up não encontrada.' });
        }
        res.status(200).json({ mensagem: "Tarefa de follow-up removida com sucesso." });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro no servidor ao remover follow-up.", erro: error.message });
    }
};