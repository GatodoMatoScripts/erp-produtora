
const express = require('express');
const router = express.Router();
const agenciaController = require('../controllers/agenciaController');
const { verificarToken } = require('../middleware/authMiddleware');

// Aplica o middleware de verificação de token para TODAS as rotas deste arquivo.
// Nenhuma operação com agências pode ser feita sem um token válido.
router.use(verificarToken);

// Rotas CRUD para Agências
router.post('/', agenciaController.criarAgencia);          // Criar uma nova agência
router.get('/', agenciaController.listarAgencias);         // Listar todas as agências
router.get('/:id', agenciaController.obterAgencia);        // Obter uma agência por ID
router.put('/:id', agenciaController.atualizarAgencia);    // Atualizar uma agência por ID
router.delete('/:id', agenciaController.desativarAgencia); // Desativar (soft delete) uma agência por ID

module.exports = router;