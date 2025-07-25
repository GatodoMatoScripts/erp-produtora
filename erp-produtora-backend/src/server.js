
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importa as rotas
const authRoutes = require('./routes/authRoutes');
const agenciaRoutes = require('./routes/agenciaRoutes');
const contatoRoutes = require('./routes/contatoRoutes');
const fornecedorRoutes = require('./routes/fornecedorRoutes'); 
const jobRoutes = require('./routes/jobRoutes');
const timesheetRoutes = require('./routes/timesheetRoutes');
const financeiroRoutes = require('./routes/financeiroRoutes');
const relatorioRoutes = require('./routes/relatorioRoutes');
const portalRoutes = require('./routes/portalRoutes');

const app = express();

// --- CONFIGURAÇÃO DE CORS ROBUSTA ---
const corsOptions = {
  origin: process.env.FRONTEND_URL, // Permite acesso apenas da URL do nosso frontend
  optionsSuccessStatus: 200 // Para navegadores antigos
};

app.use(cors(corsOptions));
// Habilita o preflight para todas as rotas
app.options('*', cors(corsOptions));
// --- FIM DA CONFIGURAÇÃO DE CORS ---

app.use(express.json());

// Rota base da API
app.get('/api', (req, res) => {
    res.json({ message: 'Bem-vindo à API do ERP da Produtora!' });
});

// Módulos de Gestão e CRM
app.use('/api/auth', authRoutes);
app.use('/api/agencias', agenciaRoutes);
app.use('/api/contatos', contatoRoutes);
app.use('/api/fornecedores', fornecedorRoutes);

// Módulos de Operação e Finanças
app.use('/api/jobs', jobRoutes);
app.use('/api/timesheet', timesheetRoutes);
app.use('/api/financeiro', financeiroRoutes);

// Módulo de Relatórios
app.use('/api/relatorios', relatorioRoutes); 

// Módulo do Portal do Cliente
app.use('/api/portal', portalRoutes);

const PORTA = process.env.PORTA_API || 3001;

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});