
const express = require('express');
const router = express.Router();
const fornecedorController = require('../controllers/fornecedorController');
const { verificarToken } = require('../middleware/authMiddleware');

// Protege todas as rotas de fornecedores com nosso middleware de autenticação
router.use(verificarToken);

router.post('/', fornecedorController.criarFornecedor);
router.get('/', fornecedorController.listarFornecedores);
router.get('/:id', fornecedorController.obterFornecedor);
router.put('/:id', fornecedorController.atualizarFornecedor);
router.delete('/:id', fornecedorController.desativarFornecedor);

module.exports = router;