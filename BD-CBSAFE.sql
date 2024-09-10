CREATE DATABASE cbsafe;
USE cbsafe;

-- 1 TABELA DE CADASTROS DE USUÁRIOS

-- CRIAR TABELA USUARIO
CREATE TABLE usuario (
	id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    empresa VARCHAR(50),
    supervisor VARCHAR(20),
    cnpj CHAR(18),
    email VARCHAR(30),
    senha VARCHAR(15)
);

-- DESCREVER USUÁRIO
DESC usuario;

-- INSERIR DADOS NA TABELA
INSERT INTO usuario (empresa, supervisor, cnpj, email, senha) VALUES
	('Fazenda Manteiga', 'marcos', '11.111.111/0001-00', 'marcos@amanteigado.com', '12345'),
    ('Fazenda Vinho', 'paulo', '12.345.678/0001-00', 'paulo@vinho.com', 'amominhamae'),
    ('Fazenda Suco de Uva', 'fiona', '87.654.321/0001-00', 'fiona@suco.com', 'shrek123'),
    ('Fazenda Maionese', 'ruan', '13.579.246/0001-00', 'ruan@maionese.com', 'maionesedeovo');

-- MOSTRAR OS DADOSDA TABELA
SELECT * FROM usuario;

-- MOSTRAR OS DADOS DA TABELA EM QUE O SUPERVISOR TEM 'A' NO NOME E ORDENAR PELO CNPJ
SELECT * FROM usuario
    WHERE supervisor LIKE "%a%"
        ORDER BY cnpj;
        
-- TABELA 2 - DADOS COLETADOS DO SENSOR

-- CRIAR TABELA DADOS DO SENSOR
CREATE TABLE dados_sensor(
	id_dado INT PRIMARY KEY auto_increment,
	umidade FLOAT (4,2),
	data_hora DATETIME,
	alerta VARCHAR(20),
    
    CONSTRAINT chk_alerta
		CHECK (alerta IN ('verde', 'amarelo', 'vermelho'))
) AUTO_INCREMENT = 100;

-- INSERIR DADOS NA TABELA
INSERT INTO dados_sensor (umidade, data_hora, alerta) VALUES
	(70.9, '2024-08-01 16:44:00', 'vermelho'),
	(35.6, '2024-08-09 16:50:09', 'verde'),
	(44.8, '2024-08-09 18:00:01', 'amarelo'),
    (25.6, '2024-08-09 18:00:01', 'vermelho');

-- MOSTRAR OS DADOS DO SENSOR EM QUE O ALERTA É VERDE
SELECT * FROM dados_sensor
	WHERE alerta = 'verde';

-- MOSTRAR OS DADOS DO SENSOR EM QUE O ALERTA É VERMELHO
SELECT * FROM dados_sensor
	WHERE alerta = 'vermelho';

SELECT CONCAT('A leitura de umidade no dia e no horário ', data_hora, ' foi ', umidade, '%, o que gerou um alerta ', alerta) AS mensagem
	FROM dados_sensor
		WHERE umidade > 45;
        
SELECT CONCAT('A leitura de umidade no dia e no horário ', data_hora, ' foi ', umidade, '%, o que gerou um alerta ', alerta) AS mensagem
	FROM dados_sensor
		WHERE umidade < 30;

-- 3 TABELA COMPOST BARN
-- CRIAR TABELA Compost_barn
CREATE TABLE compost_barn (
	id_cb INT PRIMARY KEY AUTO_INCREMENT,
	area_m2 VARCHAR (30),
	qtd_vacas INT,
	data_ultima_manutencao DATE
) AUTO_INCREMENT = 1000;

-- INSERIR VALORES NA TABELA
INSERT INTO compost_barn (area_m2, qtd_vacas, data_ultima_manutencao) VALUES
	('1500','100','2024-05-20'),
	('1000','90','2024-09-02'),
	('1200','80','2024-02-17');

-- EXIBIR TODOS OS DADOS DA TABELA
SELECT * FROM compost_barn;

-- EXIBIR TODOS OS DADOS DA TABELA EM QUE A DATA É 2 MESES DA DATA ATUAL
SELECT * FROM compost_barn 
	WHERE data_ultima_manutencao < '2024-07-04';


-- 4 TABELA DADOS DA EMPRESA

CREATE TABLE empresas (
	id_empresa INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR (50),
	cnpj CHAR (18),
	estado VARCHAR (20),
	cidade VARCHAR (40),
	cep CHAR (9),
	logradouro VARCHAR (50),
	numero VARCHAR (5)
)AUTO_INCREMENT = 10000;

-- INSERIR DADOS NA TABELA
INSERT INTO empresas (nome, cnpj, estado, cidade, cep, logradouro, numero) VALUES
	('Grupo gui', '01.200.477/2121-03', 'Acre', 'Rio Branco', '69900-013', 'Rua Ari Rodrigues', '777'),
	('Grupo LA', '37.570.300/879-74', 'Paraiba', 'João Pessoa', '58010-010', 'Rua Manoel Soares Londres', '71'),
	('JohnEnterprises', '20.780.209/5000-20', 'Rio Grande do Norte', 'Natal', '59010-015', 'Rua Miramar', '87'); 

-- MOSTRAR O NOME DA EMPRESA EM QUE O ID É 10001
SELECT nome FROM empresas 
	WHERE id_empresa = 10001;

-- MOSTRAR TODOS OS DADOS DA EMPRESA EM QUE O ESTADO É ACRE E A CIDADE É RIO BRANCO
SELECT * FROM empresas 
	WHERE estado = 'Acre' 
		AND cidade = 'Rio Branco';