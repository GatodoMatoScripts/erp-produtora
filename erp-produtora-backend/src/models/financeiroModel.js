
const db = require('../config/db');

exports.criarConta = async (dadosConta) => {
    const { nome_conta, banco, agencia, numero_conta, saldo_inicial } = dadosConta;
    // O saldo atual começa igual ao inicial
    const [resultado] = await db.query(
        'INSERT INTO contas_bancarias (nome_conta, banco, agencia, numero_conta, saldo_inicial, saldo_atual) VALUES (?, ?, ?, ?, ?, ?)',
        [nome_conta, banco, agencia, numero_conta, saldo_inicial, saldo_inicial]
    );
    return { id: resultado.insertId };
};

exports.listarContas = async () => {
    const [contas] = await db.query('SELECT * FROM contas_bancarias WHERE ativo = TRUE');
    return contas;
};

// Esta função é especial. Ela precisa garantir que o lançamento é criado E o saldo da conta é atualizado.
// Se uma dessas operações falhar, ambas devem ser desfeitas. Isso é uma TRANSAÇÃO.
exports.criarLancamento = async (dadosLancamento) => {
    // Adicione id_job_origem e id_despesa_origem
    const { id_conta_bancaria, tipo_lancamento, valor, descricao, data_lancamento, id_job_origem = null, id_despesa_origem = null } = dadosLancamento;
    
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        // 1. Modifique o INSERT para incluir os novos campos
        await connection.query(
            'INSERT INTO lancamentos_financeiros (id_conta_bancaria, tipo_lancamento, valor, descricao, data_lancamento, id_job_origem, id_despesa_origem) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [id_conta_bancaria, tipo_lancamento, valor, descricao, data_lancamento, id_job_origem, id_despesa_origem]
        );

        // 2. A atualização do saldo permanece a mesma
        const valorAjustado = tipo_lancamento === 'Crédito' ? valor : -valor;
        await connection.query(
            'UPDATE contas_bancarias SET saldo_atual = saldo_atual + ? WHERE id = ?',
            [valorAjustado, id_conta_bancaria]
        );

        await connection.commit();
    } catch (error) {
        await connection.rollback();
        console.error('Erro na transação de lançamento financeiro:', error);
        throw error;
    } finally {
        connection.release();
    }
};

exports.listarLancamentosPorConta = async (id_conta) => {
    const [lancamentos] = await db.query(
        'SELECT * FROM lancamentos_financeiros WHERE id_conta_bancaria = ? ORDER BY data_lancamento DESC, id DESC',
        [id_conta]
    );
    return lancamentos;
};