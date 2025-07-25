
const express = require('express');
const router = express.Router();
const relatorioController = require('../controllers/relatorioController');
const { verificarToken } = require('../middleware/authMiddleware');

router.use(verificarToken);

// Rota para o relatório de faturamento por agência
router.get('/faturamento-por-agencia', relatorioController.getFaturamentoPorAgencia);

// Rota para o relatório de lucratividade por job
router.get('/lucratividade-por-job', relatorioController.getLucratividadePorJob);

module.exports = router;