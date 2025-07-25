
const timesheetModel = require('../models/timesheetModel');

exports.registrarEntrada = async (req, res) => {
    const { tarefaId } = req.params;
    const id_usuario = req.usuario.id; // O usuário logado é quem registra a hora
    try {
        const novaEntrada = await timesheetModel.registrar(tarefaId, id_usuario, req.body);
        res.status(201).json({ mensagem: "Entrada de horas registrada com sucesso!", entrada: novaEntrada });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro no servidor ao registrar entrada.", erro: error.message });
    }
};

exports.listarEntradasDaTarefa = async (req, res) => {
    const { tarefaId } = req.params;
    try {
        const entradas = await timesheetModel.listarPorTarefa(tarefaId);
        res.status(200).json(entradas);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro no servidor ao listar entradas.", erro: error.message });
    }
};

exports.listarMinhasEntradas = async (req, res) => {
    const id_usuario = req.usuario.id;
    try {
        const minhasEntradas = await timesheetModel.listarPorUsuario(id_usuario);
        res.status(200).json(minhasEntradas);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro no servidor ao listar minhas entradas.", erro: error.message });
    }
};

exports.removerEntrada = async (req, res) => {
    const { entradaId } = req.params;
    const id_usuario_logado = req.usuario.id;
    try {
        const removido = await timesheetModel.remover(entradaId, id_usuario_logado);
        if (!removido) {
            return res.status(404).json({ mensagem: 'Entrada de timesheet não encontrada ou você não tem permissão para removê-la.' });
        }
        res.status(200).json({ mensagem: "Entrada de timesheet removida com sucesso." });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro no servidor ao remover entrada.", erro: error.message });
    }
};