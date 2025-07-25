
const db = require('../config/db');

// Cria um contato e seu primeiro cargo. Idealmente, isso seria uma transação.
exports.criar = async (dados) => {
    const { nome, email_pessoal, telefone_pessoal, aniversario, anotacoes, pontuacao } = dados.perfil;
    const { id_agencia, cargo, email_corporativo, telefone_corporativo, ramal, data_inicio } = dados.cargo;

    // 1. Insere o contato (a pessoa)
    const [contatoResult] = await db.query(
        'INSERT INTO contatos (nome, email_pessoal, telefone_pessoal, aniversario, anotacoes, pontuacao) VALUES (?, ?, ?, ?, ?, ?)',
        [nome, email_pessoal, telefone_pessoal, aniversario, anotacoes, pontuacao]
    );
    const novoContatoId = contatoResult.insertId;

    // 2. Insere o primeiro cargo associado a esse contato
    await db.query(
        'INSERT INTO cargos (id_contato, id_agencia, cargo, email_corporativo, telefone_corporativo, ramal, data_inicio) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [novoContatoId, id_agencia, cargo, email_corporativo, telefone_corporativo, ramal, data_inicio]
    );
    
    return { id: novoContatoId };
};

// Lista todos os contatos com seu cargo e agência ATUAIS.
exports.listarTodos = async () => {
    const [contatos] = await db.query(`
        SELECT 
            con.id,
            con.nome,
            con.pontuacao,
            car.cargo,
            ag.nome_fantasia AS agencia_atual,
            car.email_corporativo,
            car.telefone_corporativo
        FROM contatos con
        JOIN cargos car ON con.id = car.id_contato
        JOIN agencias ag ON car.id_agencia = ag.id
        WHERE con.ativo = TRUE AND car.is_atual = TRUE
        ORDER BY con.nome ASC
    `);
    return contatos;
};

// Busca um perfil completo de contato, incluindo seu histórico de cargos
exports.buscarPerfilCompletoPorId = async (id) => {
    const [contato] = await db.query('SELECT * FROM contatos WHERE id = ?', [id]);
    if (!contato.length) return null;

    const [cargos] = await db.query(`
        SELECT car.*, ag.nome_fantasia 
        FROM cargos car 
        JOIN agencias ag ON car.id_agencia = ag.id
        WHERE car.id_contato = ? 
        ORDER BY car.data_inicio DESC
    `, [id]);
    
    return { perfil: contato[0], historico_cargos: cargos };
};

// A lógica de update e delete fica mais complexa e podemos detalhar depois.
// Ex: Update pode ser no perfil do contato ou em um cargo específico.
// Delete pode ser desativar o contato ou apenas um vínculo de cargo.