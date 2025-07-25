
const db = require('../config/db');

exports.criar = async (dadosFornecedor) => {
    const { tipo_fornecedor, nome_razao_social, nome_fantasia_apelido, cpf_cnpj, especialidade, contato_principal_nome, email, telefone, dados_bancarios } = dadosFornecedor;
    const [resultado] = await db.query(
        'INSERT INTO fornecedores (tipo_fornecedor, nome_razao_social, nome_fantasia_apelido, cpf_cnpj, especialidade, contato_principal_nome, email, telefone, dados_bancarios) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [tipo_fornecedor, nome_razao_social, nome_fantasia_apelido, cpf_cnpj, especialidade, contato_principal_nome, email, telefone, dados_bancarios]
    );
    return { id: resultado.insertId, ...dadosFornecedor };
};

exports.listarTodos = async () => {
    const [fornecedores] = await db.query('SELECT * FROM fornecedores WHERE ativo = TRUE ORDER BY nome_razao_social ASC');
    return fornecedores;
};

exports.buscarPorId = async (id) => {
    const [fornecedores] = await db.query('SELECT * FROM fornecedores WHERE id = ? AND ativo = TRUE', [id]);
    return fornecedores[0];
};

exports.atualizar = async (id, dadosFornecedor) => {
    const { tipo_fornecedor, nome_razao_social, nome_fantasia_apelido, cpf_cnpj, especialidade, contato_principal_nome, email, telefone, dados_bancarios } = dadosFornecedor;
    const [resultado] = await db.query(
        'UPDATE fornecedores SET tipo_fornecedor = ?, nome_razao_social = ?, nome_fantasia_apelido = ?, cpf_cnpj = ?, especialidade = ?, contato_principal_nome = ?, email = ?, telefone = ?, dados_bancarios = ? WHERE id = ?',
        [tipo_fornecedor, nome_razao_social, nome_fantasia_apelido, cpf_cnpj, especialidade, contato_principal_nome, email, telefone, dados_bancarios, id]
    );
    return resultado.affectedRows > 0;
};

exports.desativar = async (id) => {
    const [resultado] = await db.query('UPDATE fornecedores SET ativo = FALSE WHERE id = ?', [id]);
    return resultado.affectedRows > 0;
};