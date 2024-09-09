CREATE DATABASE cbsafe;
USE cbsafe;

-- 1 TABELA CADASTRO

CREATE TABLE usuario (
	id INT PRIMARY KEY auto_increment,
    empresa VARCHAR(50),
    supervisor VARCHAR(20),
    cnpj CHAR(18),
    email VARCHAR(30),
    senha VARCHAR(15)
);

DESC usuario;

INSERT INTO usuario (empresa, supervisor, cnpj, email, senha) VALUES
	('Fazenda Manteiga', 'marcos', '11.111.111/0001-00', 'marcos@amanteigado.com', '12345'),
    ('Fazenda Vinho', 'paulo', '12.345.678/0001-00', 'paulo@vinho.com', 'amominhamae'),
    ('Fazenda Suco de Uva', 'fiona', '87.654.321/0001-00', 'fiona@suco.com', 'shrek123'),
    ('Fazenda Maionese', 'ruan', '13.579.246/0001-00', 'ruan@maionese.com', 'maionesedeovo');
    
SELECT * FROM usuario;

SELECT * FROM usuario
    WHERE supervisor LIKE "%a%"
        ORDER BY cnpj;
        
-- TABELA 2 - DADOS COLETADOS DO SENSOR

CREATE TABLE dadosSensor(
id INT PRIMARY KEY auto_increment,
umidade FLOAT (4,2),
dataHora DATETIME,
alerta VARCHAR(20) CONSTRAINT chkAlerta CHECK (alerta in ('verde', 'amarelo', 'vermelho'))
) auto_increment = 100;

INSERT INTO dadosSensor (umidade, dataHora, alerta) VALUES
(70.9, '2024-08-01 16:44:00', 'vermelho'),
(25.6, '2024-08-09 16:50:09', 'verde'),
(44.8, '2024-08-09 18:00:01', 'amarelo');

SELECT * FROM dadosSensor
	WHERE alerta = 'verde';

SELECT * FROM dadosSensor
	WHERE alerta = 'vermelho';

-- 3 TABELA COMPOST BARN
-- CRIAR TABELA Compost_barn
CREATE TABLE Compost_barn (
idCb int PRIMARY KEY auto_increment,
area_m2 varchar (30),
qtd_vacas int,
data_ultima_manutencao date
) auto_increment = 1000;

-- INSERIR VALORES NA TABELA
INSERT INTO Compost_barn (area_m2, qtd_vacas, data_ultima_manutencao) VALUES
('1500','100','2024-05-20'),
('1000','90','2024-09-02'),
('1200','80','2024-02-17');

-- EXIBIR TODOS OS CAMPOS DA TABELA
SELECT * FROM Compost_barn;

-- EXIBIR TODOS OS CAMPOS DA TABELA ONDE A DATA É MENOR QUE 2 MESES DA DATA ATUAL
SELECT * FROM Compost_barn WHERE data_ultima_manutencao < '2024-07-04';


-- 4 TABELA DADOS DA EMPRESA

CREATE TABLE empresas (
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR (50),
cnpj CHAR (18),
estado VARCHAR (20),
cidade VARCHAR (40),
cep CHAR (9),
logradouro VARCHAR (50),
numero VARCHAR (5)
)auto_increment = 10000;

INSERT INTO empresas (nome, cnpj, estado, cidade, cep, logradouro, numero) VALUES
('Grupo gui', '01.200.477/2121-03', 'Acre', 'Rio Branco', '69900-013', 'Rua Ari Rodrigues', '777'),
('Grupo LA', '37.570.300/879-74', 'Paraiba', 'João Pessoa', '58010-010', 'Rua Manoel Soares Londres', '71'),
('JohnEnterprises', '20.780.209/5000-20', 'Rio Grande do Norte', 'Natal', '59010-015', 'Rua Miramar', '87'); 

SELECT nome FROM empresas WHERE id = 2;

SELECT * FROM empresas WHERE estado = 'Acre' AND cidade = 'Rio Branco';