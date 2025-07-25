
const db = require('../config/db');
const financeiroModel = require('./financeiroModel'); // Importe o financeiroModel

// A função de criar não muda, pois a nova coluna tem um valor DEFAULT.
exports.criar = async (dadosJob) => {
    const { id_agencia, id_contato, cliente_final, nome_campanha, tipo_job, valor_total, data_proposta } = dadosJob;
    const [resultado] = await db.query(
        'INSERT INTO jobs (id_agencia, id_contato, cliente_final, nome_campanha, tipo_job, valor_total, data_proposta) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [id_agencia, id_contato, cliente_final, nome_campanha, tipo_job, valor_total, data_proposta]
    );
    const novoId = resultado.insertId;
    const ano = new Date().getFullYear().toString().slice(-2);
    const numeroJobFormatado = `${ano}-${novoId.toString().padStart(4, '0')}`;
    await db.query('UPDATE jobs SET numero_job = ? WHERE id = ?', [numeroJobFormatado, novoId]);
    return { id: novoId, numero_job: numeroJobFormatado };
};

// Modificamos a listagem geral para incluir o novo status
exports.listarTodos = async () => {
    const [jobs] = await db.query(`
        SELECT 
            j.id, j.numero_job, j.nome_campanha, j.valor_total, j.status_progresso, j.status_producao, j.status_financeiro,
            a.nome_fantasia as nome_agencia,
            c.nome as nome_contato
        FROM jobs j
        JOIN agencias a ON j.id_agencia = a.id
        JOIN contatos c ON j.id_contato = c.id
        ORDER BY j.id DESC
    `);
    return jobs;
};

// Nova função para buscar apenas os jobs que devem aparecer no pipeline
exports.listarPipeline = async () => {
    const [jobs] = await db.query(`
        SELECT 
            id, numero_job, nome_campanha, status_producao 
        FROM jobs
        WHERE status_progresso = 'Aprovado' OR status_progresso = 'Entregue'
        ORDER BY id DESC
    `);
    return jobs;
}

exports.buscarPorId = async (id) => {
    const [jobs] = await db.query('SELECT * FROM jobs WHERE id = ?', [id]);
    return jobs[0];
};

exports.atualizarStatusProgresso = async (id, status) => {
    const [resultado] = await db.query('UPDATE jobs SET status_progresso = ? WHERE id = ?', [status, id]);
    return resultado.affectedRows > 0;
};

exports.atualizarStatusFinanceiro = async (id, status) => {
    const [resultado] = await db.query('UPDATE jobs SET status_financeiro = ? WHERE id = ?', [status, id]);
    return resultado.affectedRows > 0;
};

// Nova função para mudar o status de produção (mover o card no Kanban)
exports.atualizarStatusProducao = async (id, status) => {
    const [resultado] = await db.query('UPDATE jobs SET status_producao = ? WHERE id = ?', [status, id]);
    return resultado.affectedRows > 0;
};

// Nova função para registrar o pagamento de um Job
exports.registrarPagamento = async (id_job, dadosPagamento) => {
    const { id_conta_bancaria, valor_pago, data_pagamento } = dadosPagamento;

    // Primeiro, buscamos os dados do job para usar na descrição do lançamento
    const [jobs] = await db.query('SELECT * FROM jobs WHERE id = ?', [id_job]);
    if (jobs.length === 0) {
        throw new Error('Job não encontrado');
    }
    const job = jobs[0];

    // Montamos os dados para o lançamento financeiro
    const dadosLancamento = {
        id_conta_bancaria,
        tipo_lancamento: 'Crédito',
        valor: valor_pago,
        descricao: `Recebimento referente ao Job #${job.numero_job}: ${job.nome_campanha}`,
        data_lancamento: data_pagamento,
        id_job_origem: id_job // Link para a origem!
    };

    // Usamos uma transação para garantir a consistência
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Cria o lançamento financeiro (que também atualiza o saldo da conta)
        // Reutilizamos a lógica que já criamos no financeiroModel!
        await financeiroModel.criarLancamento(dadosLancamento);

        // 2. Atualiza o status do job
        // Lógica simples: se o valor pago for igual ou maior que o total, quita. Senão, fica como "Pago".
        const novoStatus = valor_pago >= job.valor_total ? 'Quitado' : 'Pago';
        await connection.query('UPDATE jobs SET status_financeiro = ? WHERE id = ?', [novoStatus, id_job]);

        await connection.commit();
        return true;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};