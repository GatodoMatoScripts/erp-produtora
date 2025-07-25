
const db = require('../config/db');

exports.registrar = async (id_tarefa, id_usuario, dadosEntrada) => {
    const { data, horas_gastas, descricao } = dadosEntrada;
    const [resultado] = await db.query(
        'INSERT INTO timesheet_entradas (id_tarefa, id_usuario, data, horas_gastas, descricao) VALUES (?, ?, ?, ?, ?)',
        [id_tarefa, id_usuario, data, horas_gastas, descricao]
    );
    return { id: resultado.insertId };
};

exports.listarPorTarefa = async (id_tarefa) => {
    const [entradas] = await db.query(`
        SELECT te.*, u.nome as nome_usuario
        FROM timesheet_entradas te
        JOIN usuarios u ON te.id_usuario = u.id
        WHERE te.id_tarefa = ?
        ORDER BY te.data DESC
    `, [id_tarefa]);
    return entradas;
};

exports.listarPorUsuario = async (id_usuario) => {
    const [entradas] = await db.query(`
        SELECT 
            te.id, te.data, te.horas_gastas, te.descricao,
            t.titulo as nome_tarefa,
            j.numero_job, j.nome_campanha
        FROM timesheet_entradas te
        JOIN tarefas t ON te.id_tarefa = t.id
        JOIN jobs j ON t.id_job = j.id
        WHERE te.id_usuario = ?
        ORDER BY te.data DESC
    `, [id_usuario]);
    return entradas;
};

// Um usuário só pode remover suas próprias entradas.
exports.remover = async (id_entrada, id_usuario) => {
    const [resultado] = await db.query(
        'DELETE FROM timesheet_entradas WHERE id = ? AND id_usuario = ?', 
        [id_entrada, id_usuario]
    );
    return resultado.affectedRows > 0;
};