
const db = require('../config/db');
const crypto = require('crypto'); // Módulo nativo do Node.js para gerar strings seguras

exports.gerarTokenAcesso = async (id_job, email_cliente) => {
    // Gera um token aleatório, seguro e difícil de adivinhar
    const token = crypto.randomBytes(32).toString('hex');

    // Define a data de expiração (ex: 7 dias a partir de agora)
    const data_expiracao = new Date();
    data_expiracao.setDate(data_expiracao.getDate() + 7);

    // Desativa tokens antigos para o mesmo job, se houver
    await db.query('UPDATE acesso_portal SET ativo = FALSE WHERE id_job = ?', [id_job]);

    // Insere o novo token no banco
    const [resultado] = await db.query(
        'INSERT INTO acesso_portal (id_job, email_cliente, token, data_expiracao) VALUES (?, ?, ?, ?)',
        [id_job, email_cliente, token, data_expiracao]
    );

    return { id: resultado.insertId, token };
};

// Nova função para buscar os dados de um job a partir do ID do job
// que obtemos do token validado.
exports.buscarJobParaCliente = async (id_job) => {
    // Selecionamos apenas os campos que o cliente precisa ver
    const [jobs] = await db.query(`
        SELECT 
            numero_job, nome_campanha, tipo_job, status_progresso, status_producao
        FROM jobs
        WHERE id = ?
    `, [id_job]);
    return jobs[0];
};

// Nova função para listar os arquivos de um job
exports.listarArquivosPorJob = async (id_job) => {
    const [arquivos] = await db.query(
        'SELECT id, nome_arquivo, url_arquivo, tipo_arquivo, versao, data_upload FROM arquivos_job WHERE id_job = ? ORDER BY versao DESC, data_upload DESC',
        [id_job]
    );
    return arquivos;
};

// Nova função para o cliente ou equipe interna adicionar um comentário
exports.adicionarComentario = async (dadosComentario) => {
    const { id_job, id_arquivo, autor_nome, comentario, timestamp_video } = dadosComentario;
    const [resultado] = await db.query(
        'INSERT INTO portal_comentarios (id_job, id_arquivo, autor_nome, comentario, timestamp_video) VALUES (?, ?, ?, ?, ?)',
        [id_job, id_arquivo, autor_nome, comentario, timestamp_video]
    );
    return { id: resultado.insertId };
};

// Nova função para listar os comentários de um job
exports.listarComentariosPorJob = async (id_job) => {
    const [comentarios] = await db.query(
        'SELECT * FROM portal_comentarios WHERE id_job = ? ORDER BY data_comentario ASC',
        [id_job]
    );
    return comentarios;
};