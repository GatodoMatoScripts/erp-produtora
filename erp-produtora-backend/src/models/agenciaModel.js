
const db = require('../config/db');

// Criar uma nova agência
exports.criar = async (novaAgencia) => {
    const { razao_social, nome_fantasia, cnpj, endereco, telefone_principal, email_principal } = novaAgencia;
    const [resultado] = await db.query(
        'INSERT INTO agencias (razao_social, nome_fantasia, cnpj, endereco, telefone_principal, email_principal) VALUES (?, ?, ?, ?, ?, ?)',
        [razao_social, nome_fantasia, cnpj, endereco, telefone_principal, email_principal]
    );
    return { id: resultado.insertId, ...novaAgencia };
};

// Listar todas as agências ativas
exports.listarTodas = async () => {
    const [agencias] = await db.query('SELECT * FROM agencias WHERE ativo = TRUE ORDER BY nome_fantasia ASC');
    return agencias;
};

// Buscar uma agência específica por ID
exports.buscarPorId = async (id) => {
    const [agencias] = await db.query('SELECT * FROM agencias WHERE id = ? AND ativo = TRUE', [id]);
    return agencias[0]; // Retorna o primeiro resultado ou undefined
};

// Atualizar os dados de uma agência
exports.atualizar = async (id, dadosAgencia) => {
    const { razao_social, nome_fantasia, cnpj, endereco, telefone_principal, email_principal } = dadosAgencia;
    const [resultado] = await db.query(
        'UPDATE agencias SET razao_social = ?, nome_fantasia = ?, cnpj = ?, endereco = ?, telefone_principal = ?, email_principal = ? WHERE id = ?',
        [razao_social, nome_fantasia, cnpj, endereco, telefone_principal, email_principal, id]
    );
    return resultado.affectedRows > 0;
};

// Desativar uma agência (Soft Delete)
exports.desativar = async (id) => {
    const [resultado] = await db.query('UPDATE agencias SET ativo = FALSE WHERE id = ?', [id]);
    return resultado.affectedRows > 0;
};