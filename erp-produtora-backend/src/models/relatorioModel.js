
const db = require('../config/db');

/**
 * Calcula o faturamento total por agência dentro de um período.
 * Consideramos "faturamento" qualquer job que tenha sido, no mínimo, 'Aprovado'.
 * Você pode ajustar a regra de negócio conforme necessário (ex: status_financeiro = 'Faturado').
 */
exports.faturamentoPorAgencia = async (filtros) => {
    const { data_inicio, data_fim } = filtros;

    let sql = `
        SELECT 
            a.nome_fantasia,
            COUNT(j.id) as quantidade_jobs,
            SUM(j.valor_total) as faturamento_total
        FROM agencias a
        JOIN jobs j ON a.id = j.id_agencia
        WHERE j.status_progresso NOT IN ('Em Aprovação', 'Reprovado')
    `;

    const params = [];

    if (data_inicio) {
        sql += ' AND j.data_proposta >= ?';
        params.push(data_inicio);
    }

    if (data_fim) {
        sql += ' AND j.data_proposta <= ?';
        params.push(data_fim);
    }

    sql += ' GROUP BY a.id ORDER BY faturamento_total DESC';

    const [resultado] = await db.query(sql, params);
    return resultado;
};

exports.lucratividadePorJob = async (filtros) => {
    const { data_inicio, data_fim } = filtros;

    let sql = `
        SELECT
            j.id as job_id,
            j.numero_job,
            j.nome_campanha,
            ag.nome_fantasia as nome_agencia,
            j.valor_total as receita_total,
            COALESCE(despesas.total_despesas, 0) as custo_despesas_diretas,
            COALESCE(horas.custo_total_horas, 0) as custo_mao_de_obra,
            (j.valor_total - COALESCE(despesas.total_despesas, 0) - COALESCE(horas.custo_total_horas, 0)) as lucro
        FROM
            jobs j
        JOIN
            agencias ag ON j.id_agencia = ag.id
        LEFT JOIN
            (SELECT id_job, SUM(valor) as total_despesas FROM despesas_job GROUP BY id_job) as despesas ON j.id = despesas.id_job
        LEFT JOIN
            (SELECT
                t.id_job,
                SUM(ts.horas_gastas * u.custo_hora) as custo_total_horas
            FROM timesheet_entradas ts
            JOIN tarefas t ON ts.id_tarefa = t.id
            JOIN usuarios u ON ts.id_usuario = u.id
            GROUP BY t.id_job
            ) as horas ON j.id = horas.id_job
        WHERE 
            j.status_progresso NOT IN ('Em Aprovação', 'Reprovado')
    `;

    const params = [];

    if (data_inicio) {
        sql += ' AND j.data_proposta >= ?';
        params.push(data_inicio);
    }

    if (data_fim) {
        sql += ' AND j.data_proposta <= ?';
        params.push(data_fim);
    }

    sql += ' ORDER BY j.id DESC';

    const [resultado] = await db.query(sql, params);
    return resultado;
}