
const express = require('express');
const router = express.Router();
const contatoController = require('../controllers/contatoController');
const { verificarToken } = require('../middleware/authMiddleware');

// Protege todas as rotas
router.use(verificarToken);

// Cria um novo contato e seu primeiro cargo
router.post('/', contatoController.criarContatoCompleto);

// Lista todos os contatos com seu cargo e agência atuais
router.get('/', contatoController.listarContatosAtuais);

// Obtém o perfil completo de um contato, incluindo histórico de cargos
router.get('/:id', contatoController.obterPerfilCompleto);

module.exports = router;