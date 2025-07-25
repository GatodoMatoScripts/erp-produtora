
const db = require('../config/db');

exports.criar = async (id_job, dadosTarefa) => {
    const { titulo, descricao, data_inicio_prevista, data_fim_prevista } = dadosTarefa;
    const [resultado] = await db.query(
        'INSERT INTO tarefas (id_job, titulo, descricao, data_inicio_prevista, data_fim_prevista) VALUES (?, ?, ?, ?, ?)',
        [id_job, titulo, descricao, data_inicio_prevista, data_fim_prevista]
    );
    return { id: resultado.insertId };
};

exports.listarPorJob = async (id_job) => {
    const [tarefas] = await db.query('SELECT * FROM tarefas WHERE id_job = ? ORDER BY data_inicio_prevista ASC', [id_job]);
    return tarefas;
};

exports.atualizarStatus = async (id_tarefa, status) => {
    const [resultado] = await db.query('UPDATE tarefas SET status = ? WHERE id = ?', [status, id_tarefa]);
    return resultado.affectedRows > 0;
};

exports.remover = async (id_tarefa) => {
    const [resultado] = await db.query('DELETE FROM tarefas WHERE id = ?', [id_tarefa]);
    return resultado.affectedRows > 0;
};