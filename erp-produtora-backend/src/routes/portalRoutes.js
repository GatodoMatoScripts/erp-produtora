
const express = require('express');
const router = express.Router();
const portalController = require('../controllers/portalController');
const { verificarToken } = require('../middleware/authMiddleware');
const { verificarTokenCliente } = require('../middleware/portalMiddleware'); 

// A geração de links é uma ação interna, então deve ser protegida.
router.post('/jobs/:jobId/gerar-link-acesso', verificarToken, portalController.gerarLinkDeAcesso);

// --- ROTAS EXTERNAS PARA O CLIENTE (protegidas por token de cliente) ---
const clienteRouter = express.Router(); // Criamos um sub-roteador para o cliente
clienteRouter.use(verificarTokenCliente); // Aplicamos o middleware a todas as rotas de cliente

clienteRouter.get('/job', portalController.obterDadosJobCliente);
clienteRouter.get('/arquivos', portalController.listarArquivosCliente);
clienteRouter.get('/comentarios', portalController.listarComentariosCliente);
clienteRouter.post('/comentarios', portalController.adicionarComentarioCliente);

// Montamos o sub-roteador na rota principal /revisao
router.use('/revisao', clienteRouter);


module.exports = router;