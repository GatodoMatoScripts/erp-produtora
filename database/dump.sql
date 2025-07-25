-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 25/07/2025 às 18:58
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `erp_produtora`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `acesso_portal`
--

CREATE TABLE `acesso_portal` (
  `id` int(11) NOT NULL,
  `id_job` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `email_cliente` varchar(255) NOT NULL,
  `data_expiracao` datetime NOT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT 1,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `acesso_portal`
--

INSERT INTO `acesso_portal` (`id`, `id_job`, `token`, `email_cliente`, `data_expiracao`, `ativo`, `criado_em`) VALUES
(1, 1, '62c4df718fb797d02bd5cdcd65c028b4622eaaaa5786c7f49cdbd54621af712e', 'cliente.final@empresa.com', '2025-07-29 22:19:50', 0, '2025-07-23 01:19:50'),
(2, 1, 'b709172cda1b04a7f1429740219b01b377307528d21a2a5d409646afda1ee3e6', 'cliente.final@empresa.com', '2025-07-29 22:26:03', 1, '2025-07-23 01:26:03');

-- --------------------------------------------------------

--
-- Estrutura para tabela `agencias`
--

CREATE TABLE `agencias` (
  `id` int(11) NOT NULL,
  `razao_social` varchar(255) NOT NULL,
  `nome_fantasia` varchar(255) NOT NULL,
  `cnpj` varchar(18) NOT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `telefone_principal` varchar(20) DEFAULT NULL,
  `email_principal` varchar(255) DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT 1,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `atualizado_em` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `agencias`
--

INSERT INTO `agencias` (`id`, `razao_social`, `nome_fantasia`, `cnpj`, `endereco`, `telefone_principal`, `email_principal`, `ativo`, `criado_em`, `atualizado_em`) VALUES
(1, 'Publicidade & Criatividade Ltda.', 'Agência Criativa', '11.222.333/0001-44', 'Rua das Ideias, 123, São Paulo - SP', '11-98765-4321', 'contato@agenciacriativa.com', 1, '2025-07-22 20:47:00', '2025-07-22 20:47:00'),
(2, 'Tulipa Ltda', 'Tulipa', '11111111111111', '', '11111', 'tulipa@tulipa.com', 1, '2025-07-23 20:55:31', '2025-07-23 20:55:31'),
(3, 'AAA BBB', 'AAA', '22222222222222', '', '555', 'aaa@aaa.com', 1, '2025-07-23 20:56:18', '2025-07-23 20:56:18');

-- --------------------------------------------------------

--
-- Estrutura para tabela `alocacoes_equipamentos`
--

CREATE TABLE `alocacoes_equipamentos` (
  `id` int(11) NOT NULL,
  `id_tarefa` int(11) NOT NULL,
  `id_equipamento` int(11) NOT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `alocacoes_fornecedores`
--

CREATE TABLE `alocacoes_fornecedores` (
  `id` int(11) NOT NULL,
  `id_tarefa` int(11) NOT NULL,
  `id_fornecedor` int(11) NOT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `alocacoes_usuarios`
--

CREATE TABLE `alocacoes_usuarios` (
  `id` int(11) NOT NULL,
  `id_tarefa` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `arquivos_job`
--

CREATE TABLE `arquivos_job` (
  `id` int(11) NOT NULL,
  `id_job` int(11) NOT NULL,
  `id_tarefa` int(11) DEFAULT NULL,
  `id_usuario_upload` int(11) DEFAULT NULL,
  `nome_arquivo` varchar(255) NOT NULL,
  `url_arquivo` text NOT NULL COMMENT 'URL para o arquivo no serviço de cloud storage',
  `tipo_arquivo` varchar(50) NOT NULL COMMENT 'Ex: Vídeo MP4, Imagem PNG, PDF',
  `versao` int(11) NOT NULL DEFAULT 1,
  `data_upload` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `cargos`
--

CREATE TABLE `cargos` (
  `id` int(11) NOT NULL,
  `id_contato` int(11) NOT NULL,
  `id_agencia` int(11) NOT NULL,
  `cargo` varchar(100) NOT NULL,
  `email_corporativo` varchar(255) DEFAULT NULL,
  `telefone_corporativo` varchar(20) DEFAULT NULL,
  `ramal` varchar(10) DEFAULT NULL,
  `data_inicio` date NOT NULL,
  `data_fim` date DEFAULT NULL,
  `is_atual` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cargos`
--

INSERT INTO `cargos` (`id`, `id_contato`, `id_agencia`, `cargo`, `email_corporativo`, `telefone_corporativo`, `ramal`, `data_inicio`, `data_fim`, `is_atual`) VALUES
(1, 1, 1, 'Diretor de Arte', 'fulano.tal@agenciacriativa.com', '11-91234-5678', NULL, '2024-01-15', NULL, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `contas_bancarias`
--

CREATE TABLE `contas_bancarias` (
  `id` int(11) NOT NULL,
  `nome_conta` varchar(255) NOT NULL COMMENT 'Ex: Conta Corrente Itaú, Caixa da Empresa',
  `banco` varchar(100) DEFAULT NULL,
  `agencia` varchar(20) DEFAULT NULL,
  `numero_conta` varchar(30) DEFAULT NULL,
  `saldo_inicial` decimal(15,2) NOT NULL DEFAULT 0.00,
  `saldo_atual` decimal(15,2) NOT NULL DEFAULT 0.00,
  `ativo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `contas_bancarias`
--

INSERT INTO `contas_bancarias` (`id`, `nome_conta`, `banco`, `agencia`, `numero_conta`, `saldo_inicial`, `saldo_atual`, `ativo`) VALUES
(1, 'Conta Principal BB', 'Banco do Brasil', NULL, NULL, 1000.00, 52500.00, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `contatos`
--

CREATE TABLE `contatos` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email_pessoal` varchar(255) DEFAULT NULL,
  `telefone_pessoal` varchar(20) DEFAULT NULL,
  `aniversario` date DEFAULT NULL,
  `anotacoes` text DEFAULT NULL,
  `pontuacao` tinyint(4) DEFAULT 3,
  `valor_gasto_brindes` decimal(10,2) DEFAULT 0.00,
  `valor_retornado_orcamentos` decimal(15,2) DEFAULT 0.00,
  `ativo` tinyint(1) NOT NULL DEFAULT 1,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `atualizado_em` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `contatos`
--

INSERT INTO `contatos` (`id`, `nome`, `email_pessoal`, `telefone_pessoal`, `aniversario`, `anotacoes`, `pontuacao`, `valor_gasto_brindes`, `valor_retornado_orcamentos`, `ativo`, `criado_em`, `atualizado_em`) VALUES
(1, 'Fulano de Tal', 'fulano.pessoal@email.com', NULL, NULL, 'Gosta de futebol, torce para o time X. Ótimo para happy hour.', 5, 0.00, 0.00, 1, '2025-07-22 21:53:25', '2025-07-22 21:53:25');

-- --------------------------------------------------------

--
-- Estrutura para tabela `despesas_job`
--

CREATE TABLE `despesas_job` (
  `id` int(11) NOT NULL,
  `id_job` int(11) NOT NULL,
  `tipo_despesa` enum('Comissão','Fornecedor','Imposto','Outro') NOT NULL,
  `id_fornecedor` int(11) DEFAULT NULL COMMENT 'Vinculado a um fornecedor, se aplicável',
  `descricao` varchar(255) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `data_vencimento` date DEFAULT NULL,
  `status_pagamento` enum('A Pagar','Pago') NOT NULL DEFAULT 'A Pagar',
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `atualizado_em` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `equipamentos`
--

CREATE TABLE `equipamentos` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL COMMENT 'Ex: Ilha de Edição 01, Câmera Sony FX6, Licença Red Giant',
  `tipo` varchar(100) DEFAULT NULL COMMENT 'Ex: Hardware, Software, Acessório',
  `identificador_serie` varchar(255) DEFAULT NULL COMMENT 'Número de série ou da licença',
  `status` enum('Disponível','Em Uso','Em Manutenção','Desativado') NOT NULL DEFAULT 'Disponível',
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `atualizado_em` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `follow_ups`
--

CREATE TABLE `follow_ups` (
  `id` int(11) NOT NULL,
  `id_job` int(11) NOT NULL,
  `id_usuario_responsavel` int(11) DEFAULT NULL,
  `data_agendada` datetime NOT NULL,
  `tipo_contato` enum('Email','Ligação','WhatsApp','Outro') NOT NULL,
  `anotacoes` text DEFAULT NULL COMMENT 'Notas prévias ou script para o contato',
  `status` enum('Pendente','Concluído','Cancelado') NOT NULL DEFAULT 'Pendente',
  `data_conclusao` datetime DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `atualizado_em` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `follow_ups`
--

INSERT INTO `follow_ups` (`id`, `id_job`, `id_usuario_responsavel`, `data_agendada`, `tipo_contato`, `anotacoes`, `status`, `data_conclusao`, `criado_em`, `atualizado_em`) VALUES
(1, 1, NULL, '2025-07-25 10:00:00', 'Ligação', 'Ligar para o Fulano para saber se ele tem alguma dúvida sobre a proposta. Focar no item X.', 'Pendente', NULL, '2025-07-22 22:59:12', '2025-07-22 22:59:12');

-- --------------------------------------------------------

--
-- Estrutura para tabela `fornecedores`
--

CREATE TABLE `fornecedores` (
  `id` int(11) NOT NULL,
  `tipo_fornecedor` enum('Pessoa Física','Pessoa Jurídica') NOT NULL,
  `nome_razao_social` varchar(255) NOT NULL,
  `nome_fantasia_apelido` varchar(255) DEFAULT NULL,
  `cpf_cnpj` varchar(18) NOT NULL,
  `especialidade` varchar(255) NOT NULL COMMENT 'Ex: Motion Designer, Estúdio de Áudio, Banco de Imagem',
  `contato_principal_nome` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `dados_bancarios` text DEFAULT NULL COMMENT 'Armazenar como texto ou JSON simples',
  `ativo` tinyint(1) NOT NULL DEFAULT 1,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `atualizado_em` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `fornecedores`
--

INSERT INTO `fornecedores` (`id`, `tipo_fornecedor`, `nome_razao_social`, `nome_fantasia_apelido`, `cpf_cnpj`, `especialidade`, `contato_principal_nome`, `email`, `telefone`, `dados_bancarios`, `ativo`, `criado_em`, `atualizado_em`) VALUES
(1, 'Pessoa Física', 'João da Silva Animação', 'João Animator', '123.456.789-00', 'Animador 2D After Effects', NULL, 'joao.animator@email.com', '21-99999-8888', 'Banco X, Ag: 0001, C/C: 12345-6, PIX: 123.456.789-00', 1, '2025-07-22 22:03:12', '2025-07-22 22:03:12');

-- --------------------------------------------------------

--
-- Estrutura para tabela `jobs`
--

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL,
  `numero_job` varchar(20) DEFAULT NULL COMMENT 'Ex: 25-0001 (Ano-ID). Preenchido via API.',
  `id_agencia` int(11) NOT NULL,
  `id_contato` int(11) NOT NULL,
  `cliente_final` varchar(255) DEFAULT NULL COMMENT 'Nome do cliente final atendido pela agência',
  `nome_campanha` varchar(255) NOT NULL,
  `tipo_job` enum('Animação 2D','Animação 3D','Filme Publicitário','Vídeo Institucional','Social Media','Outro') NOT NULL,
  `status_progresso` enum('Em Aprovação','Aprovado','Reprovado','Entregue','Finalizado') NOT NULL DEFAULT 'Em Aprovação',
  `status_financeiro` enum('A Faturar','Faturado','Pago','Quitado') NOT NULL DEFAULT 'A Faturar',
  `status_producao` enum('Backlog','Briefing','Roteiro','Storyboard','Animação','Render','Pós-Produção','Concluído') NOT NULL DEFAULT 'Backlog',
  `valor_total` decimal(15,2) NOT NULL,
  `data_proposta` date NOT NULL,
  `data_entrega_prevista` date DEFAULT NULL,
  `data_entregue` date DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `atualizado_em` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `jobs`
--

INSERT INTO `jobs` (`id`, `numero_job`, `id_agencia`, `id_contato`, `cliente_final`, `nome_campanha`, `tipo_job`, `status_progresso`, `status_financeiro`, `status_producao`, `valor_total`, `data_proposta`, `data_entrega_prevista`, `data_entregue`, `criado_em`, `atualizado_em`) VALUES
(1, '25-0001', 1, 1, 'Coca-Cola', 'Campanha de Natal 2025', 'Filme Publicitário', 'Aprovado', 'Quitado', 'Backlog', 50000.00, '2025-07-22', NULL, NULL, '2025-07-22 22:35:47', '2025-07-23 00:41:30'),
(2, '25-0002', 1, 1, 'Coca-Cola', 'Campanha de Natal 2025', 'Filme Publicitário', 'Em Aprovação', 'A Faturar', 'Backlog', 50000.00, '2025-07-22', NULL, NULL, '2025-07-22 22:35:50', '2025-07-22 22:35:50'),
(3, '25-0003', 1, 1, 'Coca-Cola', 'Campanha de Natal 2025', 'Filme Publicitário', 'Em Aprovação', 'A Faturar', 'Backlog', 50000.00, '2025-07-22', NULL, NULL, '2025-07-22 22:36:07', '2025-07-22 22:36:07'),
(4, '25-0004', 1, 1, 'Coca-Cola', 'Campanha de Natal 2025', 'Filme Publicitário', 'Em Aprovação', 'A Faturar', 'Backlog', 50000.00, '2025-07-22', NULL, NULL, '2025-07-22 22:36:08', '2025-07-22 22:36:08'),
(5, '25-0005', 1, 1, 'Coca-Cola', 'Campanha de Natal 2025', 'Filme Publicitário', 'Em Aprovação', 'A Faturar', 'Backlog', 50000.00, '2025-07-22', NULL, NULL, '2025-07-22 22:36:09', '2025-07-22 22:36:09'),
(6, '25-0006', 1, 1, 'Coca-Cola', 'Campanha de Natal 2025', 'Filme Publicitário', 'Em Aprovação', 'A Faturar', 'Backlog', 50000.00, '2025-07-22', NULL, NULL, '2025-07-22 22:36:09', '2025-07-22 22:36:09'),
(7, '25-0007', 1, 1, 'Coca-Cola', 'Campanha de Natal 2025', 'Filme Publicitário', 'Em Aprovação', 'A Faturar', 'Backlog', 50000.00, '2025-07-22', NULL, NULL, '2025-07-22 22:36:10', '2025-07-22 22:36:10');

-- --------------------------------------------------------

--
-- Estrutura para tabela `lancamentos_financeiros`
--

CREATE TABLE `lancamentos_financeiros` (
  `id` int(11) NOT NULL,
  `id_conta_bancaria` int(11) NOT NULL,
  `tipo_lancamento` enum('Crédito','Débito') NOT NULL,
  `valor` decimal(15,2) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `data_lancamento` date NOT NULL,
  `id_job_origem` int(11) DEFAULT NULL COMMENT 'Link para o job que gerou a receita',
  `id_despesa_origem` int(11) DEFAULT NULL COMMENT 'Link para a despesa que gerou o pagamento',
  `status_conciliacao` enum('Pendente','Conciliado') NOT NULL DEFAULT 'Pendente',
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `lancamentos_financeiros`
--

INSERT INTO `lancamentos_financeiros` (`id`, `id_conta_bancaria`, `tipo_lancamento`, `valor`, `descricao`, `data_lancamento`, `id_job_origem`, `id_despesa_origem`, `status_conciliacao`, `criado_em`) VALUES
(1, 1, 'Crédito', 500.00, 'Adiantamento de cliente', '2025-07-22', NULL, NULL, 'Pendente', '2025-07-23 00:28:14'),
(2, 1, 'Crédito', 500.00, 'Adiantamento de cliente', '2025-07-22', NULL, NULL, 'Pendente', '2025-07-23 00:28:33'),
(3, 1, 'Crédito', 500.00, 'Adiantamento de cliente', '2025-07-22', NULL, NULL, 'Pendente', '2025-07-23 00:28:37'),
(4, 1, 'Crédito', 50000.00, 'Recebimento referente ao Job #25-0001: Campanha de Natal 2025', '2025-07-22', 1, NULL, 'Pendente', '2025-07-23 00:41:30');

-- --------------------------------------------------------

--
-- Estrutura para tabela `portal_comentarios`
--

CREATE TABLE `portal_comentarios` (
  `id` int(11) NOT NULL,
  `id_job` int(11) NOT NULL,
  `id_arquivo` int(11) DEFAULT NULL COMMENT 'Comentário pode ser sobre um arquivo específico',
  `autor_nome` varchar(255) NOT NULL COMMENT 'Pode ser o nome do cliente ou de um usuário interno',
  `comentario` text NOT NULL,
  `timestamp_video` varchar(10) DEFAULT NULL COMMENT 'Ex: 01:32, para feedbacks em vídeo',
  `data_comentario` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tarefas`
--

CREATE TABLE `tarefas` (
  `id` int(11) NOT NULL,
  `id_job` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL COMMENT 'Ex: Animação da Cena 05, Edição de Áudio, Correção de Cor',
  `descricao` text DEFAULT NULL,
  `data_inicio_prevista` date DEFAULT NULL,
  `data_fim_prevista` date DEFAULT NULL,
  `status` enum('Pendente','Em Andamento','Para Revisão','Concluída') NOT NULL DEFAULT 'Pendente',
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `atualizado_em` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tarefas`
--

INSERT INTO `tarefas` (`id`, `id_job`, `titulo`, `descricao`, `data_inicio_prevista`, `data_fim_prevista`, `status`, `criado_em`, `atualizado_em`) VALUES
(1, 1, 'Animar logo de entrada', 'Animar a vinheta de entrada conforme o storyboard aprovado.', '2025-08-01', '2025-08-05', 'Pendente', '2025-07-22 23:23:11', '2025-07-22 23:23:11');

-- --------------------------------------------------------

--
-- Estrutura para tabela `timesheet_entradas`
--

CREATE TABLE `timesheet_entradas` (
  `id` int(11) NOT NULL,
  `id_tarefa` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `data` date NOT NULL COMMENT 'Data em que o trabalho foi realizado',
  `horas_gastas` decimal(5,2) NOT NULL COMMENT 'Ex: 4.5 para 4h30min',
  `descricao` text DEFAULT NULL COMMENT 'Descrição breve do que foi feito',
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `atualizado_em` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha_hash` varchar(255) NOT NULL,
  `perfil` enum('Admin','Financeiro','Produtor','Artista') NOT NULL,
  `custo_hora` decimal(10,2) NOT NULL DEFAULT 50.00 COMMENT 'Custo da hora de trabalho do usuário para cálculo de rentabilidade',
  `ativo` tinyint(1) DEFAULT 1,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha_hash`, `perfil`, `custo_hora`, `ativo`, `criado_em`) VALUES
(4, 'Admin Principal', 'admin@produtora.com', '$2b$10$nwNge1FIhgVAgHDkm6YuEu1lj7qmqq10Z8dlOI68zH3BTgVdCbQt2', 'Admin', 50.00, 1, '2025-07-23 14:52:57');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `acesso_portal`
--
ALTER TABLE `acesso_portal`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`),
  ADD KEY `id_job` (`id_job`);

--
-- Índices de tabela `agencias`
--
ALTER TABLE `agencias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cnpj` (`cnpj`);

--
-- Índices de tabela `alocacoes_equipamentos`
--
ALTER TABLE `alocacoes_equipamentos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tarefa_equipamento_unique` (`id_tarefa`,`id_equipamento`),
  ADD KEY `id_equipamento` (`id_equipamento`);

--
-- Índices de tabela `alocacoes_fornecedores`
--
ALTER TABLE `alocacoes_fornecedores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tarefa_fornecedor_unique` (`id_tarefa`,`id_fornecedor`),
  ADD KEY `id_fornecedor` (`id_fornecedor`);

--
-- Índices de tabela `alocacoes_usuarios`
--
ALTER TABLE `alocacoes_usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tarefa_usuario_unique` (`id_tarefa`,`id_usuario`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Índices de tabela `arquivos_job`
--
ALTER TABLE `arquivos_job`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_job` (`id_job`),
  ADD KEY `id_tarefa` (`id_tarefa`),
  ADD KEY `id_usuario_upload` (`id_usuario_upload`);

--
-- Índices de tabela `cargos`
--
ALTER TABLE `cargos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_corporativo` (`email_corporativo`),
  ADD KEY `id_contato` (`id_contato`),
  ADD KEY `id_agencia` (`id_agencia`);

--
-- Índices de tabela `contas_bancarias`
--
ALTER TABLE `contas_bancarias`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `contatos`
--
ALTER TABLE `contatos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_pessoal` (`email_pessoal`);

--
-- Índices de tabela `despesas_job`
--
ALTER TABLE `despesas_job`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_job` (`id_job`),
  ADD KEY `id_fornecedor` (`id_fornecedor`);

--
-- Índices de tabela `equipamentos`
--
ALTER TABLE `equipamentos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `identificador_serie` (`identificador_serie`);

--
-- Índices de tabela `follow_ups`
--
ALTER TABLE `follow_ups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_job` (`id_job`),
  ADD KEY `id_usuario_responsavel` (`id_usuario_responsavel`);

--
-- Índices de tabela `fornecedores`
--
ALTER TABLE `fornecedores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cpf_cnpj` (`cpf_cnpj`);

--
-- Índices de tabela `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `numero_job` (`numero_job`),
  ADD KEY `id_agencia` (`id_agencia`),
  ADD KEY `id_contato` (`id_contato`);

--
-- Índices de tabela `lancamentos_financeiros`
--
ALTER TABLE `lancamentos_financeiros`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_conta_bancaria` (`id_conta_bancaria`),
  ADD KEY `id_job_origem` (`id_job_origem`),
  ADD KEY `id_despesa_origem` (`id_despesa_origem`);

--
-- Índices de tabela `portal_comentarios`
--
ALTER TABLE `portal_comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_job` (`id_job`),
  ADD KEY `id_arquivo` (`id_arquivo`);

--
-- Índices de tabela `tarefas`
--
ALTER TABLE `tarefas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_job` (`id_job`);

--
-- Índices de tabela `timesheet_entradas`
--
ALTER TABLE `timesheet_entradas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_tarefa` (`id_tarefa`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `acesso_portal`
--
ALTER TABLE `acesso_portal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `agencias`
--
ALTER TABLE `agencias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `alocacoes_equipamentos`
--
ALTER TABLE `alocacoes_equipamentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `alocacoes_fornecedores`
--
ALTER TABLE `alocacoes_fornecedores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `alocacoes_usuarios`
--
ALTER TABLE `alocacoes_usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `arquivos_job`
--
ALTER TABLE `arquivos_job`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `cargos`
--
ALTER TABLE `cargos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `contas_bancarias`
--
ALTER TABLE `contas_bancarias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `contatos`
--
ALTER TABLE `contatos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `despesas_job`
--
ALTER TABLE `despesas_job`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `equipamentos`
--
ALTER TABLE `equipamentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `follow_ups`
--
ALTER TABLE `follow_ups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `fornecedores`
--
ALTER TABLE `fornecedores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `lancamentos_financeiros`
--
ALTER TABLE `lancamentos_financeiros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `portal_comentarios`
--
ALTER TABLE `portal_comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tarefas`
--
ALTER TABLE `tarefas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `timesheet_entradas`
--
ALTER TABLE `timesheet_entradas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `acesso_portal`
--
ALTER TABLE `acesso_portal`
  ADD CONSTRAINT `acesso_portal_ibfk_1` FOREIGN KEY (`id_job`) REFERENCES `jobs` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `alocacoes_equipamentos`
--
ALTER TABLE `alocacoes_equipamentos`
  ADD CONSTRAINT `alocacoes_equipamentos_ibfk_1` FOREIGN KEY (`id_tarefa`) REFERENCES `tarefas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `alocacoes_equipamentos_ibfk_2` FOREIGN KEY (`id_equipamento`) REFERENCES `equipamentos` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `alocacoes_fornecedores`
--
ALTER TABLE `alocacoes_fornecedores`
  ADD CONSTRAINT `alocacoes_fornecedores_ibfk_1` FOREIGN KEY (`id_tarefa`) REFERENCES `tarefas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `alocacoes_fornecedores_ibfk_2` FOREIGN KEY (`id_fornecedor`) REFERENCES `fornecedores` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `alocacoes_usuarios`
--
ALTER TABLE `alocacoes_usuarios`
  ADD CONSTRAINT `alocacoes_usuarios_ibfk_1` FOREIGN KEY (`id_tarefa`) REFERENCES `tarefas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `alocacoes_usuarios_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `arquivos_job`
--
ALTER TABLE `arquivos_job`
  ADD CONSTRAINT `arquivos_job_ibfk_1` FOREIGN KEY (`id_job`) REFERENCES `jobs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `arquivos_job_ibfk_2` FOREIGN KEY (`id_tarefa`) REFERENCES `tarefas` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `arquivos_job_ibfk_3` FOREIGN KEY (`id_usuario_upload`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL;

--
-- Restrições para tabelas `cargos`
--
ALTER TABLE `cargos`
  ADD CONSTRAINT `cargos_ibfk_1` FOREIGN KEY (`id_contato`) REFERENCES `contatos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cargos_ibfk_2` FOREIGN KEY (`id_agencia`) REFERENCES `agencias` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `despesas_job`
--
ALTER TABLE `despesas_job`
  ADD CONSTRAINT `despesas_job_ibfk_1` FOREIGN KEY (`id_job`) REFERENCES `jobs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `despesas_job_ibfk_2` FOREIGN KEY (`id_fornecedor`) REFERENCES `fornecedores` (`id`) ON DELETE SET NULL;

--
-- Restrições para tabelas `follow_ups`
--
ALTER TABLE `follow_ups`
  ADD CONSTRAINT `follow_ups_ibfk_1` FOREIGN KEY (`id_job`) REFERENCES `jobs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `follow_ups_ibfk_2` FOREIGN KEY (`id_usuario_responsavel`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL;

--
-- Restrições para tabelas `jobs`
--
ALTER TABLE `jobs`
  ADD CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`id_agencia`) REFERENCES `agencias` (`id`),
  ADD CONSTRAINT `jobs_ibfk_2` FOREIGN KEY (`id_contato`) REFERENCES `contatos` (`id`);

--
-- Restrições para tabelas `lancamentos_financeiros`
--
ALTER TABLE `lancamentos_financeiros`
  ADD CONSTRAINT `lancamentos_financeiros_ibfk_1` FOREIGN KEY (`id_conta_bancaria`) REFERENCES `contas_bancarias` (`id`),
  ADD CONSTRAINT `lancamentos_financeiros_ibfk_2` FOREIGN KEY (`id_job_origem`) REFERENCES `jobs` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `lancamentos_financeiros_ibfk_3` FOREIGN KEY (`id_despesa_origem`) REFERENCES `despesas_job` (`id`) ON DELETE SET NULL;

--
-- Restrições para tabelas `portal_comentarios`
--
ALTER TABLE `portal_comentarios`
  ADD CONSTRAINT `portal_comentarios_ibfk_1` FOREIGN KEY (`id_job`) REFERENCES `jobs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `portal_comentarios_ibfk_2` FOREIGN KEY (`id_arquivo`) REFERENCES `arquivos_job` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `tarefas`
--
ALTER TABLE `tarefas`
  ADD CONSTRAINT `tarefas_ibfk_1` FOREIGN KEY (`id_job`) REFERENCES `jobs` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `timesheet_entradas`
--
ALTER TABLE `timesheet_entradas`
  ADD CONSTRAINT `timesheet_entradas_ibfk_1` FOREIGN KEY (`id_tarefa`) REFERENCES `tarefas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `timesheet_entradas_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
