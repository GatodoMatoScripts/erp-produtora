
const portalModel = require('../models/portalModel');

exports.gerarLinkDeAcesso = async (req, res) => {
    const { jobId } = req.params;
    const { email_cliente } = req.body;

    if (!email_cliente) {
        return res.status(400).json({ mensagem: 'O e-mail do cliente é obrigatório.' });
    }

    try {
        const { token } = await portalModel.gerarTokenAcesso(jobId, email_cliente);
        
        // Em uma aplicação real, aqui você enviaria um e-mail para o cliente.
        // Por enquanto, vamos retornar o link/token para o nosso frontend usar.
        const linkAcesso = `http://portal.suaprodutora.com/revisao/${token}`;

        res.status(200).json({ 
            mensagem: "Link de acesso gerado com sucesso!",
            link_de_acesso_simulado: linkAcesso,
            token: token 
        });

    } catch (error) {
        res.status(500).json({ mensagem: "Erro no servidor ao gerar link de acesso.", erro: error.message });
    }
};

// --- Controladores para o Cliente (após autenticação com token) ---

exports.obterDadosJobCliente = async (req, res) => {
    // O id_job vem do nosso middleware, que o extraiu do token validado
    const id_job = req.acesso.id_job;
    try {
        const job = await portalModel.buscarJobParaCliente(id_job);
        if (!job) {
            return res.status(404).json({ mensagem: 'Job não encontrado.' });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no servidor ao buscar dados do job.' });
    }
};

exports.listarArquivosCliente = async (req, res) => {
    const id_job = req.acesso.id_job;
    try {
        const arquivos = await portalModel.listarArquivosPorJob(id_job);
        res.status(200).json(arquivos);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no servidor ao listar arquivos.' });
    }
};

exports.listarComentariosCliente = async (req, res) => {
    const id_job = req.acesso.id_job;
    try {
        const comentarios = await portalModel.listarComentariosPorJob(id_job);
        res.status(200).json(comentarios);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no servidor ao listar comentários.' });
    }
};

exports.adicionarComentarioCliente = async (req, res) => {
    const id_job = req.acesso.id_job;
    // O nome do autor viria do frontend (ex: 'Cliente' ou o nome da pessoa)
    const { autor_nome, comentario, id_arquivo, timestamp_video } = req.body;
    
    if (!autor_nome || !comentario) {
        return res.status(400).json({ mensagem: 'Autor e comentário são obrigatórios.' });
    }
    
    const dadosComentario = { id_job, autor_nome, comentario, id_arquivo, timestamp_video };

    try {
        const novoComentario = await portalModel.adicionarComentario(dadosComentario);
        res.status(201).json({ mensagem: 'Comentário adicionado com sucesso!', comentario: novoComentario });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no servidor ao adicionar comentário.' });
    }
};