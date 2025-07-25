
const db = require('../config/db');

// Middleware para verificar o token de acesso do cliente
exports.verificarTokenCliente = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ mensagem: 'Acesso negado. Token não fornecido.' });
    }

    try {
        // Verifica se o token existe no nosso banco, está ativo e não expirou
        const [acessos] = await db.query(
            'SELECT * FROM acesso_portal WHERE token = ? AND ativo = TRUE AND data_expiracao > NOW()',
            [token]
        );

        if (acessos.length === 0) {
            return res.status(403).json({ mensagem: 'Acesso proibido. Token inválido ou expirado.' });
        }
        
        // Anexa as informações de acesso (especialmente o id_job) na requisição
        // para que os próximos controllers saibam a qual job o cliente tem acesso.
        req.acesso = acessos[0]; 

        next();
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro interno no servidor ao validar o acesso.' });
    }
};