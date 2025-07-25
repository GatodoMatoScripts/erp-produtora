
const express = require('express');
const router = express.Router();
const timesheetController = require('../controllers/timesheetController');
const { verificarToken } = require('../middleware/authMiddleware');

router.use(verificarToken);

// Rota para um usuário ver todas as suas próprias entradas de tempo
router.get('/me', timesheetController.listarMinhasEntradas);

// Rota para registrar uma nova entrada de tempo em uma tarefa específica
router.post('/tarefas/:tarefaId', timesheetController.registrarEntrada);

// Rota para listar todas as entradas de tempo de uma tarefa específica
router.get('/tarefas/:tarefaId', timesheetController.listarEntradasDaTarefa);

// Rota para um usuário remover sua própria entrada de tempo
router.delete('/:entradaId', timesheetController.removerEntrada);

module.exports = router;