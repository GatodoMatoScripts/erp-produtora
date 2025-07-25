
const db = require('../config/db');

exports.agendar = async (id_job, id_usuario_responsavel, dadosFollowUp) => {
    const { data_agendada, tipo_contato, anotacoes } = dadosFollowUp;
    const [resultado] = await db.query(
        'INSERT INTO follow_ups (id_job, id_usuario_responsavel, data_agendada, tipo_contato, anotacoes) VALUES (?, ?, ?, ?, ?)',
        [id_job, id_usuario_responsavel, data_agendada, tipo_contato, anotacoes]
    );
    return { id: resultado.insertId };
};

exports.listarPorJob = async (id_job) => {
    const [followUps] = await db.query(`
        SELECT 
            f.*,
            u.nome as nome_responsavel
        FROM follow_ups f
        LEFT JOIN usuarios u ON f.id_usuario_responsavel = u.id
        WHERE f.id_job = ?
        ORDER BY f.data_agendada ASC
    `, [id_job]);
    return followUps;
};

exports.marcarStatus = async (id_follow_up, status) => {
    let dataConclusao = null;
    if (status === 'Concluído') {
        dataConclusao = new Date();
    }
    
    const [resultado] = await db.query(
        'UPDATE follow_ups SET status = ?, data_conclusao = ? WHERE id = ?', 
        [status, dataConclusao, id_follow_up]
    );
    return resultado.affectedRows > 0;
};

exports.remover = async (id_follow_up) => {
    const [resultado] = await db.query('DELETE FROM follow_ups WHERE id = ?', [id_follow_up]);
    return resultado.affectedRows > 0;
};