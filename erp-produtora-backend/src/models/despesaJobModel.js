
const db = require('../config/db');
const financeiroModel = require('./financeiroModel'); // Importe o financeiroModel

exports.adicionar = async (id_job, dadosDespesa) => {
    const { tipo_despesa, id_fornecedor, descricao, valor, data_vencimento, status_pagamento } = dadosDespesa;
    const [resultado] = await db.query(
        'INSERT INTO despesas_job (id_job, tipo_despesa, id_fornecedor, descricao, valor, data_vencimento, status_pagamento) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [id_job, tipo_despesa, id_fornecedor, descricao, valor, data_vencimento, status_pagamento]
    );
    return { id: resultado.insertId };
};

exports.listarPorJob = async (id_job) => {
    const [despesas] = await db.query(`
        SELECT 
            d.*,
            f.nome_razao_social as nome_fornecedor
        FROM despesas_job d
        LEFT JOIN fornecedores f ON d.id_fornecedor = f.id
        WHERE d.id_job = ?
        ORDER BY d.data_vencimento ASC
    `, [id_job]);
    return despesas;
};

exports.mudarStatus = async (id_despesa, status) => {
    const [resultado] = await db.query('UPDATE despesas_job SET status_pagamento = ? WHERE id = ?', [status, id_despesa]);
    return resultado.affectedRows > 0;
};

exports.remover = async (id_despesa) => {
    const [resultado] = await db.query('DELETE FROM despesas_job WHERE id = ?', [id_despesa]);
    return resultado.affectedRows > 0;
};

// Nova função para registrar o pagamento de uma despesa
exports.registrarPagamento = async (id_despesa, dadosPagamento) => {
    const { id_conta_bancaria, data_pagamento } = dadosPagamento;

    const [despesas] = await db.query('SELECT * FROM despesas_job WHERE id = ?', [id_despesa]);
    if (despesas.length === 0) {
        throw new Error('Despesa não encontrada');
    }
    const despesa = despesas[0];

    const dadosLancamento = {
        id_conta_bancaria,
        tipo_lancamento: 'Débito',
        valor: despesa.valor,
        descricao: `Pagamento de despesa: ${despesa.descricao} (Job #${despesa.id_job})`,
        data_lancamento: data_pagamento,
        id_despesa_origem: id_despesa // Link para a origem!
    };
    
    // Transação para garantir consistência
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Cria o lançamento de débito
        await financeiroModel.criarLancamento(dadosLancamento);

        // 2. Atualiza o status da despesa
        await connection.query('UPDATE despesas_job SET status_pagamento = "Pago" WHERE id = ?', [id_despesa]);

        await connection.commit();
        return true;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};