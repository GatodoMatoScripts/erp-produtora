
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Importa a conexão com o banco

// Função para registrar um novo usuário
exports.registrar = async (req, res) => {
    const { nome, email, senha, perfil } = req.body;

    // Validação básica
    if (!nome || !email || !senha || !perfil) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
    }

    try {
        // Verifica se o e-mail já existe
        const [usuarios] = await db.query('SELECT id FROM usuarios WHERE email = ?', [email]);
        if (usuarios.length > 0) {
            return res.status(409).json({ mensagem: 'Este e-mail já está em uso.' });
        }

        // Criptografa a senha
        const salt = await bcrypt.genSalt(10);
        const senha_hash = await bcrypt.hash(senha, salt);

        // Insere o novo usuário no banco de dados
        const [resultado] = await db.query(
            'INSERT INTO usuarios (nome, email, senha_hash, perfil) VALUES (?, ?, ?, ?)',
            [nome, email, senha_hash, perfil]
        );

        res.status(201).json({ mensagem: 'Usuário criado com sucesso!', usuarioId: resultado.insertId });

    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ mensagem: 'Erro no servidor ao tentar registrar o usuário.' });
    }
};

// Função para realizar o login
exports.login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ mensagem: 'E-mail e senha são obrigatórios.' });
    }

    try {
        // Busca o usuário pelo e-mail
        const [usuarios] = await db.query('SELECT * FROM usuarios WHERE email = ? AND ativo = TRUE', [email]);

        if (usuarios.length === 0) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas.' }); // Usuário não encontrado
        }

        const usuario = usuarios[0];

        // Compara a senha enviada com a senha hasheada no banco
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);

        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas.' }); // Senha incorreta
        }

        // Se as credenciais estiverem corretas, gera o token JWT
        const payload = {
            id: usuario.id,
            nome: usuario.nome,
            perfil: usuario.perfil
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '8h' } // Token expira em 8 horas
        );
        
        // Remove a senha do objeto antes de enviar a resposta
        delete usuario.senha_hash;

        res.status(200).json({ 
            mensagem: 'Login bem-sucedido!',
            token,
            usuario
        });

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ mensagem: 'Erro no servidor ao tentar fazer login.' });
    }
};

// Função para buscar o perfil do usuário logado
exports.getPerfil = async (req, res) => {
    // Graças ao nosso middleware, o `req.usuario` já contém os dados do token
    // Não precisamos buscar no banco, a não ser que queiramos dados mais atualizados
    try {
        // Vamos buscar no banco para garantir que os dados (especialmente o perfil) estão 100% atualizados
        const [usuarios] = await db.query('SELECT id, nome, email, perfil FROM usuarios WHERE id = ?', [req.usuario.id]);

        if (usuarios.length === 0) {
            return res.status(404).json({ mensagem: "Usuário não encontrado." });
        }
        
        res.status(200).json(usuarios[0]);

    } catch (error) {
        console.error('Erro ao buscar perfil:', error);
        res.status(500).json({ mensagem: 'Erro no servidor ao buscar perfil do usuário.' });
    }
};