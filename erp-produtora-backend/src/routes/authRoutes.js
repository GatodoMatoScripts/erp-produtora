
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verificarToken } = require('../middleware/authMiddleware'); // 1. Importa o middleware

// Rota para registrar um novo usuário (Pública)
router.post('/registrar', authController.registrar);

// Rota para fazer login (Pública)
router.post('/login', authController.login);

// Rota para buscar o perfil do usuário (Protegida)
// GET /api/auth/perfil
// 2. Adicionamos `verificarToken` antes do controller.
// O Express executará o middleware primeiro. Se ele chamar next(), o controller será executado.
router.get('/perfil', verificarToken, authController.getPerfil);

module.exports = router;