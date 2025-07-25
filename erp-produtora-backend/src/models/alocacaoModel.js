
const db = require('../config/db');

// Função "inteligente" que insere na tabela correta baseado no tipo
exports.alocar = async (id_tarefa, tipo_recurso, id_recurso) => {
    let tabela;
    let campoIdRecurso;

    switch (tipo_recurso) {
        case 'usuario':
            tabela = 'alocacoes_usuarios';
            campoIdRecurso = 'id_usuario';
            break;
        case 'fornecedor':
            tabela = 'alocacoes_fornecedores';
            campoIdRecurso = 'id_fornecedor';
            break;
        case 'equipamento':
            tabela = 'alocacoes_equipamentos';
            campoIdRecurso = 'id_equipamento';
            break;
        default:
            throw new Error('Tipo de recurso inválido');
    }

    const sql = `INSERT INTO ${tabela} (id_tarefa, ${campoIdRecurso}) VALUES (?, ?)`;
    const [resultado] = await db.query(sql, [id_tarefa, id_recurso]);
    return { id: resultado.insertId };
};

// Função que busca em todas as tabelas de alocação e une os resultados
exports.listarPorTarefa = async (id_tarefa) => {
    const queryUsuarios = `
        SELECT al.id, 'usuario' as tipo_recurso, u.id as id_recurso, u.nome
        FROM alocacoes_usuarios al
        JOIN usuarios u ON al.id_usuario = u.id
        WHERE al.id_tarefa = ?`;

    const queryFornecedores = `
        SELECT al.id, 'fornecedor' as tipo_recurso, f.id as id_recurso, f.nome_razao_social as nome
        FROM alocacoes_fornecedores al
        JOIN fornecedores f ON al.id_fornecedor = f.id
        WHERE al.id_tarefa = ?`;

    const queryEquipamentos = `
        SELECT al.id, 'equipamento' as tipo_recurso, e.id as id_recurso, e.nome
        FROM alocacoes_equipamentos al
        JOIN equipamentos e ON al.id_equipamento = e.id
        WHERE al.id_tarefa = ?`;
    
    const [usuarios] = await db.query(queryUsuarios, [id_tarefa]);
    const [fornecedores] = await db.query(queryFornecedores, [id_tarefa]);
    const [equipamentos] = await db.query(queryEquipamentos, [id_tarefa]);

    return [...usuarios, ...fornecedores, ...equipamentos];
};

// Função para desalocar um recurso
exports.desalocar = async (id_alocacao, tipo_recurso) => {
    let tabela;
    switch (tipo_recurso) {
        case 'usuario': tabela = 'alocacoes_usuarios'; break;
        case 'fornecedor': tabela = 'alocacoes_fornecedores'; break;
        case 'equipamento': tabela = 'alocacoes_equipamentos'; break;
        default: throw new Error('Tipo de recurso inválido');
    }

    const [resultado] = await db.query(`DELETE FROM ${tabela} WHERE id = ?`, [id_alocacao]);
    return resultado.affectedRows > 0;
};