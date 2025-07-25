
const jwt = require('jsonwebtoken');

exports.verificarToken = (req, res, next) => {
    // O token geralmente é enviado no cabeçalho (header) de autorização
    // no formato "Bearer TOKEN"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extrai apenas o token

    if (token == null) {
        // 401 Unauthorized: O cliente não forneceu credenciais de autenticação.
        return res.status(401).json({ mensagem: 'Acesso negado. Nenhum token fornecido.' });
    }

    // Agora, vamos verificar se o token é válido
    jwt.verify(token, process.env.JWT_SECRET, (err, usuarioDecodificado) => {
        if (err) {
            // 403 Forbidden: O cliente foi autenticado, mas não tem permissão
            // ou o token é inválido/expirado.
            console.error('Erro na verificação do token:', err.message);
            return res.status(403).json({ mensagem: 'Token inválido ou expirado.' });
        }

        // Se o token for válido, anexamos os dados do usuário na requisição
        req.usuario = usuarioDecodificado;

        // Chama a próxima função no ciclo da requisição (o nosso controller)
        next();
    });
};