
const express = require('express');
const router = express.Router();
const financeiroController = require('../controllers/financeiroController');
const { verificarToken } = require('../middleware/authMiddleware');

router.use(verificarToken);

// Rotas para Contas Bancárias
router.post('/contas', financeiroController.criarContaBancaria);
router.get('/contas', financeiroController.listarContasBancarias);

// Rotas para Lançamentos Financeiros
router.post('/lancamentos', financeiroController.criarLancamentoFinanceiro);
router.get('/contas/:contaId/lancamentos', financeiroController.listarLancamentos);

module.exports = router;