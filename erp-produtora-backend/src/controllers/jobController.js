
const jobModel = require('../models/jobModel');

exports.criarJob = async (req, res) => {
    try {
        const novoJob = await jobModel.criar(req.body);
        res.status(201).json({ mensagem: 'Orçamento/Job criado com sucesso!', job: novoJob });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no servidor ao criar Orçamento/Job.', erro: error.message });
    }
};

exports.listarJobs = async (req, res) => {
    try {
        // Se a URL tiver ?pipeline=true, chamamos a função específica do pipeline
        if (req.query.pipeline === 'true') {
            const pipelineJobs = await jobModel.listarPipeline();
            return res.status(200).json(pipelineJobs);
        }
        // Senão, listamos todos de forma geral
        const jobs = await jobModel.listarTodos();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no servidor ao listar jobs.', erro: error.message });
    }
};

exports.obterJob = async (req, res) => {
    try {
        const job = await jobModel.buscarPorId(req.params.id);
        if (!job) {
            return res.status(404).json({ mensagem: 'Job não encontrado.' });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no servidor ao obter job.', erro: error.message });
    }
};

exports.mudarStatusProgresso = async (req, res) => {
    try {
        const { status } = req.body;
        // Validação básica para garantir que o status enviado está no ENUM
        const statusPermitidos = ['Em Aprovação', 'Aprovado', 'Reprovado', 'Entregue', 'Finalizado'];
        if (!status || !statusPermitidos.includes(status)) {
            return res.status(400).json({ mensagem: 'Status de progresso inválido.' });
        }
        const atualizado = await jobModel.atualizarStatusProgresso(req.params.id, status);
        if (!atualizado) return res.status(404).json({ mensagem: 'Job não encontrado.' });
        res.status(200).json({ mensagem: `Status de progresso do job alterado para "${status}" com sucesso.` });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no servidor.', erro: error.message });
    }
};

exports.mudarStatusFinanceiro = async (req, res) => {
    try {
        const { status } = req.body;
        const statusPermitidos = ['A Faturar', 'Faturado', 'Pago', 'Quitado'];
        if (!status || !statusPermitidos.includes(status)) {
            return res.status(400).json({ mensagem: 'Status financeiro inválido.' });
        }
        const atualizado = await jobModel.atualizarStatusFinanceiro(req.params.id, status);
        if (!atualizado) return res.status(404).json({ mensagem: 'Job não encontrado.' });
        res.status(200).json({ mensagem: `Status financeiro do job alterado para "${status}" com sucesso.` });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no servidor.', erro: error.message });
    }
};

// Novo controller para o status de produção
exports.mudarStatusProducao = async (req, res) => {
    try {
        const { status } = req.body;
        const statusPermitidos = ['Backlog', 'Briefing', 'Roteiro', 'Storyboard', 'Animação', 'Render', 'Pós-Produção', 'Concluído'];
        if (!status || !statusPermitidos.includes(status)) {
            return res.status(400).json({ mensagem: 'Status de produção inválido.' });
        }
        const atualizado = await jobModel.atualizarStatusProducao(req.params.id, status);
        if (!atualizado) return res.status(404).json({ mensagem: 'Job não encontrado.' });
        res.status(200).json({ mensagem: `Status de produção do job alterado para "${status}" com sucesso.` });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no servidor.', erro: error.message });
    }
};

// Novo controller para a ação de registrar pagamento
exports.registrarPagamentoJob = async (req, res) => {
    try {
        await jobModel.registrarPagamento(req.params.id, req.body);
        res.status(200).json({ mensagem: "Pagamento do job registrado e lançamento financeiro criado com sucesso!" });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no servidor ao registrar pagamento do job.', erro: error.message });
    }
};