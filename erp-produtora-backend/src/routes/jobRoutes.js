
const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const despesaController = require('../controllers/despesaJobController');
const followUpController = require('../controllers/followUpController');
const tarefaController = require('../controllers/tarefaController');
const { verificarToken } = require('../middleware/authMiddleware');
const alocacaoController = require('../controllers/alocacaoController');


router.use(verificarToken);

// --- ROTAS PRINCIPAIS DE JOBS ---
router.post('/', jobController.criarJob);
router.get('/', jobController.listarJobs);
router.get('/:id', jobController.obterJob);
router.patch('/:id/status-progresso', jobController.mudarStatusProgresso);
router.patch('/:id/status-financeiro', jobController.mudarStatusFinanceiro);
router.patch('/:id/status-producao', jobController.mudarStatusProducao);
router.post('/:id/registrar-pagamento', jobController.registrarPagamentoJob);

// --- ROTAS PARA AS TAREFAS DE UM JOB ---
router.post('/:jobId/tarefas', tarefaController.criarTarefa);
router.get('/:jobId/tarefas', tarefaController.listarTarefasDoJob);
router.patch('/tarefas/:tarefaId/status', tarefaController.mudarStatusTarefa);
router.delete('/tarefas/:tarefaId', tarefaController.removerTarefa);

// --- ROTAS PARA AS ALOCAÇÕES DE UMA TAREFA ---
router.post('/tarefas/:tarefaId/alocacoes', alocacaoController.alocarRecurso);
router.get('/tarefas/:tarefaId/alocacoes', alocacaoController.listarAlocacoesDaTarefa);
router.delete('/alocacoes/:alocacaoId', alocacaoController.desalocarRecurso); // Rota para desalocar

// --- ROTAS PARA AS DESPESAS DE UM JOB ---
router.post('/:jobId/despesas', despesaController.adicionarDespesa);
router.get('/:jobId/despesas', despesaController.listarDespesasDoJob);
router.patch('/despesas/:despesaId/status', despesaController.mudarStatusPagamento);
router.post('/despesas/:despesaId/registrar-pagamento', despesaController.registrarPagamentoDespesa); // Rota para pagar despesa
router.delete('/despesas/:despesaId', despesaController.removerDespesa);


// --- ROTAS PARA OS FOLLOW-UPS DE UM JOB ---
router.post('/:jobId/follow-ups', followUpController.agendarFollowUp);
router.get('/:jobId/follow-ups', followUpController.listarFollowUpsDoJob);
router.patch('/follow-ups/:followUpId/status', followUpController.mudarStatusFollowUp);
router.delete('/follow-ups/:followUpId', followUpController.removerFollowUp);

module.exports = router;